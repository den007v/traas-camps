import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import type { SiteContent } from "@/types/content";
import { Quote } from "lucide-react";

export function ServicesSection({ content }: { content: SiteContent }) {
  return (
    <AnimatedSection
      id="reviews"
      className="scroll-mt-24 relative border-t border-[var(--divider)] bg-[var(--surface-soft)] py-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-65 [background-image:radial-gradient(circle_at_10%_15%,rgba(227,6,19,0.13),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(143,112,31,0.09),transparent_28%)]" />
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#e30613]/14 text-[#ff6f77] ring-1 ring-[#e30613]/35">
              <Quote className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              {content.servicesIntro.title}
            </h2>
            <p className="mt-2 max-w-xl text-[var(--muted)]">
              {content.servicesIntro.subtitle}
            </p>
          </div>
          <a
            href="#footer"
            className="text-sm font-semibold text-[#ff5a65] hover:underline"
          >
            Связаться →
          </a>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {content.services.map((s) => (
            <article
              key={s.slug}
              className="group overflow-hidden rounded-2xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_88%,transparent)] shadow-sm transition hover:border-[#e30613]/45 hover:bg-[color:color-mix(in_oklab,var(--surface)_95%,transparent)] hover:shadow-[0_12px_35px_rgba(227,6,19,0.12)]"
            >
              <VisualPlaceholder
                className="min-h-[160px] rounded-none rounded-t-2xl"
                label="Карточка отзыва"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {s.description}
                </p>
                {s.href ? (
                  <a
                    href={s.href}
                    className="mt-4 inline-block text-sm font-semibold text-[#ff5a65] group-hover:underline"
                  >
                    Подробнее
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
