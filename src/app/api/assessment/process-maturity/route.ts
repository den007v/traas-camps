import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  calculateProcessMaturityResult,
  processMaturityQuestions,
  getReadinessLevel,
} from "@/data/assessmentProcessMaturity";

type Body = {
  assessmentVersion?: string;
  role?: string;
  companySize?: string;
  primaryChallenge?: string;
  scores?: number[];
  profileAnswers?: Record<string, string>;
  answers?: Record<string, string>;
  result?: {
    totalScore?: number;
    uncappedScore?: number;
    levelId?: string;
    hardCapApplied?: boolean;
    domainScores?: unknown;
  };
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (body.assessmentVersion === "process_data_maturity_v2") {
    const answers = body.answers && typeof body.answers === "object" ? body.answers : {};
    const hasAllAnswers = processMaturityQuestions.every((question) => {
      const selected = answers[question.id];
      return question.options.some((option) => option.value === selected);
    });

    if (!hasAllAnswers) {
      return NextResponse.json({ error: "Некорректные ответы" }, { status: 400 });
    }

    const result = calculateProcessMaturityResult(answers);
    const profileAnswers = body.profileAnswers ?? {};

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ ok: true, warning: "analytics_not_configured" });
    }

    const { error } = await supabase.from("assessment_process_maturity_sessions").insert({
      role: profileAnswers.role ?? null,
      company_size: null,
      primary_challenge: profileAnswers.scope ?? null,
      total_score: result.totalScore,
      level_id: result.level.id,
      answers: {
        version: body.assessmentVersion,
        profileAnswers,
        answers,
        result: {
          totalScore: result.totalScore,
          uncappedScore: result.uncappedScore,
          levelId: result.level.id,
          hardCapApplied: result.hardCapApplied,
          domainScores: result.domainScores.map((domain) => ({
            id: domain.id,
            score: domain.score,
            rawScore: domain.rawScore,
            weight: domain.weight,
          })),
        },
      },
    });

    if (error) {
      console.error("[assessment-process-maturity]", error.message);
      return NextResponse.json({ error: "Не удалось сохранить сессию" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
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
