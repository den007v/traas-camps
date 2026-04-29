import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  aiReadinessQuestions,
  getReadinessLevel,
} from "@/data/assessmentAiReadiness";
import { QUESTIONS } from "@/app/assessment/ai-readiness/_lib/schema";

type Body = {
  assessmentVersion?: string;
  version?: string;
  role?: string;
  companySize?: string;
  industry?: string;
  primaryChallenge?: string;
  scores?: number[];
  result?: {
    profile?: string;
    finalScore?: number;
    rawScore?: number;
    hardCapTriggered?: boolean;
    domainScores?: unknown;
    topBlockers?: string[];
  };
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const scores = Array.isArray(body.scores) ? body.scores : [];
  const version = body.assessmentVersion ?? body.version;
  if (version === "ai_readiness_stage_1_1") {
    if (scores.length !== QUESTIONS.length) {
      return NextResponse.json({ error: "Некорректное количество ответов" }, { status: 400 });
    }

    if (scores.some((s) => !Number.isFinite(s) || s < 0 || s > 3)) {
      return NextResponse.json({ error: "Некорректные значения ответов" }, { status: 400 });
    }

    const totalScore = Number.isFinite(body.result?.finalScore)
      ? Math.round(body.result?.finalScore ?? 0)
      : scores.reduce((sum, s) => sum + s, 0);
    const levelId = body.result?.profile ?? "unknown";

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ ok: true, warning: "analytics_not_configured" });
    }

    const { error } = await supabase.from("assessment_events").insert({
      version,
      profile: levelId,
      final_score: totalScore,
      raw_score: Number.isFinite(body.result?.rawScore) ? Math.round(body.result?.rawScore ?? 0) : null,
      hard_cap_triggered: body.result?.hardCapTriggered ?? false,
      domain_scores: body.result?.domainScores ?? {},
      top_blockers: body.result?.topBlockers ?? [],
      user_role: body.role ?? null,
      company_size: body.companySize ?? null,
      user_agent: req.headers.get("user-agent") ?? "",
      referrer: req.headers.get("referer") ?? "",
    });

    if (error) {
      console.error("[assessment-ai-readiness]", error.message);
      return NextResponse.json({ ok: true, warning: "analytics_save_failed" });
    }

    return NextResponse.json({ ok: true });
  }

  if (scores.length !== aiReadinessQuestions.length) {
    return NextResponse.json({ error: "Некорректное количество ответов" }, { status: 400 });
  }

  if (scores.some((s) => !Number.isFinite(s) || s < 1 || s > 4)) {
    return NextResponse.json({ error: "Некорректные значения ответов" }, { status: 400 });
  }

  const totalScore = scores.reduce((sum, s) => sum + s, 0);
  const level = getReadinessLevel(totalScore);

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: true, warning: "analytics_not_configured" });
  }

  const { error } = await supabase.from("assessment_ai_readiness_sessions").insert({
    role: body.role ?? null,
    company_size: body.companySize ?? null,
    industry: body.industry ?? null,
    primary_challenge: body.primaryChallenge ?? null,
    total_score: totalScore,
    level_id: level.id,
    answers: scores,
  });

  if (error) {
    console.error("[assessment-ai-readiness]", error.message);
    return NextResponse.json({ error: "Не удалось сохранить сессию" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
