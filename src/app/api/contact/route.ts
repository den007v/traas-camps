import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { CONTACT_TOPICS } from "@/data/contactFormTopics";

const ALLOWED_TOPICS = new Set<string>(
  CONTACT_TOPICS.map((t) => t.value),
);

type Body = {
  type?: string;
  fullName?: string;
  name?: string;
  phone?: string;
  email?: string;
  messenger?: string;
  topic?: string;
  company?: string;
  comment?: string;
  marketingOptIn?: boolean;
  result?: {
    profile?: string;
    finalScore?: number;
    domainScores?: unknown;
    topBlockers?: unknown;
    profileAnswers?: {
      role?: string;
      companySize?: string;
    };
  };
  answers?: unknown;
  userRole?: string;
  companySize?: string;
  _hp?: string;
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (body._hp) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (body.type === "ai_readiness_assessment") {
    return handleAiReadinessLead(body);
  }

  const fullName = (body.fullName ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const messenger = (body.messenger ?? "").trim();
  const topic = (body.topic ?? "").trim();

  if (fullName.length < 2 || fullName.length > 200) {
    return NextResponse.json(
      { error: "Укажите ФИО (от 2 символов)" },
      { status: 400 },
    );
  }
  if (phone.length < 6 || phone.length > 40) {
    return NextResponse.json(
      { error: "Укажите корректный номер телефона" },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Укажите корректный email" }, { status: 400 });
  }
  if (messenger.length > 500) {
    return NextResponse.json({ error: "Слишком длинное поле мессенджера" }, { status: 400 });
  }
  if (!ALLOWED_TOPICS.has(topic)) {
    return NextResponse.json({ error: "Выберите тему обращения" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Заявки временно не принимаются: не настроено подключение к базе. Обратитесь к администратору сайта.",
      },
      { status: 503 },
    );
  }

  const topicLabel =
    CONTACT_TOPICS.find((t) => t.value === topic)?.label ?? topic;

  const { error } = await supabase.from("contact_submissions").insert({
    full_name: fullName,
    phone,
    email,
    messenger: messenger || null,
    topic,
    topic_label: topicLabel,
  });

  if (error) {
    console.error("[contact]", error.message);
    return NextResponse.json(
      { error: "Не удалось сохранить заявку. Попробуйте позже." },
      { status: 500 },
    );
  }

  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "TraaS <onboarding@resend.dev>";

  if (resendKey && notifyEmail) {
    try {
      const html = `
        <h2>Новая заявка с сайта TraaS & Camps</h2>
        <p><strong>ФИО:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Мессенджер:</strong> ${escapeHtml(messenger || "—")}</p>
        <p><strong>Тема:</strong> ${escapeHtml(topicLabel)}</p>
      `;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [notifyEmail],
          subject: `Заявка с сайта: ${fullName}`,
          html,
        }),
      });
      if (!res.ok) {
        console.error("[contact] Resend:", await res.text());
      }
    } catch (e) {
      console.error("[contact] Resend error:", e);
    }
  }

  return NextResponse.json({ ok: true });
}

async function handleAiReadinessLead(body: Body) {
  const email = (body.email ?? "").trim().toLowerCase();
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Укажите корректный email" }, { status: 400 });
  }

  const profile = body.result?.profile;
  const finalScore = body.result?.finalScore;
  if (!profile || !Number.isFinite(finalScore)) {
    return NextResponse.json({ error: "Некорректный результат диагностики" }, { status: 400 });
  }

  const role = body.userRole ?? body.result?.profileAnswers?.role ?? null;
  const companySize = body.companySize ?? body.result?.profileAnswers?.companySize ?? null;
  const supabase = getSupabaseAdmin();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://traas-camps.netlify.app";

  if (!supabase) {
    console.error("[contact:assessment] Supabase is not configured");
    await sendTeamNotification({
      email,
      name: body.name ?? null,
      phone: body.phone ?? null,
      company: body.company ?? null,
      comment: body.comment ?? null,
      marketing_opt_in: body.marketingOptIn ?? false,
      profile,
      final_score: Math.round(finalScore ?? 0),
      domain_scores: body.result?.domainScores ?? {},
      top_blockers: body.result?.topBlockers ?? [],
      user_role: role,
      company_size: companySize,
      result_url: null,
    });
    return NextResponse.json({ ok: true, warning: "lead_storage_not_configured" });
  }

  try {
    const { data: lead, error } = await supabase
      .from("assessment_leads")
      .insert({
        version: "ai_readiness_stage_1_1",
        email,
        name: cleanNullable(body.name),
        phone: cleanNullable(body.phone),
        company: cleanNullable(body.company),
        comment: cleanNullable(body.comment),
        marketing_opt_in: body.marketingOptIn ?? false,
        profile,
        final_score: Math.round(finalScore ?? 0),
        domain_scores: body.result?.domainScores ?? {},
        top_blockers: body.result?.topBlockers ?? [],
        answers: body.answers ?? {},
        user_role: role,
        company_size: companySize,
      })
      .select("id,email,name,phone,company,comment,marketing_opt_in,profile,final_score,domain_scores,top_blockers,user_role,company_size,result_url")
      .single();

    if (error || !lead) {
      console.error("[contact:assessment] Supabase:", error?.message ?? "lead_not_returned");
      return NextResponse.json({ ok: true, warning: "lead_save_failed" });
    }

    const resultUrl = `${baseUrl}/assessment/ai-readiness/result?id=${lead.id}`;
    const { error: updateError } = await supabase
      .from("assessment_leads")
      .update({ result_url: resultUrl })
      .eq("id", lead.id);

    if (updateError) {
      console.error("[contact:assessment] result_url:", updateError.message);
    }

    const notified = await sendTeamNotification({ ...lead, result_url: resultUrl });
    if (notified) {
      const { error: notifyError } = await supabase
        .from("assessment_leads")
        .update({ team_notified_at: new Date().toISOString() })
        .eq("id", lead.id);
      if (notifyError) {
        console.error("[contact:assessment] team_notified_at:", notifyError.message);
      }
    }

    return NextResponse.json({ ok: true, resultUrl });
  } catch (error) {
    console.error("[contact:assessment]", error);
    return NextResponse.json({ ok: true, warning: "lead_processing_failed" });
  }
}

type AssessmentLeadEmail = {
  email: string;
  name?: string | null;
  phone?: string | null;
  company?: string | null;
  comment?: string | null;
  marketing_opt_in?: boolean | null;
  profile?: string | null;
  final_score?: number | null;
  domain_scores?: unknown;
  top_blockers?: unknown;
  user_role?: string | null;
  company_size?: string | null;
  result_url?: string | null;
};

const PROFILE_LABELS: Record<string, string> = {
  fragmented: "Фрагментированные эксперименты (0–24)",
  pilot_ready: "Пилотная готовность (25–49)",
  managed_scaling: "Управляемое масштабирование (50–74)",
  platform_ready: "Платформенная готовность (75–100)",
};

const ROLE_LABELS: Record<string, string> = {
  ceo_founder: "CEO / основатель / генеральный директор",
  cto_cio_cdo: "CTO / CIO / CDO / руководитель ИТ или данных",
  business_unit: "Руководитель бизнес-функции или направления",
  hr_transformation: "HR / обучение / трансформация / стратегия",
  manager_expert: "Менеджер, эксперт или проектный лидер",
  other: "Другая роль",
};

const SIZE_LABELS: Record<string, string> = {
  up_to_100: "До 100 сотрудников",
  "100_500": "100–500 сотрудников",
  "500_2000": "500–2 000 сотрудников",
  "2000_10000": "2 000–10 000 сотрудников",
  "10000_plus": "Более 10 000 сотрудников",
  not_sure: "Затрудняюсь ответить / не применимо",
};

async function sendTeamNotification(lead: AssessmentLeadEmail) {
  const resendKey = process.env.RESEND_API_KEY;
  const teamEmail = process.env.TRAAS_TEAM_EMAIL ?? process.env.CONTACT_NOTIFY_EMAIL;
  if (!resendKey || !teamEmail) return false;

  const resend = new Resend(resendKey);
  const profile = lead.profile ? PROFILE_LABELS[lead.profile] ?? lead.profile : "—";
  const role = lead.user_role ? ROLE_LABELS[lead.user_role] ?? lead.user_role : "—";
  const size = lead.company_size ? SIZE_LABELS[lead.company_size] ?? lead.company_size : "—";
  const topBlockers = Array.isArray(lead.top_blockers)
    ? lead.top_blockers.join(", ")
    : "—";

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;color:#111">
  <h2 style="color:#E30613;margin-bottom:20px">Новый лид из AI Readiness Assessment</h2>

  <h3 style="border-bottom:1px solid #eee;padding-bottom:8px">Контакт</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
    <tr><td style="padding:4px 0;color:#666;width:140px">Email:</td><td><strong>${escapeHtml(lead.email)}</strong></td></tr>
    ${lead.name ? `<tr><td style="padding:4px 0;color:#666">Имя:</td><td>${escapeHtml(lead.name)}</td></tr>` : ""}
    ${lead.phone ? `<tr><td style="padding:4px 0;color:#666">Телефон:</td><td><strong>${escapeHtml(lead.phone)}</strong></td></tr>` : ""}
    ${lead.company ? `<tr><td style="padding:4px 0;color:#666">Компания:</td><td>${escapeHtml(lead.company)}</td></tr>` : ""}
    <tr><td style="padding:4px 0;color:#666">Маркетинг:</td><td>${lead.marketing_opt_in ? "Да" : "Нет"}</td></tr>
  </table>

  ${lead.comment ? `<h3 style="border-bottom:1px solid #eee;padding-bottom:8px">Комментарий</h3>
  <div style="background:#f8f8f8;padding:12px;border-radius:8px;margin-bottom:20px;white-space:pre-wrap">${escapeHtml(lead.comment)}</div>` : ""}

  <h3 style="border-bottom:1px solid #eee;padding-bottom:8px">Профиль</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
    <tr><td style="padding:4px 0;color:#666;width:140px">Роль:</td><td>${escapeHtml(role)}</td></tr>
    <tr><td style="padding:4px 0;color:#666">Размер:</td><td>${escapeHtml(size)}</td></tr>
  </table>

  <h3 style="border-bottom:1px solid #eee;padding-bottom:8px">Результат</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
    <tr><td style="padding:4px 0;color:#666;width:140px">Профиль:</td><td><strong>${escapeHtml(profile)}</strong></td></tr>
    <tr><td style="padding:4px 0;color:#666">Балл:</td><td><strong>${lead.final_score ?? "—"}/100</strong></td></tr>
    <tr><td style="padding:4px 0;color:#666">Узкие места:</td><td>${escapeHtml(topBlockers)}</td></tr>
  </table>

  ${lead.result_url ? `<a href="${escapeHtml(lead.result_url)}" style="display:inline-block;background:#E30613;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Посмотреть результат клиента →</a>` : ""}

  <p style="color:#999;font-size:12px;margin-top:24px">${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} MSK</p>
</div>`;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "TraaS Assessment <onboarding@resend.dev>",
      to: teamEmail,
      subject: `Новый лид: ${lead.email} — ${profile}`,
      html,
    });
    return true;
  } catch (error) {
    console.error("[contact:assessment] Resend:", error);
    return false;
  }
}

function cleanNullable(value?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
