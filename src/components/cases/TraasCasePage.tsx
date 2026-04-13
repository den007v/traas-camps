import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteContent } from "@/data/siteContent";
import type { TraasCaseRecord } from "@/data/cases/traasCases";
import { CasesCtaPanel } from "@/components/tech-bootcamp/CasesCtaPanel";
import { CaseRevealProvider } from "@/components/cases/CaseRevealProvider";
import { CaseReadingProgress } from "@/components/cases/CaseProgressAndNav";
import {
  CaseContextBullets,
  CasePageLayout,
  CaseQuote,
  CaseResults,
  CaseSidePanel,
  CaseTLDR,
  CaseToolsStrip,
} from "@/components/cases/CaseSections";

function estimateReadMinutes(caseItem: TraasCaseRecord) {
  const blob = [
    caseItem.title,
    caseItem.subtitle,
    ...caseItem.lead,
    ...caseItem.situation,
    ...caseItem.challenge,
    ...caseItem.actions.map((a) => `${a.title} ${a.text}`),
    ...caseItem.outcomes,
    ...caseItem.whyItMatters,
  ].join(" ");
  const words = blob.trim().split(/\s+/).length;
  return Math.max(4, Math.round(words / 220));
}

function TraasCaseHero({
  caseItem,
  readTime,
}: {
  caseItem: TraasCaseRecord;
  readTime: number;
}) {
  return (
    <section
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 rounded-3xl border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--surface)_97%,transparent),color-mix(in_oklab,var(--surface-2)_86%,transparent))] p-6 sm:p-8 motion-safe:hover:shadow-[0_20px_50px_-36px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        <Link href="/cases" className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)]">
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
          Кейсы TraaS
        </Link>
        <span aria-hidden>/</span>
        <span>{caseItem.label}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--primary)]">
              Кейс TraaS
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] text-[var(--muted)]">
              {readTime} мин чтения
            </span>
          </div>
          <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
            {caseItem.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[var(--muted)]">{caseItem.subtitle}</p>
          <div className="mt-5 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[12px] text-[var(--muted)]">
            <span className="font-medium text-[var(--foreground)]">{caseItem.clientLine}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact-cta"
              className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--primary)_72%,#ffffff)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_84%,#ff5e67),var(--primary-hover))] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_color-mix(in_oklab,var(--primary)_34%,transparent)] transition hover:brightness-105"
            >
              {caseItem.cta.firstScreenLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Ключевые факты</p>
          <div className="mt-3 space-y-2.5">
            {caseItem.heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-[var(--divider)] bg-[var(--surface-2)]/45 p-3 transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[color:color-mix(in_oklab,var(--primary)_35%,transparent)]"
              >
                <p className="text-lg font-semibold leading-tight text-[var(--primary)] sm:text-xl">{metric.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--muted)]">{metric.label}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

const SIDE_SECTIONS: Array<{ id: string; title: string }> = [
  { id: "traas-case-lead", title: "Кратко о проекте" },
  { id: "traas-case-situation", title: "Ситуация" },
  { id: "traas-case-challenge", title: "Вызов" },
  { id: "traas-case-approach", title: "Подход TraaS" },
  { id: "traas-case-changes", title: "Что изменилось" },
  { id: "traas-case-results", title: "Итоги" },
  { id: "traas-case-relevance", title: "Кому полезно" },
];

const headingClass =
  "mt-8 scroll-mt-28 border-b border-[#e30613]/40 pb-2 text-2xl font-semibold leading-tight first:mt-0 sm:text-[30px]";

export function TraasCasePage({ caseItem }: { caseItem: TraasCaseRecord }) {
  const readTime = estimateReadMinutes(caseItem);

  return (
    <CasePageLayout>
      <CaseReadingProgress />
      <CaseRevealProvider />
      <SiteHeader content={siteContent} currentPageLabel="Кейс TraaS" backHref="/cases" />

      <main className="mx-auto w-full max-w-[1120px] px-4 py-7 sm:px-6 sm:py-9">
          <TraasCaseHero caseItem={caseItem} readTime={readTime} />
          <CaseTLDR items={caseItem.tldr} />
          <CaseToolsStrip tools={caseItem.focusTags} />

          <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article
              data-case-reveal
              className="min-w-0 max-w-3xl space-y-3.5 opacity-0 translate-y-4 transition duration-700"
            >
              <div id="traas-case-lead" className="scroll-mt-28">
                {caseItem.lead.map((line) => (
                  <p
                    key={line}
                    className="text-[15px] leading-7 text-[var(--foreground)]/92 sm:text-[16px]"
                  >
                    {line}
                  </p>
                ))}
              </div>

              <h2 id="traas-case-situation" className={headingClass}>
                Ситуация
              </h2>
              {caseItem.situation.map((line) => (
                <p key={line} className="text-[15px] leading-7 text-[var(--foreground)]/92 sm:text-[16px]">
                  {line}
                </p>
              ))}

              <h2 id="traas-case-challenge" className={headingClass}>
                Вызов
              </h2>
              {caseItem.challenge.map((line) => (
                <p key={line} className="text-[15px] leading-7 text-[var(--foreground)]/92 sm:text-[16px]">
                  {line}
                </p>
              ))}

              <h2 id="traas-case-approach" className={headingClass}>
                Подход TraaS
              </h2>
              <ol className="space-y-4">
                {caseItem.actions.map((step, idx) => (
                  <li
                    key={step.title}
                    className="rounded-xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_92%,transparent)] p-4"
                  >
                    <p className="text-[13px] font-semibold text-[var(--primary)]">
                      {idx + 1}. {step.title}
                    </p>
                    <p className="mt-2 text-[15px] leading-7 text-[var(--foreground)]/90">{step.text}</p>
                  </li>
                ))}
              </ol>

              <h2 id="traas-case-changes" className={headingClass}>
                Что изменилось
              </h2>
              <ul className="space-y-2.5">
                {caseItem.outcomes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[15px] leading-7 text-[var(--foreground)]/92"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {caseItem.highlights.map((line) => (
                <CaseQuote key={line} text={line} />
              ))}
            </article>

            <CaseSidePanel tools={caseItem.focusTags} sections={SIDE_SECTIONS} nextPrev={{}} />
          </section>

          <CaseResults
            id="traas-case-results"
            heading="Итоги"
            items={caseItem.outcomeCards}
          />

          <CaseContextBullets
            id="traas-case-relevance"
            title="Кому и зачем этот кейс"
            items={caseItem.whyItMatters}
          />

          <div id="contact-cta" className="mt-10 scroll-mt-28">
            <CasesCtaPanel
              title={caseItem.cta.finalTitle}
              text={caseItem.cta.finalText}
              buttonLabel={caseItem.cta.buttonLabel}
              backHref="/cases"
              backLabel="Вернуться к кейсам TraaS"
            />
          </div>
      </main>

      <SiteFooter content={siteContent} />
    </CasePageLayout>
  );
}
