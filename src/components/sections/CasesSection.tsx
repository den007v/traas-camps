"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MedsiVisual } from "@/components/illustrations/MedsiVisual";
import { SegezhaVisual } from "@/components/illustrations/SegezhaVisual";
import { BootcampVisual } from "@/components/illustrations/BootcampVisual";

const cases = [
  {
    slug: "/cases/medsi-it-diagnostic",
    company: "Крупная частная медицинская сеть",
    caseName: "ИТ-диагностика",
    action: "Провели диагностику ИТ-блока и собрали приоритетный план изменений.",
    impact: "8 критических ограничений · потенциал эффекта >0,5 млрд ₽/год",
    bg: "#0d1520",
    visual: <MedsiVisual />,
  },
  {
    slug: "/cases/segezha-project-office",
    company: "Сегежа",
    caseName: "Инструменты управления",
    action: "Запустили диагностику и пилот новой модели управления проектами.",
    impact: "Единый контур проектного офиса · прозрачный контроль сроков и нагрузки",
    bg: "#08101a",
    visual: <SegezhaVisual />,
  },
  {
    slug: "/cases/tech-bootcamp",
    company: "TechBootcamp",
    caseName: "Обучение",
    action: "Собрали интенсив развития ИТ-лидеров с фокусом на внедрение в работе.",
    impact: "23 компании · NPS 77.8% · рост компетенций +23%",
    bg: "#0e1928",
    visual: <BootcampVisual />,
  },
];

export function CasesSection() {
  const defaultActive = 1;
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  return (
    <AnimatedSection id="cases" className="scroll-mt-24 border-y border-[var(--divider)] bg-[var(--surface-soft)] py-16">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_12%_8%,rgba(227,6,19,0.14),transparent_34%),radial-gradient(circle_at_86%_14%,rgba(255,255,255,0.08),transparent_36%)]" />
      <Container>
        <div id="case-team" className="mb-8 flex items-baseline justify-between border-b border-[var(--divider)] pb-4">
          <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Наши кейсы</span>
          <Link
            href="/cases"
            className="group inline-flex items-center gap-1.5 border-b border-[var(--divider)] pb-px text-sm text-[var(--muted)] transition-colors hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
          >
            Все кейсы
            <span className="transition group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <div className="mt-4 md:mt-14 md:px-3 lg:px-6" onMouseLeave={() => setActiveIndex(defaultActive)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {cases.map((item, index) => {
            const isActive = index === activeIndex;
            return (
            <Link
              key={item.slug}
              href={item.slug}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group relative block h-full overflow-hidden rounded-2xl border bg-[color:color-mix(in_oklab,var(--surface)_92%,#120f16)] transition-transform delay-[40ms] duration-[1430ms] [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] ${
                isActive
                  ? "z-30 border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_84%,#1f1218)] shadow-[0_28px_72px_-34px_rgba(227,6,19,0.34)]"
                  : "z-10 border-[var(--divider)] shadow-[0_16px_36px_-26px_rgba(0,0,0,0.5)]"
              }`}
              style={{
                transform: isActive
                  ? "translate3d(0,0,0) scaleX(1.04) scaleY(1.11)"
                  : "translate3d(0,0,0) scale(0.94)",
                transformOrigin: "center center",
                willChange: "transform",
              }}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-75 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(to right, rgba(227,6,19,0.055), rgba(227,6,19,0.055)) top / 100% 1px no-repeat, linear-gradient(to right, rgba(227,6,19,0.154), rgba(227,6,19,0.154)) bottom / 100% 1px no-repeat, linear-gradient(to bottom, rgba(227,6,19,0.055), rgba(227,6,19,0.154)) left / 1px 100% no-repeat, linear-gradient(to bottom, rgba(227,6,19,0.055), rgba(227,6,19,0.154)) right / 1px 100% no-repeat",
                }}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-75 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(52% 18% at 50% 0%, rgba(227,6,19,0.09), rgba(227,6,19,0) 100%), radial-gradient(52% 18% at 50% 100%, rgba(227,6,19,0.09), rgba(227,6,19,0) 100%)",
                }}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity delay-[40ms] duration-[1430ms] [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(227,6,19,0.14), inset 0 -52px 94px -58px rgba(227,6,19,0.17), inset 34px 0 64px -46px rgba(227,6,19,0.1), inset -34px 0 64px -46px rgba(227,6,19,0.1)",
                }}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-24 transition-opacity duration-75 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    index === 0
                      ? "radial-gradient(circle at 18% 0%, rgba(227,6,19,0.09), transparent 62%)"
                      : index === 1
                        ? "radial-gradient(circle at 50% 0%, rgba(227,6,19,0.08), transparent 62%)"
                        : "radial-gradient(circle at 82% 0%, rgba(227,6,19,0.09), transparent 62%)",
                }}
              />

              <div
                className="relative aspect-[8/9] w-full overflow-hidden border-b border-[var(--divider)]"
                style={{ backgroundColor: item.bg }}
              >
                <div className="absolute inset-0">
                  {item.visual}
                </div>
              </div>

              <div className="px-5 pb-5 pt-4">
                <p className="mb-1.5 text-[22px] font-semibold leading-tight text-[var(--foreground)]">
                  {item.company}
                </p>
                <p className="mb-2 font-mono text-[17px] leading-tight tracking-[0.01em] text-[color:color-mix(in_oklab,var(--muted)_82%,var(--foreground)_18%)]">
                  {item.caseName}
                </p>
                <p className="text-[14px] leading-relaxed text-[color:color-mix(in_oklab,var(--foreground)_86%,white_14%)]">
                  {item.action}
                </p>
              </div>
            </Link>
            );
          })}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
