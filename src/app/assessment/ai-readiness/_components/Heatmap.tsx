import { DOMAIN_VERDICTS } from "../_lib/content";
import { DOMAINS } from "../_lib/schema";
import {
  assessmentCard,
  assessmentEyebrow,
  assessmentMutedText,
  assessmentSoftCard,
} from "./styles";
import type { DomainKey, ScoreResult } from "../_lib/types";

type ScoredDomainKey = Exclude<DomainKey, "experience">;

function isScoredDomain(domain: DomainKey): domain is ScoredDomainKey {
  return domain !== "experience";
}

const LEVEL_LABELS: Record<"low" | "mid" | "high", string> = {
  low: "Требует внимания",
  mid: "Есть потенциал",
  high: "Сильная сторона",
};

const LEVEL_COLORS: Record<"low" | "mid" | "high", string> = {
  low: "#e30613",
  mid: "#d38f1f",
  high: "#2ea36b",
};

export function Heatmap({
  domainScores,
}: {
  domainScores: ScoreResult["domainScores"];
}) {
  const domains = DOMAINS.filter((d) => isScoredDomain(d.key));
  const lowCount = domains.filter(
    (d) => domainScores[d.key as ScoredDomainKey]?.level === "low",
  ).length;

  return (
    <section aria-labelledby="heatmap-title" className={`${assessmentCard} p-5 sm:p-6`}>
      <p id="heatmap-title" className={assessmentEyebrow}>Разбор по направлениям</p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
        {(["low", "mid", "high"] as const).map((lvl) => (
          <span key={lvl} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: LEVEL_COLORS[lvl] }}
            />
            {LEVEL_LABELS[lvl]}
          </span>
        ))}
      </div>
      {lowCount > 0 ? (
        <p className={`mt-2 ${assessmentMutedText}`}>
          Выделено {lowCount} {lowCount === 1 ? "направление" : lowCount < 5 ? "направления" : "направлений"},
          требующих приоритетного внимания.
        </p>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {domains.map((domain) => {
          const key = domain.key as ScoredDomainKey;
          const score = domainScores[key];
          if (!score) return null;
          const color = LEVEL_COLORS[score.level];
          const label = LEVEL_LABELS[score.level];
          return (
            <article
              key={key}
              className={`${assessmentSoftCard} p-4 transition hover:border-[color:color-mix(in_oklab,var(--primary)_34%,var(--border))]`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold leading-snug text-[var(--foreground)]">
                  {domain.label}
                </h3>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    background: `color-mix(in oklab, ${color} 16%, transparent)`,
                    color,
                  }}
                >
                  {label}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${score.pct}%`, background: color }}
                />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                {DOMAIN_VERDICTS[key][score.level]}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
