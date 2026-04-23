import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  processMaturityQuestions,
  getReadinessLevel,
} from "@/data/assessmentProcessMaturity";

type Body = {
  role?: string;
  companySize?: string;
  primaryChallenge?: string;
  scores?: number[];
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const scores = Array.isArray(body.scores) ? body.scores : [];
  if (scores.length !== processMaturityQuestions.length) {
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

  const { error } = await supabase.from("assessment_process_maturity_sessions").insert({
    role: body.role ?? null,
    company_size: body.companySize ?? null,
    primary_challenge: body.primaryChallenge ?? null,
    total_score: totalScore,
    level_id: level.id,
    answers: scores,
  });

  if (error) {
    console.error("[assessment-process-maturity]", error.message);
    return NextResponse.json({ error: "Не удалось сохранить сессию" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
