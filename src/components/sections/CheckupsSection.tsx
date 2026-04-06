"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { SiteContent } from "@/types/content";
import { ChevronRight, Sparkles } from "lucide-react";

const CHECKUPS_BG = "/images/checkups-mesh-bg.png";

export function CheckupsSection({ content }: { content: SiteContent }) {
  const [activeId, setActiveId] = useState(content.checkups[0]?.id ?? "");
  const active =
    content.checkups.find((item) => item.id === activeId) ?? content.checkups[0];

  if (!active) return null;

  return (
    <AnimatedSection
      id="tech-bootcamp"
      className="relative scroll-mt-24 overflow-hidden py-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#0d0d13]" aria-hidden />
        <div className="absolute inset-0 opacity-[0.44]">
          <Image
            src={CHECKUPS_BG}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_42%] brightness-[0.86] contrast-[1.1] saturate-[0.55] hue-rotate-[12deg]"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-[#0d0d13]/46" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/68 via-[#0d0d13]/14 to-[#08080f]/42"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#e30613]/11 via-transparent to-[#1a0508]/24"
          aria-hidden
        />
      </div>

      <Container className="relative z-10">
        <header className="mb-11 max-w-3xl space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl sm:leading-tight">
            {content.checkupsIntro.title}
          </h2>
          {content.checkupsIntro.subtitle ? (
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-zinc-400 sm:text-[15px] sm:leading-relaxed">
              {content.checkupsIntro.subtitle}
            </p>
          ) : null}
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.4fr)]">
          <aside className="rounded-2xl border border-white/10 bg-[#0d0d13]/55 p-3 backdrop-blur-md">
            <ul className="space-y-2">
              {content.checkups.map((item) => {
                const isActive = item.id === active.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                        isActive
                          ? "bg-[#e30613]/18 text-zinc-100 ring-1 ring-[#e30613]/40"
                          : "bg-white/[0.02] text-zinc-300 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span className="pr-3 text-sm font-medium leading-snug sm:text-base">
                        {item.title}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition ${
                          isActive
                            ? "text-[#ff8b94]"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <article className="rounded-2xl border border-[#e30613]/25 bg-gradient-to-br from-[#1a0f14]/95 via-[#14141b]/95 to-[#111118]/95 p-6 backdrop-blur-sm sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e30613]/12 px-3 py-1 text-xs font-semibold text-[#ff8b94] ring-1 ring-[#e30613]/30">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Ожидаемый результат
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl">
              {active.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {active.description}
            </p>

            {active.outcomes?.length ? (
              <ul className="mt-5 space-y-2">
                {active.outcomes.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6e79]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        </div>
      </Container>
    </AnimatedSection>
  );
}
