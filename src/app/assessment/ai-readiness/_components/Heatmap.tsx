import { DOMAIN_VERDICTS } from "../_lib/content";
import { DOMAINS } from "../_lib/schema";
import { assessmentCard, assessmentMutedText, assessmentSectionTitle } from "./styles";
import type { DomainKey, ScoreResult } from "../_lib/types";

type ScoredDomainKey = Exclude<DomainKey, "experience">;

function isScoredDomain(domain: DomainKey): domain is ScoredDomainKey {
  return domain !== "experience";
}

const levelClasses = {
  low: {
    pill: "bg-[color:color-mix(in_oklab,var(--error)_14%,transparent)] text-[var(--error)]",
    accent: "border-l-[var(--error)]",
  },
  mid: {
    pill: "bg-[color:color-mix(in_oklab,var(--warning)_14%,transparent)] text-[var(--warning)]",
    accent: "border-l-[var(--warning)]",
  },
  high: {
    pill: "bg-[color:color-mix(in_oklab,var(--success)_14%,transparent)] text-[var(--success)]",
    accent: "border-l-[var(--success)]",
  },
};

export function Heatmap({
  domainScores,
}: {
  domainScores: ScoreResult["domainScores"];
}) {
  const domains = DOMAINS.filter((domain) => isScoredDomain(domain.key));

  return (
    <section aria-labelledby="heatmap-title" className="space-y-4">
      <div>
        <h2 id="heatmap-title" className={assessmentSectionTitle}>
          Ваша оценка по доменам
        </h2>
        <p className={`mt-2 ${assessmentMutedText}`}>
          Красный показывает критичные провалы, янтарный — зоны подготовки, зелёный — сильную базу.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {domains.map((domain) => {
          const key = domain.key as ScoredDomainKey;
          const score = domainScores[key];
          if (!score) return null;
          const classes = levelClasses[score.level];
          return (
            <article
              key={key}
              className={`${assessmentCard} border-l-4 p-4 ${classes.accent}`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold leading-snug text-[var(--foreground)]">
                  {domain.label}
                </h3>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${classes.pill}`}>
                  {score.level}
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold text-[var(--foreground)]">{score.pct}%</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {DOMAIN_VERDICTS[key][score.level]}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
