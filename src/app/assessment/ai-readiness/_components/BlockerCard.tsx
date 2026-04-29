import {
  Database,
  ListChecks,
  Lock,
  Server,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { BLOCKERS } from "../_lib/content";
import { getDomain } from "../_lib/schema";
import {
  assessmentCard,
  assessmentDangerPanel,
  assessmentElevated,
  assessmentEyebrow,
  assessmentSuccessPanel,
} from "./styles";
import type { DomainKey } from "../_lib/types";

const icons = {
  ownership: ShieldCheck,
  use_cases: ListChecks,
  data: Database,
  platform: Server,
  governance: Lock,
  adoption: Users,
  economics: TrendingUp,
};

type ScoredDomainKey = Exclude<DomainKey, "experience">;

function isScoredDomain(domain: DomainKey): domain is ScoredDomainKey {
  return domain !== "experience";
}

export function BlockerCard({ domain }: { domain: DomainKey }) {
  if (!isScoredDomain(domain)) return null;
  const blocker = BLOCKERS[domain];
  const domainMeta = getDomain(domain);
  const Icon = icons[domain];

  return (
    <article className={`${assessmentCard} p-6 lg:p-8`}>
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[color:color-mix(in_oklab,var(--primary)_32%,var(--border))] bg-[color:color-mix(in_oklab,var(--primary)_14%,transparent)] text-[#ff6e79]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className={assessmentEyebrow}>
            {domainMeta.label}
          </p>
          <h3 className="mt-1 text-xl font-semibold leading-snug text-[var(--foreground)]">
            {blocker.title}
          </h3>
          <div className="mt-5 space-y-5 border-t border-[var(--divider)] pt-5">
            <div>
              <p className={assessmentEyebrow}>
                Что происходит
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{blocker.whatHappens}</p>
            </div>
            <div className={`${assessmentElevated} border-l-2 border-l-[var(--primary)] p-4`}>
              <p className={assessmentEyebrow}>
                Индустриальный контекст
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{blocker.industryContext}</p>
            </div>
            <div className={`${assessmentDangerPanel} p-4`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--error)]">
                Что будет, если не закрыть
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--foreground)_88%,var(--error)_12%)]">
                {blocker.consequences}
              </p>
            </div>
            <div className={`${assessmentSuccessPanel} p-4`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--success)]">
                Первый шаг
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[color:color-mix(in_oklab,var(--foreground)_88%,var(--success)_12%)]">
                {blocker.firstStep}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              <span className="font-medium text-[var(--foreground)]">Оценка усилий:</span> {blocker.effort}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
