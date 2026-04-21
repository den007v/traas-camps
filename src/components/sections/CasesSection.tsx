import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MedsiVisual } from "@/components/illustrations/MedsiVisual";
import { SegezhaVisual } from "@/components/illustrations/SegezhaVisual";
import { BootcampVisual } from "@/components/illustrations/BootcampVisual";

const cases = [
  {
    slug: "/cases/medsi",
    company: "Медси",
    tag: "Медси · IT-диагностика",
    title: "Технологический аудит группы компаний",
    result: "55 инициатив, 4 портфеля, роадмап на 3 года",
    bg: "#0d1520",
    visual: <MedsiVisual />,
  },
  {
    slug: "/cases/segezha",
    company: "Сегежа",
    tag: "Сегежа · Инструменты управления",
    title: "Внедрение Asana в проектный офис",
    result: "Диагностика процессов, пилот в проектном офисе, перенос управления в единый инструмент",
    bg: "#08101a",
    visual: <SegezhaVisual />,
  },
  {
    slug: "/tech-bootcamp",
    company: "TechBootcamp",
    tag: "TechBootcamp · Обучение",
    title: "Программа развития IT-лидеров",
    result: "23 компании, NPS 77.8%, рост компетенций участников на 23%",
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
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em]">
                  <span className="font-semibold text-[var(--foreground)]">{item.company}</span>
                  <span className="mx-1.5 text-[var(--muted)]">·</span>
                  <span className="text-[var(--muted)]">{item.tag.replace(`${item.company} · `, "")}</span>
                </p>
                <p className="mb-2 text-[15px] font-semibold leading-snug text-[var(--foreground)]">{item.title}</p>
                <p className="text-[13px] leading-relaxed text-[var(--muted)]">{item.result}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
