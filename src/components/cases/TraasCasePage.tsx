import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteContent } from "@/data/siteContent";
import type { TraasCaseRecord } from "@/data/cases/traasCases";
import { CasesCtaPanel } from "@/components/tech-bootcamp/CasesCtaPanel";

export function TraasCasePage({ caseItem }: { caseItem: TraasCaseRecord }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader content={siteContent} currentPageLabel="Кейс TraaS" backHref="/cases" />

      <main className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 sm:py-10">
        <section className="rounded-3xl border border-[var(--border)] bg-[linear-gradient(165deg,color-mix(in_oklab,var(--surface)_95%,transparent),color-mix(in_oklab,var(--surface-2)_86%,transparent))] p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <Link href="/cases" className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)]">
              <ChevronLeft className="h-3.5 w-3.5" />
              Кейсы TraaS
            </Link>
            <span>/</span>
            <span>{caseItem.label}</span>
          </div>

          <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
            {caseItem.title}
          </h1>

          <div className="mt-5 max-w-4xl space-y-3">
            {caseItem.lead.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {line}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact-cta"
              className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--primary)_72%,#ffffff)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_84%,#ff5e67),var(--primary-hover))] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_color-mix(in_oklab,var(--primary)_34%,transparent)] transition hover:brightness-105"
            >
              {caseItem.cta.firstScreenLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {caseItem.summary.map((item) => (
              <article
                key={item.label}
                className="rounded-xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_88%,transparent)] p-3.5"
              >
                <p className="text-[11px] uppercase tracking-[0.09em] text-[var(--primary)]">
                  {item.label}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--foreground)]/92">{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold">Ситуация</h2>
            <div className="mt-3 space-y-3">
              {caseItem.situation.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-[var(--muted)]">
                  {line}
                </p>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold">Вызов</h2>
            <div className="mt-3 space-y-3">
              {caseItem.challenge.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-[var(--muted)]">
                  {line}
                </p>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">Что сделал TraaS</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {caseItem.actions.map((step, idx) => (
              <article
                key={step.title}
                className="rounded-xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_84%,transparent)] p-4"
              >
                <p className="text-sm font-semibold text-[var(--primary)]">{idx + 1}. {step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Результат</h2>
            <ul className="mt-4 space-y-2.5">
              {caseItem.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Ключевые эффекты</p>
              <div className="mt-3 space-y-2.5">
                {caseItem.outcomeCards.map((card) => (
                  <div key={card.value} className="rounded-lg border border-[var(--divider)] bg-[var(--surface-2)]/45 p-3">
                    <p className="text-lg font-semibold text-[var(--primary)]">{card.value}</p>
                    <p className="mt-1 text-[12px] leading-5 text-[var(--muted)]">{card.label}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {caseItem.highlights.map((line) => (
            <blockquote
              key={line}
              className="rounded-2xl border border-[color:color-mix(in_oklab,var(--primary)_35%,transparent)] bg-[color:color-mix(in_oklab,var(--primary)_8%,transparent)] p-5 text-sm leading-relaxed text-[var(--foreground)]/95"
            >
              {line}
            </blockquote>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">Почему этот кейс важен</h2>
          <div className="mt-4 space-y-3">
            {caseItem.whyItMatters.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-[var(--muted)]">
                {line}
              </p>
            ))}
          </div>
        </section>

        <div id="contact-cta" className="mt-10">
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
    </div>
  );
}
