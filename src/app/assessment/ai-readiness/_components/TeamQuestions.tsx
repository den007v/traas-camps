import { TEAM_QUESTIONS } from "../_lib/content";
import { assessmentCard, assessmentMutedText, assessmentSectionTitle } from "./styles";
import type { ProfileKey } from "../_lib/types";

export function TeamQuestions({ profile }: { profile: ProfileKey }) {
  const questions = TEAM_QUESTIONS[profile];

  return (
    <section className="space-y-6" aria-labelledby="team-questions-title">
      <div>
        <h2 id="team-questions-title" className={assessmentSectionTitle}>
          Что обсудить в команде на этой неделе
        </h2>
        <p className={`mt-2 ${assessmentMutedText}`}>
          5 вопросов, которые проверяют диагноз и помогают сдвинуть с места
        </p>
      </div>

      <div className={`${assessmentCard} p-6 sm:p-8`}>
        <ol className="space-y-5">
          {questions.map((question, index) => (
            <li key={question} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--primary)_16%,transparent)] text-sm font-semibold text-[#ff6e79]">
                {index + 1}
              </span>
              <span className="pt-1 leading-relaxed text-[var(--muted)]">{question}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
