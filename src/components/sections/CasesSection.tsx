import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MedsiIllustration } from "@/components/illustrations/MedsiIllustration";
import { SegezhaIllustration } from "@/components/illustrations/SegezhaIllustration";
import { BootcampIllustration } from "@/components/illustrations/BootcampIllustration";

const cases = [
  {
    slug: "/cases/medsi",
    tag: "Медси · IT-диагностика",
    title: "Технологический аудит группы компаний",
    result: "55 инициатив, 4 портфеля, роадмап на 3 года",
    illustration: <MedsiIllustration />,
  },
  {
    slug: "/cases/segezha",
    tag: "Сегежа · Инструменты управления",
    title: "Внедрение Asana в проектный офис",
    result: "Диагностика процессов, пилот в проектном офисе, перенос управления в единый инструмент",
    illustration: <SegezhaIllustration />,
  },
  {
    slug: "/tech-bootcamp",
    tag: "TechBootcamp · Обучение",
    title: "Программа развития IT-лидеров",
    result: "23 компании, NPS 77.8%, рост компетенций участников на 23%",
    illustration: <BootcampIllustration />,
  },
];

export function CasesSection() {
  return (
    <AnimatedSection id="cases" className="scroll-mt-24 border-y border-[var(--divider)] py-14">
      <Container>
        <div id="case-team" className="mb-6 flex items-baseline justify-between border-b border-[var(--divider)] pb-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Наши кейсы</span>
          <Link
            href="/cases"
            className="border-b border-[var(--divider)] pb-px text-sm text-[var(--muted)] transition-colors hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
          >
            Все кейсы →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px border border-[var(--divider)] bg-[var(--divider)] md:grid-cols-3">
          {cases.map((item) => (
            <Link key={item.slug} href={item.slug} className="group block bg-[var(--surface)]">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--surface-2)] transition-colors group-hover:bg-[color:color-mix(in_oklab,var(--surface-2)_70%,var(--divider))]">
                {item.illustration}
              </div>
              <div className="px-4 pb-5 pt-3">
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{item.tag}</p>
                <p className="mb-1 text-sm font-medium leading-snug text-[var(--foreground)]">{item.title}</p>
                <p className="text-xs leading-relaxed text-[var(--muted)]">{item.result}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
