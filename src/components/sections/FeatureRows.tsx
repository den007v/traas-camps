import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import type { SiteContent } from "@/types/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeatureRows({ content }: { content: SiteContent }) {
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
                <VisualPlaceholder
                  label={`Визуал ${index + 1} — замените изображением`}
                  className="min-h-[240px] sm:min-h-[280px]"
                />
              </div>
              <div
                className={row.imageSide === "left" ? "lg:order-2" : "lg:order-1"}
              >
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                  {row.title}
                </h2>
                <p className="mt-4 text-[var(--muted)]">
                  {row.description}
                </p>
                <a
                  href={row.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#ff5a65] hover:text-[#ff7d85]"
                >
                  {row.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                {index === 0 ? (
                  <div className="mt-3">
                    <Link
                      href="/tech-bootcamp/cases"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]/55 hover:text-[var(--primary)]"
                    >
                      Посмотреть все кейсы
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </AnimatedSection>
      ))}
    </div>
  );
}
