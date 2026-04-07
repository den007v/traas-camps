import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { SiteContent } from "@/types/content";

const HERO_IMAGE = "/images/hero-servers.png";

/** Параллелограмм со скруглением: наклон + полупрозрачное «стекло» (виден фон под кнопкой) */
function ProcessArrowLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="group min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <span className="inline-flex w-full -skew-x-[12deg] items-center justify-center rounded-sm border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_84%,transparent)] px-2 py-2.5 backdrop-blur-xl transition hover:bg-[color:color-mix(in_oklab,var(--surface)_96%,transparent)] sm:px-3 sm:py-2.5">
        <span className="inline-block skew-x-[12deg] whitespace-nowrap text-center text-[10px] font-normal leading-none text-[var(--foreground)] sm:text-[11px] md:text-xs">
          {children}
        </span>
      </span>
    </a>
  );
}

export function HeroSection({ content }: { content: SiteContent }) {
  const links = content.hero.links ?? [];

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="relative min-h-[min(50vh,500px)] w-full">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hero-main-image"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-overlay-1)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--hero-overlay-2), color-mix(in oklab, var(--hero-overlay-1) 72%, transparent), color-mix(in oklab, var(--hero-overlay-1) 72%, transparent))",
          }}
          aria-hidden
        />

        {/* Контент прижат к низу изображения */}
        <Container className="relative flex min-h-[min(50vh,500px)] flex-col justify-end pb-8 pt-10 sm:pb-10 sm:pt-12 lg:pb-10 lg:pt-14">
          <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
            <div className="min-w-0 lg:max-w-none">
              {content.hero.eyebrow ? (
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  {content.hero.eyebrow}
                </p>
              ) : null}
              <h1
                id="hero-title"
                className="whitespace-pre-line text-4xl font-bold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]"
              >
                {content.hero.title}
              </h1>
              {content.hero.subtitleUnderTitle ? (
                <p className="mt-2 text-xs font-medium tracking-wide text-[var(--muted)] sm:text-sm">
                  {content.hero.subtitleUnderTitle}
                </p>
              ) : null}
            </div>

            <div className="flex min-w-0 flex-col gap-3 lg:-ml-6 lg:gap-3 xl:-ml-10">
              {/* Вторая надпись — мельче, сразу над кнопками */}
              <p className="max-w-xl text-sm font-normal leading-snug text-[var(--foreground)] sm:text-[0.9375rem] sm:leading-relaxed lg:max-w-none">
                {content.hero.subtitle}
              </p>
              {links.length > 0 ? (
                <nav
                  className="grid w-full grid-cols-4 items-stretch gap-1 sm:gap-1"
                  aria-label="Быстрые разделы"
                >
                  {links.map((link) => (
                    <ProcessArrowLink key={link.href} href={link.href}>
                      {link.label}
                    </ProcessArrowLink>
                  ))}
                </nav>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
