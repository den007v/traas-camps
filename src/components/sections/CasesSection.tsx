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
    action: "Провели полную диагностику ИТ-блока и сформировали приоритетный портфель инициатив.",
    description: "Выявили 8 критических ограничений роста и рассчитали эффект программы развития >0,5 млрд руб./год.",
    bg: "#0d1520",
    visual: <MedsiVisual />,
  },
  {
    slug: "/cases/segezha",
    company: "Сегежа",
    caseName: "Инструменты управления",
    action: "Запустили диагностику процессов и пилот новой модели управления проектами.",
    description: "Перенесли проектный офис в единый контур Asana и выстроили прозрачный контроль сроков и нагрузки.",
    bg: "#08101a",
    visual: <SegezhaVisual />,
  },
  {
    slug: "/tech-bootcamp",
    company: "TechBootcamp",
    caseName: "Обучение",
    action: "Собрали программу развития ИТ-лидеров с упором на практику и внедрение.",
    description: "23 компании, NPS 77.8%, рост компетенций участников на 23% и измеримый эффект в реальных командах.",
    bg: "#0e1928",
    visual: <BootcampVisual />,
  },
];

export function CasesSection() {
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cases.map((item, index) => (
            <Link
              key={item.slug}
              href={item.slug}
              className="group relative block overflow-hidden rounded-2xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_92%,#120f16)] transition duration-300 hover:border-[#e30613]/45 hover:bg-[color:color-mix(in_oklab,var(--surface)_85%,#1c1217)] hover:shadow-[0_20px_45px_-24px_rgba(227,6,19,0.45)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    index === 0
                      ? "radial-gradient(circle at 18% 0%, rgba(227,6,19,0.24), transparent 62%)"
                      : index === 1
                        ? "radial-gradient(circle at 50% 0%, rgba(227,6,19,0.22), transparent 62%)"
                        : "radial-gradient(circle at 82% 0%, rgba(227,6,19,0.24), transparent 62%)",
                }}
              />

              <div
                className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--divider)]"
                style={{ backgroundColor: item.bg }}
              >
                <div className="absolute inset-0 transition duration-300 group-hover:scale-[1.02]">
                  {item.visual}
                </div>
              </div>

              <div className="px-5 pb-6 pt-4">
                <p className="mb-2 text-[19px] font-semibold leading-tight text-[var(--foreground)]">
                  {item.company}
                  <span className="mx-2 text-[var(--muted)]">·</span>
                  <span className="text-[var(--foreground)]">{item.caseName}</span>
                </p>
                <p className="mb-2 text-[14px] leading-relaxed text-[color:color-mix(in_oklab,var(--foreground)_82%,white_18%)]">
                  {item.action}
                </p>
                <p className="text-[13px] leading-relaxed text-[var(--muted)]">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
