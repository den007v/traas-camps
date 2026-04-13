import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import type { SiteContent } from "@/types/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { traasCases } from "@/data/cases/traasCases";

export function FeatureRows({ content }: { content: SiteContent }) {
  const featuredTraasCase = traasCases[0];

  return (
    <div id="cases" className="scroll-mt-24 border-y border-[var(--divider)] bg-[var(--surface)] py-8">
      {content.featureRows.map((row, index) => (
        <AnimatedSection
          key={row.id}
          id={index === 0 ? "case-team" : undefined}
          className={`py-12 sm:py-16 ${index === 0 ? "scroll-mt-28" : ""}`}
        >
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div
                className={
                  row.imageSide === "left" ? "lg:order-1" : "lg:order-2"
                }
              >
                {index === 0 && featuredTraasCase ? (
                  <Link
                    href={`/cases/${featuredTraasCase.slug}`}
                    className="group block rounded-2xl border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--surface)_95%,transparent),color-mix(in_oklab,var(--surface-2)_85%,transparent))] p-5 outline-offset-4 transition duration-300 hover:-translate-y-1 hover:border-[color:color-mix(in_oklab,var(--primary)_55%,transparent)] hover:shadow-[0_18px_44px_-24px_color-mix(in_oklab,var(--primary)_34%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary)] sm:p-6"
                  >
                    <span className="inline-flex rounded-full border border-[var(--divider)] bg-[var(--surface)] px-2.5 py-1 text-[11px] text-[var(--muted)]">
                      {featuredTraasCase.card.badge}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--foreground)] sm:text-xl">
                      {featuredTraasCase.card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {featuredTraasCase.card.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {featuredTraasCase.card.bullets.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-[13px] leading-snug text-[var(--muted)]">
                          <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition group-hover:text-[var(--primary-hover)]">
                      {featuredTraasCase.card.ctaLabel}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                ) : (
                  <VisualPlaceholder
                    label={`Визуал ${index + 1} — замените изображением`}
                    className="min-h-[240px] sm:min-h-[280px]"
                  />
                )}
              </div>
              <div
                className={row.imageSide === "left" ? "lg:order-2" : "lg:order-1"}
              >
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                  {row.title}
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] sm:mt-4">
                  {row.description}
                </p>
                {index === 0 ? (
                  <p className="mt-6">
                    <Link
                      href="/cases"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] underline decoration-[var(--divider)] underline-offset-4 transition hover:text-[var(--foreground)] hover:decoration-[var(--primary)]"
                    >
                      Другие кейсы
                      <ArrowRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
                    </Link>
                  </p>
                ) : (
                  <a
                    href={row.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#ff5a65] hover:text-[#ff7d85]"
                  >
                    {row.ctaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </Container>
        </AnimatedSection>
      ))}
    </div>
  );
}
