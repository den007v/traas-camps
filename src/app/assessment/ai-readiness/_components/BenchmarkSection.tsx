import { COMMON_BENCHMARKS, PROFILE_BENCHMARKS } from "../_lib/benchmarks";
import {
  assessmentCard,
  assessmentEyebrow,
  assessmentMutedText,
  assessmentSectionTitle,
  assessmentWarningPanel,
} from "./styles";
import type { ProfileKey } from "../_lib/types";

export function BenchmarkSection({ profile }: { profile: ProfileKey }) {
  return (
    <section className="space-y-6" aria-labelledby="benchmarks-title">
      <div>
        <h2 id="benchmarks-title" className={assessmentSectionTitle}>
          Где вы относительно рынка
        </h2>
        <p className={`mt-2 ${assessmentMutedText}`}>
          Контекст вашей оценки в актуальных индустриальных данных
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMMON_BENCHMARKS.map((benchmark) => (
          <article key={benchmark.id} className={`${assessmentCard} p-5`}>
            <p className={assessmentEyebrow}>
              {benchmark.metric}
            </p>
            <p className="mt-3 text-3xl font-bold text-[color:color-mix(in_oklab,var(--foreground)_84%,var(--warning)_16%)]">
              {benchmark.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{benchmark.description}</p>
            <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">{benchmark.source}</p>
          </article>
        ))}
      </div>

      <div className={`${assessmentWarningPanel} border-l-4 border-l-[var(--warning)] p-6`}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--warning)]">
          Применительно к вам
        </p>
        <p className="mt-3 leading-relaxed text-[var(--muted)]">{PROFILE_BENCHMARKS[profile]}</p>
      </div>
    </section>
  );
}
