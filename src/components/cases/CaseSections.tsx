import Link from "next/link";
import type { ReactNode } from "react";
import type { TechCampCaseRecord } from "@/data/cases/types";
import { CaseSectionNav } from "@/components/cases/CaseProgressAndNav";

export function CasePageLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">{children}</div>;
}

export function CaseHero({
  caseItem,
  readTime,
}: {
  caseItem: TechCampCaseRecord;
  readTime: number;
}) {
  return (
    <section
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 rounded-3xl border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--surface)_97%,transparent),color-mix(in_oklab,var(--surface-2)_86%,transparent))] p-6 sm:p-8 motion-safe:hover:shadow-[0_20px_50px_-36px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--primary)]">
              {caseItem.heroBadge}
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] text-[var(--muted)]">
              {readTime} мин чтения
            </span>
          </div>
          <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
            {caseItem.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[var(--muted)]">{caseItem.subtitle}</p>
          <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[12px] text-[var(--muted)]">
            <span className="font-medium text-[var(--foreground)]">{caseItem.person.name}</span>
            <span>·</span>
            <span>{caseItem.person.role}</span>
            <span>·</span>
            <span>{caseItem.person.company}</span>
          </div>
        </div>

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Ключевые факты</p>
          <div className="mt-3 space-y-2.5">
            {caseItem.metrics.slice(0, 3).map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-[var(--divider)] bg-[var(--surface-2)]/45 p-3 transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[color:color-mix(in_oklab,var(--primary)_35%,transparent)]"
              >
                <p className="text-xl font-semibold leading-none text-[var(--primary)]">{metric.value}</p>
                <p className="mt-1 text-[11px] text-[var(--muted)]">{metric.label}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export function CaseTLDR({ items }: { items: Array<{ label: string; text: string }> }) {
  return (
    <section
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Краткие выводы</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5 text-[13px] leading-6 text-[var(--foreground)]/92">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
            <span>
              <span className="font-semibold text-[var(--foreground)]">{item.label}:</span> {item.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseToolsStrip({ tools }: { tools: string[] }) {
  return (
    <section
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Инструменты и технологии</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-[var(--divider)] bg-[var(--surface-2)]/45 px-3 py-1 text-[12px] text-[var(--foreground)]/90"
          >
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}

export function CaseQuote({ text }: { text: string }) {
  return (
    <blockquote className="my-3 rounded-xl border-l-2 border-[var(--primary)] bg-[var(--surface)] px-4 py-3 text-[15px] italic leading-7 text-[var(--foreground)]/95">
      {text}
    </blockquote>
  );
}

export function CaseHighlight({ text }: { text: string }) {
  return (
    <div className="my-3 rounded-xl border border-[color:color-mix(in_oklab,var(--primary)_35%,transparent)] bg-[color:color-mix(in_oklab,var(--primary)_10%,transparent)] px-4 py-3 text-[14px] leading-6 text-[var(--foreground)]/95">
      {text}
    </div>
  );
}

export function CaseResults({
  items,
  id,
  heading = "Результаты",
}: {
  items: Array<{ value: string; label: string }>;
  id?: string;
  heading?: string;
}) {
  return (
    <section
      id={id}
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <h2 className="text-xl font-semibold">{heading}</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={`${item.value}-${item.label}`} className="rounded-xl border border-[var(--divider)] bg-[var(--surface-2)]/45 p-4">
            <p className="text-2xl font-semibold leading-none text-[var(--primary)]">{item.value}</p>
            <p className="mt-1.5 text-[12px] leading-5 text-[var(--muted)]">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CaseOptionalContext({ items }: { items: string[] }) {
  if (!items.length) return null;
  return <CaseContextBullets title="Связь с TechBootcamp" items={items} />;
}

/** Универсальный блок со списком тезисов (как «Связь с TechBootcamp» на кейсе TB). */
export function CaseContextBullets({
  title,
  items,
  id,
}: {
  title: string;
  items: string[];
  id?: string;
}) {
  if (!items.length) return null;
  return (
    <section
      id={id}
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-[13px] leading-6 text-[var(--muted)]">
            — {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseSidePanel({
  tools,
  sections,
  nextPrev,
}: {
  tools: string[];
  sections: Array<{ id: string; title: string }>;
  nextPrev: {
    prev?: { slug: string; title: string };
    next?: { slug: string; title: string };
  };
}) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Навигация по кейсу</p>
        <CaseSectionNav sections={sections} />
      </section>
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Инструменты</p>
        <ul className="mt-2.5 divide-y divide-[var(--divider)]">
          {tools.map((tool) => (
            <li key={tool} className="py-2 text-[13px]">
              {tool}
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Навигация</p>
        <div className="mt-2.5 space-y-2">
          {nextPrev.prev ? (
            <Link
              href={`/tech-bootcamp/cases/${nextPrev.prev.slug}`}
              className="block rounded-md border border-[var(--border)] px-3 py-2 text-[13px] transition hover:border-[color:color-mix(in_oklab,var(--primary)_45%,transparent)]"
            >
              ← {nextPrev.prev.title}
            </Link>
          ) : null}
          {nextPrev.next ? (
            <Link
              href={`/tech-bootcamp/cases/${nextPrev.next.slug}`}
              className="block rounded-md border border-[var(--border)] px-3 py-2 text-[13px] transition hover:border-[color:color-mix(in_oklab,var(--primary)_45%,transparent)]"
            >
              {nextPrev.next.title} →
            </Link>
          ) : null}
        </div>
      </section>
    </aside>
  );
}
