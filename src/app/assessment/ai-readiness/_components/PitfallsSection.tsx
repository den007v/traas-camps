import { PITFALLS } from "../_lib/content";
import { assessmentCard, assessmentMutedText, assessmentSectionTitle } from "./styles";
import type { ProfileKey } from "../_lib/types";

export function PitfallsSection({ profile }: { profile: ProfileKey }) {
  const pitfalls = PITFALLS[profile];

  return (
    <section className="space-y-6" aria-labelledby="pitfalls-title">
      <div>
        <h2 id="pitfalls-title" className={assessmentSectionTitle}>
          Типичные ловушки на вашем уровне зрелости
        </h2>
        <p className={`mt-2 ${assessmentMutedText}`}>
          Что мы регулярно наблюдаем у компаний с похожим профилем
        </p>
      </div>

      <div className="space-y-4">
        {pitfalls.map((pitfall, index) => (
          <article key={pitfall.title} className={`${assessmentCard} p-6`}>
            <div className="flex gap-4">
              <span className="shrink-0 font-mono text-2xl text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{pitfall.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--muted)]">{pitfall.description}</p>
                <p className="mt-3 text-sm italic leading-relaxed text-[var(--muted)]">{pitfall.industryNote}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
