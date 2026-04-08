import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import type { TechCampCaseRecord } from "@/data/cases/types";
import { CaseSectionNav } from "@/components/cases/CaseProgressAndNav";

export function CasePageLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">{children}</div>;
}

export function CaseTopBar() {
  return (
    <div className="border-b border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--background)_92%,transparent)]">
      <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between px-4 sm:px-6">
        <span className="text-sm font-medium text-[var(--foreground)]">Tech Camp Alumni</span>
        <Link
          href="/tech-bootcamp/cases"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Все кейсы
        </Link>
      </div>
    </div>
  );
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
      className="opacity-0 translate-y-4 transition duration-700 rounded-3xl border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--surface)_97%,transparent),color-mix(in_oklab,var(--surface-2)_86%,transparent))] p-6 sm:p-8 motion-safe:hover:shadow-[0_20px_50px_-36px_rgba(227,6,19,0.35)]"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[#e30613]">
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
                className="rounded-lg border border-[var(--divider)] bg-[var(--surface-2)]/45 p-3 transition duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#e30613]/35"
              >
                <p className="text-xl font-semibold leading-none text-[#e30613]">{metric.value}</p>
                <p className="mt-1 text-[11px] text-[var(--muted)]">{metric.label}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export function CaseTLDR({ items }: { items: TechCampCaseRecord["tldr"] }) {
  return (
    <section
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">TL;DR</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <article key={item.label} className="rounded-xl border border-[var(--divider)] bg-[var(--surface-2)]/45 p-3.5">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#e30613]">{item.label}</p>
            <p className="mt-1.5 text-[13px] leading-6 text-[var(--foreground)]/92">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CaseQuote({ text }: { text: string }) {
  return (
    <blockquote className="my-3 rounded-xl border-l-2 border-[#e30613] bg-[var(--surface)] px-4 py-3 text-[15px] italic leading-7 text-[var(--foreground)]/95">
      {text}
    </blockquote>
  );
}

export function CaseHighlight({ text }: { text: string }) {
  return (
    <div className="my-3 rounded-xl border border-[#e30613]/35 bg-[#e30613]/8 px-4 py-3 text-[14px] leading-6 text-[var(--foreground)]/95">
      {text}
    </div>
  );
}

export function CaseResults({ items }: { items: TechCampCaseRecord["results"] }) {
  return (
    <section
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <h2 className="text-xl font-semibold">Результаты</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={`${item.value}-${item.label}`} className="rounded-xl border border-[var(--divider)] bg-[var(--surface-2)]/45 p-4">
            <p className="text-2xl font-semibold leading-none text-[#e30613]">{item.value}</p>
            <p className="mt-1.5 text-[12px] leading-5 text-[var(--muted)]">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CaseOptionalContext({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section
      data-case-reveal
      className="opacity-0 translate-y-4 transition duration-700 mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <h2 className="text-xl font-semibold">Контекст Tech Camp</h2>
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
              className="block rounded-md border border-[var(--border)] px-3 py-2 text-[13px] transition hover:border-[#e30613]/45"
            >
              ← {nextPrev.prev.title}
            </Link>
          ) : null}
          {nextPrev.next ? (
            <Link
              href={`/tech-bootcamp/cases/${nextPrev.next.slug}`}
              className="block rounded-md border border-[var(--border)] px-3 py-2 text-[13px] transition hover:border-[#e30613]/45"
            >
              {nextPrev.next.title} →
            </Link>
          ) : null}
        </div>
      </section>
    </aside>
  );
}
