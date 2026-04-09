import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CasesCtaPanel } from "@/components/tech-bootcamp/CasesCtaPanel";
import { techCampCases } from "@/data/cases/cases";
import { siteContent } from "@/data/siteContent";

function estimateReadMinutes(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(4, Math.round(words / 220));
}

export default function TechBootcampCasesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader content={siteContent} currentPageLabel="Кейсы выпускников Tech Bootcamp" />

      <Container className="py-8 sm:py-10">
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(145deg,color-mix(in_oklab,var(--surface)_96%,transparent),color-mix(in_oklab,var(--surface-2)_86%,transparent))] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#e30613]/10 blur-3xl" />
          <h1 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Практические кейсы выпускников
          </h1>
          <p className="relative mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Реальные истории внедрений и управленческих решений от участников программы:
            от продуктовых запусков до автоматизации управленческой рутины.
          </p>
          <div className="relative mt-5 flex flex-wrap gap-2">
            {["CTO/CIO кейсы", "Метрики результата", "Полные тексты", "Практические инструменты"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] text-[var(--muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {techCampCases.map((item) => (
            <article
              key={item.slug}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#e30613]/55 hover:shadow-[0_0_28px_rgba(227,6,19,0.14)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-[#e30613]/[0.08] blur-2xl transition group-hover:bg-[#e30613]/[0.12]" />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[11px] text-[var(--muted)]">
                    {item.coverTag}
                  </span>
                  <span className="text-[11px] text-[var(--muted)]">{estimateReadMinutes(item.fullText)} мин чтения</span>
                </div>
                <h2 className="text-lg font-semibold leading-tight">{item.title}</h2>
                <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-[var(--muted)]">{item.subtitle}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface-2)_60%,transparent)] p-2.5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">Ключевая метрика</p>
                    <p className="mt-1 text-sm font-semibold text-[#e30613]">{item.metrics[0]?.value}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">Фокус</p>
                    <p className="mt-1 text-[12px] text-[var(--foreground)]/90">{item.domain}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 text-[12px] text-[var(--muted)]">
                  <p>
                    Автор: <span className="text-[var(--foreground)]">{item.person.name}</span>
                  </p>
                  <p>
                    Компания: <span className="text-[var(--foreground)]">{item.person.company}</span>
                  </p>
                </div>
                <Link
                  href={`/tech-bootcamp/cases/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#e30613] transition hover:text-[#ff4854]"
                >
                  Читать кейс
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-10">
          <CasesCtaPanel backHref="/tech-bootcamp" />
        </div>
      </Container>
    </div>
  );
}
