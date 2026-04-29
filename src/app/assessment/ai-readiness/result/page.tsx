"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FullResult } from "../_components/FullResult";
import { assessmentBackground, assessmentPrimaryButton, assessmentShell } from "../_components/styles";
import { computeResult } from "../_lib/scoring";
import type { Answers, ProfileAnswers, ScoreResult } from "../_lib/types";

type LeadResultResponse = {
  answers?: unknown;
  user_role?: string | null;
  company_size?: string | null;
};

function isAnswers(value: unknown): value is Answers {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function ResultContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [profileAnswers, setProfileAnswers] = useState<ProfileAnswers>({});
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`/api/assessment/ai-readiness/result?id=${encodeURIComponent(id)}`)
      .then((response) => {
        if (!response.ok) throw new Error("not_found");
        return response.json() as Promise<LeadResultResponse>;
      })
      .then((data) => {
        if (!isAnswers(data.answers)) throw new Error("bad_answers");
        setAnswers(data.answers);
        setProfileAnswers({
          role: data.user_role ?? undefined,
          companySize: data.company_size ?? undefined,
        });
        setResult(computeResult(data.answers));
      })
      .catch(() => setError("Результат не найден"))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) {
    return (
      <StateMessage
        title="Ссылка некорректна"
        action={
          <Link href="/assessment/ai-readiness" className={assessmentPrimaryButton}>
            Пройти тест
          </Link>
        }
      />
    );
  }

  if (loading) {
    return <StateMessage title="Загружаем результат..." />;
  }

  if (error || !result || !answers) {
    return (
      <StateMessage
        title={error ?? "Результат не найден"}
        action={
          <Link href="/assessment/ai-readiness" className={assessmentPrimaryButton}>
            Пройти тест
          </Link>
        }
      />
    );
  }

  return <FullResult result={result} profileAnswers={profileAnswers} answers={answers} />;
}

function StateMessage({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className={assessmentShell}>
      <div className={assessmentBackground} aria-hidden="true" />
      <div className="relative flex min-h-screen items-center justify-center p-6 text-center">
        <div className="rounded-2xl border border-[var(--divider)] bg-[var(--surface)] p-8">
          <p className="text-[var(--muted)]">{title}</p>
          {action ? <div className="mt-5">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<StateMessage title="Загружаем..." />}>
      <ResultContent />
    </Suspense>
  );
}
