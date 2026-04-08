import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import type { SiteContent } from "@/types/content";
import { Clock, Newspaper } from "lucide-react";

export function PublicationsSection({ content }: { content: SiteContent }) {
  return (
    <AnimatedSection
      id="publications"
      className="scroll-mt-24 relative bg-[var(--surface-soft)] py-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_12%_0%,rgba(227,6,19,0.12),transparent_30%),radial-gradient(circle_at_90%_12%,rgba(139,110,34,0.08),transparent_30%)]" />
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#e30613]/14 text-[#ff6f77] ring-1 ring-[#e30613]/35">
              <Newspaper className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              {content.publicationsIntro.title}
            </h2>
            <p className="mt-2 max-w-xl text-[var(--muted)]">
              {content.publicationsIntro.subtitle}
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.publications.map((pub) => (
            <article
              key={pub.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_88%,transparent)] transition hover:border-[#e30613]/45 hover:bg-[color:color-mix(in_oklab,var(--surface)_95%,transparent)] hover:shadow-[0_12px_35px_rgba(227,6,19,0.12)]"
            >
              <VisualPlaceholder
                className="aspect-[16/10] min-h-0 rounded-none rounded-t-2xl"
                label="Обложка статьи"
              />
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#ff5a65]">
                  {pub.categoryName}
                </span>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--foreground)]">
                  <a href={pub.href} className="hover:text-[#ff7d85]">
                    {pub.title}
                  </a>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                  {pub.subTitle}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-[var(--muted)]">
                  <time dateTime={pub.date}>{pub.date}</time>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {pub.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
