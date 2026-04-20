import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AutoplayBackgroundVideo } from "@/components/ui/AutoplayBackgroundVideo";
import type { SiteContent } from "@/types/content";

const HERO_IMAGE = "/images/hero-servers.png";
const HERO_VIDEO_WEBM = "/videos/hero-transform.webm";
const HERO_VIDEO_MP4 = "/videos/hero-transform.mp4";

export function HeroSection({ content }: { content: SiteContent }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="relative min-h-[min(62vh,620px)] w-full">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hero-main-image sm:hidden"
        />
        <AutoplayBackgroundVideo
          webmSrc={HERO_VIDEO_WEBM}
          mp4Src={HERO_VIDEO_MP4}
          className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block"
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
        <Container className="relative flex min-h-[min(62vh,620px)] flex-col justify-end pb-10 pt-12 sm:pb-12 sm:pt-14 lg:pb-14 lg:pt-20">
          <div className="w-full">
            <div className="min-w-0 max-w-5xl">
              {content.hero.eyebrow ? (
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  {content.hero.eyebrow}
                </p>
              ) : null}
              <h1
                id="hero-title"
                className="whitespace-pre-line text-4xl font-bold leading-[1.01] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.9rem] xl:text-[4.35rem]"
              >
                {content.hero.title}
              </h1>
              {content.hero.subtitleUnderTitle ? (
                <p className="mt-5 max-w-3xl text-sm font-medium leading-relaxed tracking-wide text-[var(--muted)] sm:text-base">
                  {content.hero.subtitleUnderTitle}
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
