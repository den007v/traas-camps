import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { SiteContent } from "@/types/content";
import { AssessmentInfographic } from "@/components/sections/AssessmentInfographic";

export function QuickNavCards({ content }: { content: SiteContent }) {
  return (
    <AnimatedSection
      id="assessment"
      className="relative border-y border-[var(--divider)] bg-[var(--surface-soft)] py-14"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_8%_0%,rgba(227,6,19,0.14),transparent_30%),radial-gradient(circle_at_92%_10%,rgba(159,123,36,0.09),transparent_28%)]" />
      <Container>
        <div className="mb-10 max-w-3xl space-y-4 lg:mb-12">
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[2.35rem] lg:leading-[1.1]">
            {content.quickNavIntro.title}
          </h2>
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-[15px] sm:leading-relaxed">
            {content.quickNavIntro.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {content.quickNav.map((card) => (
            <article
              key={card.id}
              id={card.id}
              className="group scroll-mt-28 [perspective:1400px]"
            >
              <div className="relative min-h-[380px] w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] sm:min-h-[400px]">
                <div className="absolute inset-0 flex [backface-visibility:hidden]">
                  <div className="flex w-full flex-col justify-between rounded-2xl border border-[var(--divider)] bg-[var(--surface)] p-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.22)] ring-1 ring-inset ring-[#e30613]/15">
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-center rounded-xl bg-gradient-to-b from-white/[0.06] to-transparent px-3 py-4">
                        <AssessmentInfographic variant={card.variant} />
                      </div>
                      <p className="text-balance text-[15px] font-medium leading-snug tracking-tight text-[var(--foreground)] sm:text-base">
                        {card.frontTitle}
                      </p>
                    </div>
                    <p className="mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                      Подробности
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 flex [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex h-full min-h-[380px] w-full flex-col overflow-hidden rounded-2xl border border-[var(--divider)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.26)] ring-1 ring-inset ring-[#e30613]/20 sm:min-h-[400px]">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-4 pt-5">
                      <h3 className="shrink-0 text-[15px] font-semibold leading-tight text-[var(--foreground)]">
                        {card.title}
                      </h3>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--muted)]">
                        {card.description}
                      </p>
                      {card.backPoints?.length ? (
                        <ul className="mt-4 space-y-2 border-t border-[var(--divider)] pt-3.5">
                          {card.backPoints.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2.5 text-[12px] leading-snug text-[var(--muted)]"
                            >
                              <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#ff6e79]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className="shrink-0 border-t border-[var(--divider)] px-5 py-4">
                      <a
                        href={card.href}
                        className="inline-flex w-full items-center justify-center rounded-full border border-[#ff5a65]/50 bg-[#e30613]/12 px-4 py-2.5 text-[13px] font-semibold text-[#ffc4c8] transition hover:border-[#ff5a65]/65 hover:bg-[#e30613]/22"
                      >
                        Пройти
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
