import { QUICK_WINS, ROADMAP } from "../_lib/content";
import {
  assessmentCard,
  assessmentEyebrow,
  assessmentMutedText,
  assessmentSectionTitle,
  assessmentSuccessPanel,
} from "./styles";
import type { ProfileKey } from "../_lib/types";

export function RoadmapSection({ profile }: { profile: ProfileKey }) {
  return (
    <section className="space-y-6" aria-labelledby="roadmap-title">
      <div>
        <h2 id="roadmap-title" className={assessmentSectionTitle}>
          План действий
        </h2>
        <p className={`mt-2 ${assessmentMutedText}`}>
          30-day quick wins и ориентир на первые 90 дней
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.4fr]">
        <article className={`${assessmentSuccessPanel} p-6`}>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">30-day quick wins</h3>
          <ol className="mt-4 space-y-3">
            {QUICK_WINS[profile].map((item, index) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                <span className="font-semibold text-[var(--success)]">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>

        <div className="space-y-3">
          {ROADMAP[profile].map((item) => (
            <article key={item.month} className={`${assessmentCard} p-5`}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6e79]">
                Месяц {item.month}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className={assessmentEyebrow}>
                    Активности
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.activities.map((activity) => (
                      <li key={activity}>• {activity}</li>
                    ))}
                  </ul>
                </div>
                <div className={`${assessmentSuccessPanel} p-4`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--success)]">
                    На выходе
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable}>• {deliverable}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
