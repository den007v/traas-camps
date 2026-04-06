import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { CONTACT_TOPICS } from "@/data/contactFormTopics";

const ALLOWED_TOPICS = new Set<string>(
  CONTACT_TOPICS.map((t) => t.value),
);

type Body = {
  fullName?: string;
  phone?: string;
  email?: string;
  messenger?: string;
  topic?: string;
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

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
