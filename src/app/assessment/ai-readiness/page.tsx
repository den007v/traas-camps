"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactModal } from "@/components/contact/ContactModal";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { AssessmentQuestion } from "@/components/assessment/AssessmentQuestion";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";
import {
  aiReadinessQuestions,
  buildRadarData,
  getReadinessLevel,
  profileQuestions,
} from "@/data/assessmentAiReadiness";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function AiReadinessAssessmentPage() {
  const profileCount = profileQuestions.length;
  const scoredCount = aiReadinessQuestions.length;
  const totalSteps = profileCount + scoredCount;
  const [step, setStep] = useState(0);
  const [answerValues, setAnswerValues] = useState<string[]>([]);
  const [profileAnswers, setProfileAnswers] = useState<Record<string, string>>({});
  const [contactOpen, setContactOpen] = useState(false);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const { theme } = useTheme();

  const isDone = step >= totalSteps;
  const isProfileStep = step < profileCount;
  const scoredStepIndex = step - profileCount;
  const currentQuestion = isProfileStep
    ? profileQuestions[step]
    : aiReadinessQuestions[Math.min(scoredStepIndex, scoredCount - 1)];
  const selectedValue = isProfileStep
    ? profileAnswers[currentQuestion?.id]
    : answerValues[scoredStepIndex];

  const scoresByQuestion = useMemo(
    () =>
      aiReadinessQuestions.map((q, idx) => {
        const selected = answerValues[idx];
        const score = q.options.find((o) => o.value === selected)?.score;
        return score ?? 1;
      }),
    [answerValues],
  );

  const totalScore = scoresByQuestion.reduce((sum, score) => sum + score, 0);
  const level = getReadinessLevel(totalScore);
  const radarData = buildRadarData(scoresByQuestion);

  const palette = useMemo(
    () =>
      ({
        "--a-bg": theme === "dark" ? "#181a26" : "#dee3ed",
        "--a-surface": theme === "dark" ? "#232734" : "#edf2f8",
        "--a-surface-2": theme === "dark" ? "#2b3040" : "#d8deea",
        "--a-border": theme === "dark" ? "rgba(202,209,230,0.22)" : "rgba(110,120,145,0.16)",
        "--a-text": theme === "dark" ? "#f3f4f8" : "#1a1c25",
        "--a-muted": theme === "dark" ? "#b8bed0" : "#5b6170",
      }) as CSSProperties,
    [theme],
  );

  function setAnswer(value: string) {
    if (isProfileStep) {
      setProfileAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
      return;
    }
    setAnswerValues((prev) => {
      const next = [...prev];
      next[scoredStepIndex] = value;
      return next;
    });
  }

  function goNext() {
    if (isDone) return;
    if (!selectedValue) return;
    setStep((s) => Math.min(s + 1, totalSteps));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function resetTest() {
    setAnswerValues([]);
    setProfileAnswers({});
    setAnalyticsSent(false);
    setStep(0);
  }

  async function saveAnalytics() {
    if (analyticsSent) return;
    if (answerValues.length !== scoredCount) return;
    setAnalyticsSent(true);
    try {
      await fetch("/api/assessment/ai-readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: profileAnswers.role,
          companySize: profileAnswers.companySize,
          industry: profileAnswers.industry,
          primaryChallenge: profileAnswers.primaryChallenge,
          scores: scoresByQuestion,
        }),
      });
    } catch {
      // intentionally ignore: assessment should not break UX
    }
  }

  useEffect(() => {
    if (!isDone) return;
    void saveAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone, analyticsSent, answerValues.length, scoredCount, profileAnswers, scoresByQuestion]);

  return (
    <div style={palette} className="min-h-screen bg-[var(--a-bg)] text-[var(--a-text)]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[10%] top-[6%] h-56 w-56 rounded-full bg-[#e30613]/[0.08] blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] h-64 w-64 rounded-full bg-[#e30613]/[0.06] blur-3xl" />
      </div>
      <header className="sticky top-0 z-40 border-b border-[var(--a-border)] bg-[color:color-mix(in_oklab,var(--a-bg)_86%,transparent)] backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--a-border)] bg-[var(--a-surface)] px-3 py-1.5 text-sm text-[var(--a-muted)] transition hover:text-[var(--a-text)]"
            >
              <ChevronLeft className="h-4 w-4" />
              На главную
            </Link>
            <span className="rounded-md bg-[var(--a-surface)] px-2 py-1 text-xs font-medium text-[#e30613]">
              Оценка готовности к ИИ-трансформации
            </span>
          </div>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="rounded-full border border-[#e30613]/55 bg-[#e30613]/15 px-4 py-2 text-sm font-semibold text-[#ffd5d8] transition hover:bg-[#e30613]/25"
          >
            Связаться
          </button>
        </Container>
      </header>

      <Container className="relative z-10 py-7 sm:py-10">
        {!isDone ? (
          <div className="mx-auto max-w-3xl">
            <AssessmentProgress current={step + 1} total={totalSteps} />
            <div className="mt-6 rounded-2xl border border-[var(--a-border)] bg-[color:color-mix(in_oklab,var(--a-surface)_94%,transparent)] p-4 sm:p-6">
              <AnimatePresence mode="wait">
                <AssessmentQuestion
                  key={currentQuestion.id}
                  question={currentQuestion}
                  selectedValue={selectedValue}
                  onSelect={setAnswer}
                />
              </AnimatePresence>

              <motion.div
                layout
                className="mt-6 flex items-center justify-between gap-3"
              >
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="rounded-full border border-[var(--a-border)] px-4 py-2 text-sm text-[var(--a-muted)] transition hover:text-[var(--a-text)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!selectedValue}
                  className="rounded-full border border-[#e30613]/50 bg-[#e30613]/18 px-5 py-2.5 text-sm font-semibold text-[#ffd5d8] transition hover:bg-[#e30613]/28 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Далее
                </button>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-5xl rounded-3xl border border-[var(--a-border)] bg-[color:color-mix(in_oklab,var(--a-surface)_95%,transparent)] p-5 sm:p-7">
            <AssessmentResult
              level={level}
              radarData={radarData}
              onReset={resetTest}
              onCta={() => setContactOpen(true)}
            />
          </div>
        )}
      </Container>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
