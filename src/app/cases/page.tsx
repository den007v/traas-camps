import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { siteContent } from "@/data/siteContent";
import { traasCases } from "@/data/cases/traasCases";
import { MedsiVisual } from "@/components/illustrations/MedsiVisual";
import { SegezhaVisual } from "@/components/illustrations/SegezhaVisual";
import { BootcampVisual } from "@/components/illustrations/BootcampVisual";

export default function TraasCasesPage() {
  const getCardVisual = (slug: string) => {
    if (slug === "medsi-it-diagnostic") {
      return { bg: "#0d1520", visual: <MedsiVisual /> };
    }
    if (slug === "segezha-project-office") {
      return { bg: "#08101a", visual: <SegezhaVisual /> };
    }
    if (slug === "tech-bootcamp") {
      return { bg: "#0e1928", visual: <BootcampVisual /> };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader content={siteContent} currentPageLabel="Кейсы TraaS" backHref="/#cases" />

      <Container className="py-8 sm:py-10">
        <section className="rounded-3xl border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--surface)_96%,transparent),color-mix(in_oklab,var(--surface-2)_88%,transparent))] p-6 sm:p-8">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Кейсы TraaS: как мы собираем сложные изменения в рабочую систему
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Практические кейсы для CEO, собственников, CIO/CTO и руководителей трансформации: от
            диагностики разрывов до внедрения управляемой модели.
          </p>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {traasCases.map((item) => (
            <article
              key={item.slug}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[color:color-mix(in_oklab,var(--primary)_55%,transparent)] hover:shadow-[0_16px_40px_-22px_color-mix(in_oklab,var(--primary)_32%,transparent)]"
            >
              {getCardVisual(item.slug) ? (
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--divider)]"
                  style={{ backgroundColor: getCardVisual(item.slug)!.bg }}
                >
                  <div className="absolute inset-0 transition duration-300 group-hover:scale-[1.02]">
                    {getCardVisual(item.slug)!.visual}
                  </div>
                </div>
              ) : null}

              <div className="p-5">
                <span className="inline-flex rounded-full border border-[var(--divider)] bg-[var(--surface-2)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {item.card.badge}
                </span>
                <h2 className="mt-3 text-[22px] font-semibold leading-tight tracking-tight">{item.card.title}</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[color:color-mix(in_oklab,var(--foreground)_84%,white_16%)]">
                  {item.card.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.card.bullets.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-[color:color-mix(in_oklab,var(--primary)_38%,var(--divider))] bg-[color:color-mix(in_oklab,var(--surface-2)_70%,transparent)] px-3 py-1 text-[11px] font-medium leading-tight text-[color:color-mix(in_oklab,var(--primary)_72%,white_28%)]"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/cases/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition group-hover:text-[var(--primary-hover)]"
                >
                  {item.card.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </Container>

      <SiteFooter content={siteContent} />
    </div>
  );
}
