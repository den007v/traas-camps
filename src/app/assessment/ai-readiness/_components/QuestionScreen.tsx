import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProgressBar } from "./ProgressBar";
import {
  assessmentCard,
  assessmentChip,
  assessmentEyebrow,
  assessmentSecondaryButton,
} from "./styles";
import { getDomain } from "../_lib/schema";
import type { Question } from "../_lib/types";

const optionLetters = ["A", "B", "C", "D"];

export function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  selectedScore,
  onSelect,
  onBack,
}: {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedScore: number | null;
  onSelect: (score: number) => void;
  onBack: () => void;
}) {
  const domain = getDomain(question.domain);
  const current = questionIndex + 1;

  return (
    <main className="min-h-screen py-6 sm:py-8">
      <Container className="flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 text-sm text-[var(--muted)]">
            <Link
              href="/"
              className={`${assessmentChip} min-h-9 gap-1.5`}
            >
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
              TraaS
            </Link>
            <span aria-live="polite">Шаг {current} из {totalQuestions}</span>
            <span className="w-20" aria-hidden="true" />
          </div>
          <ProgressBar current={current} total={totalQuestions} />
        </div>

        <section className="flex flex-1 flex-col justify-center py-8 sm:py-12">
          <div className={`${assessmentCard} p-5 sm:p-7`}>
            <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[color:color-mix(in_oklab,var(--primary)_18%,transparent)] blur-3xl" />
            <div className="relative">
              <div className={`${assessmentEyebrow} mb-5 inline-flex w-fit`}>
                {domain.label}
              </div>

              <fieldset className="space-y-6">
                <legend className="space-y-3">
                  <h1 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-[var(--foreground)] sm:text-3xl">
                    {question.text}
                  </h1>
                  {question.hint ? (
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{question.hint}</p>
                  ) : null}
                </legend>

                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const selected = selectedScore === option.score;
                    return (
                      <button
                        key={option.score}
                        type="button"
                        onClick={() => onSelect(option.score)}
                        aria-pressed={selected}
                        className={`flex min-h-14 w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] ${
                          selected
                            ? "border-[color:color-mix(in_oklab,var(--primary)_58%,var(--border))] bg-[color:color-mix(in_oklab,var(--surface)_80%,var(--primary)_20%)] text-[var(--foreground)] shadow-[0_12px_35px_color-mix(in_oklab,var(--primary)_16%,transparent)] ring-1 ring-inset ring-[var(--primary)]/30"
                            : "border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_90%,transparent)] text-[var(--foreground)] hover:border-[color:color-mix(in_oklab,var(--primary)_42%,var(--border))] hover:bg-[color:color-mix(in_oklab,var(--surface)_84%,var(--primary)_8%)]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                            selected
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[color:color-mix(in_oklab,var(--surface-2)_82%,transparent)] text-[var(--muted)]"
                          }`}
                        >
                          {optionLetters[index]}
                        </span>
                        <span className="text-sm leading-relaxed sm:text-base">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <p className="mt-4 text-xs text-[var(--muted)]">
                После выбора ответа мы автоматически перейдём дальше.
              </p>
            </div>
          </div>
        </section>

        <div className="sticky bottom-0 -mx-4 flex border-t border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--background)_88%,transparent)] px-4 py-4 sm:static sm:mx-0 sm:border-t-0 sm:bg-transparent sm:px-0">
          <button
            type="button"
            onClick={onBack}
            className={`${assessmentSecondaryButton} w-full sm:w-auto`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Назад
          </button>
        </div>
      </Container>
    </main>
  );
}
