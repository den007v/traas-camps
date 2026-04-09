"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { ContactModal } from "@/components/contact/ContactModal";
import { Container } from "@/components/ui/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteContent } from "@/data/siteContent";
import { techBootcampContent as content } from "@/data/techBootcampContent";
import { techBootcampCases } from "@/data/techBootcampCases";
import { useTheme } from "@/components/theme/ThemeProvider";

const HERO_IMAGE = "/images/hero-servers.png";
const HERO_VIDEO_WEBM = "/videos/hero-transform.webm";
const HERO_VIDEO_MP4 = "/videos/hero-transform.mp4";

function useRevealAnimations() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.remove("opacity-0", "translate-y-6");
          el.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(el);
        });
      },
      { threshold: 0.18 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useAnimatedNumber(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      setValue(target * progress);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-2 sm:px-4">
      <p className="text-xl font-semibold text-[var(--tb-gold)] sm:text-2xl">{value}</p>
      <p className="mt-1 text-xs text-[var(--tb-text-muted)]">{label}</p>
    </div>
  );
}

export function TechBootcampPage() {
  const { theme } = useTheme();
  const [contactOpen, setContactOpen] = useState(false);
  const [openWeekOne, setOpenWeekOne] = useState(0);
  const [openWeekTwo, setOpenWeekTwo] = useState(0);
  const resultsRef = useRef<HTMLElement | null>(null);
  const [resultsInView, setResultsInView] = useState(false);

  useRevealAnimations();

  useEffect(() => {
    if (!resultsRef.current) return;
    const node = resultsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setResultsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const metricOne = useAnimatedNumber(77.8, resultsInView);
  const metricTwo = useAnimatedNumber(26, resultsInView);
  const metricThree = useAnimatedNumber(9.1, resultsInView);

  const vars = useMemo(
    () =>
      ({
        "--tb-bg": theme === "dark" ? "#1a1a24" : "#e1e3ea",
        "--tb-surface": theme === "dark" ? "#242432" : "#e3e8f2",
        "--tb-surface-2": theme === "dark" ? "#2d2d3d" : "#c5cfe0",
        "--tb-surface-soft": theme === "dark" ? "#20202d" : "#d5ddeb",
        "--tb-border": theme === "dark" ? "#454759" : "#818ea7",
        "--tb-text": theme === "dark" ? "#f5f6fa" : "#0f1521",
        "--tb-text-muted": theme === "dark" ? "#bcc1cf" : "#3f4b62",
        "--tb-accent": "#e30613",
        "--tb-accent-hover": theme === "dark" ? "#ff2f3b" : "#c90511",
        "--tb-accent-glow":
          theme === "dark" ? "rgba(227,6,19,0.22)" : "rgba(227,6,19,0.24)",
        "--tb-gold": theme === "dark" ? "#dfb657" : "#9d6d11",
      }) as CSSProperties,
    [theme],
  );

  return (
    <div
      style={vars}
      className="bg-[var(--tb-bg)] text-[var(--tb-text)] [background-image:radial-gradient(circle_at_18%_-10%,rgba(227,6,19,0.13),transparent_36%),radial-gradient(circle_at_100%_0%,rgba(223,182,87,0.1),transparent_30%)]"
    >
      <SiteHeader content={siteContent} currentPageLabel="Tech Bootcamp" />
      <div className="sticky top-16 z-40 border-b border-[var(--tb-border)] bg-[color:color-mix(in_oklab,var(--tb-bg)_80%,transparent)] backdrop-blur-xl">
        <Container className="flex h-12 items-center gap-2 overflow-x-auto">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--tb-text-muted)] transition hover:bg-[var(--tb-surface)] hover:text-[var(--tb-text)]"
            >
              {item.label}
            </a>
          ))}
        </Container>
      </div>

      <main className="relative overflow-hidden">
        <section className="relative min-h-[min(58vh,620px)] border-b border-[var(--divider)] bg-[var(--tb-surface-soft)] py-14 sm:py-20">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:hidden"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block"
            aria-hidden
          >
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-[rgba(12,12,18,0.44)]" />
          <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_15%_10%,rgba(227,6,19,0.22),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(223,182,87,0.16),transparent_34%)]" />
          <Container className="relative">
            <span className="inline-flex rounded-full border border-[var(--tb-border)] bg-[var(--tb-surface)] px-3 py-1 text-xs text-[var(--tb-text-muted)]">
              {content.hero.badge}
            </span>
            <h1
              data-reveal
              className="mt-6 whitespace-pre-line text-balance text-4xl font-semibold leading-[1.02] tracking-tight opacity-0 translate-y-6 transition duration-700 sm:text-6xl"
            >
              {content.hero.title}
            </h1>
            <p
              data-reveal
              className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--tb-text-muted)] opacity-0 translate-y-6 transition duration-700"
            >
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--tb-accent)] bg-[var(--tb-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--tb-accent-hover)]"
              >
                Подать заявку
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#program"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--tb-border)] bg-[var(--tb-surface)] px-5 py-3 text-sm font-semibold text-[var(--tb-text)] transition hover:border-[var(--tb-accent)]"
              >
                Скачать программу
              </a>
            </div>
            <div className="mt-10 grid gap-3 rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-4 sm:grid-cols-3 sm:gap-0">
              {content.hero.metrics.map((item, idx) => (
                <div
                  key={item.label}
                  className={`${idx !== 0 ? "sm:border-l sm:border-[var(--tb-border)]" : ""}`}
                >
                  <Metric {...item} />
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section data-reveal className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface)] py-6">
          <Container>
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--tb-text-muted)]">
              Среди участников программы
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {content.socialProof.map((company) => (
                <div
                  key={company}
                  className="rounded-lg border border-[var(--tb-border)] px-3 py-2 text-center text-xs text-[var(--tb-text-muted)] opacity-65 transition hover:opacity-100"
                >
                  {company}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section id="audience" data-reveal className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface-soft)] py-14">
          <Container>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Программа создана для тех, кто уже на высоком уровне
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {content.audienceCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-[var(--tb-border)] bg-[color:color-mix(in_oklab,var(--tb-surface)_82%,transparent)] p-6 backdrop-blur-lg transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/60 hover:shadow-[0_0_34px_var(--tb-accent-glow)]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--tb-border)] bg-[var(--tb-surface-2)] text-sm font-semibold text-[var(--tb-accent)]">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--tb-text-muted)]">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-5 inline-flex rounded-full border border-[var(--tb-border)] px-4 py-2 text-xs text-[var(--tb-text-muted)]">
              Не подходит для начинающих и middle-специалистов
            </p>
          </Container>
        </section>

        <section data-reveal className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface)] py-14">
          <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Технологический лидер сегодня — это не только экспертиза
              </h2>
              <ul className="mt-6 space-y-3">
                {content.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3 text-sm text-[var(--tb-text-muted)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--tb-accent)]" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface-2)] p-6 lg:border-l-4 lg:border-l-[var(--tb-accent)]">
              <p className="text-sm leading-relaxed text-[var(--tb-text-muted)]">
                CTO сегодня должен соединять технологию, продукт, финансы, культуру и развитие
                людей. Программа выстраивает системное мышление и инструменты для этой роли.
              </p>
            </div>
          </Container>
        </section>

        <section id="program" data-reveal className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface-soft)] py-14">
          <Container>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Как устроен Bootcamp</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {content.formatFacts.map((fact) => (
                <article key={fact.value} className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_28px_var(--tb-accent-glow)]">
                  <p className="text-2xl font-semibold text-[var(--tb-gold)]">{fact.value}</p>
                  <p className="mt-2 text-sm text-[var(--tb-text-muted)]">{fact.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-6">
              <h3 className="text-lg font-semibold">Типичный день</h3>
              <ol className="mt-4 space-y-3 border-l border-[var(--tb-accent)] pl-4">
                {content.timeline.map((point, idx) => (
                  <li
                    key={point}
                    className={`text-sm ${
                      idx % 2 === 0 ? "text-[var(--tb-text-muted)]" : "text-[var(--tb-text)]"
                    }`}
                  >
                    {point}
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section data-reveal className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface)] py-14">
          <Container className="grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
            <article className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface-2)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]">
              <h3 className="text-xl font-semibold text-[var(--tb-accent)]">Неделя 1</h3>
              <div className="mt-4 space-y-2">
                {content.weekOneModules.map((module, idx) => (
                  <button
                    key={module}
                    type="button"
                    onClick={() => setOpenWeekOne((p) => (p === idx ? -1 : idx))}
                    className="w-full rounded-xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-3 text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm">{module}</span>
                      <ChevronDown className={`h-4 w-4 transition ${openWeekOne === idx ? "rotate-180" : ""}`} />
                    </div>
                    {openWeekOne === idx ? (
                      <p className="mt-2 text-xs text-[var(--tb-text-muted)]">
                        PLACEHOLDER: краткое описание модуля и ожидаемый практический результат.
                      </p>
                    ) : null}
                  </button>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface-2)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]">
              <h3 className="text-xl font-semibold text-[var(--tb-gold)]">Неделя 2</h3>
              <div className="mt-4 space-y-2">
                {content.weekTwoModules.map((module, idx) => (
                  <button
                    key={module}
                    type="button"
                    onClick={() => setOpenWeekTwo((p) => (p === idx ? -1 : idx))}
                    className="w-full rounded-xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-3 text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm">{module}</span>
                      <ChevronDown className={`h-4 w-4 transition ${openWeekTwo === idx ? "rotate-180" : ""}`} />
                    </div>
                    {openWeekTwo === idx ? (
                      <p className="mt-2 text-xs text-[var(--tb-text-muted)]">
                        PLACEHOLDER: краткое описание модуля и ожидаемый практический результат.
                      </p>
                    ) : null}
                  </button>
                ))}
              </div>
            </article>
            <aside className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface-2)] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]">
              <p className="text-xl leading-snug">
                «Большинство CTO отличные инженеры. Единицы — стратегические лидеры.»
              </p>
              <p className="mt-4 text-xs text-[var(--tb-text-muted)]">
                PLACEHOLDER: заменить на реальную цитату участника или эксперта.
              </p>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="mt-6 inline-flex rounded-full border border-[var(--tb-accent)] bg-[var(--tb-accent)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--tb-accent-hover)]"
              >
                Скачать полную программу (PDF)
              </button>
            </aside>
          </Container>
        </section>

        <section
          id="results"
          ref={resultsRef}
          data-reveal
          className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface-soft)] py-14"
        >
          <Container>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Измеримый результат, подтверждённый участниками
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]">
                <p className="text-3xl font-semibold text-[var(--tb-gold)]">{metricOne.toFixed(1)}%</p>
                <p className="mt-1 text-sm text-[var(--tb-text-muted)]">NPS программы</p>
              </article>
              <article className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]">
                <p className="text-3xl font-semibold text-[var(--tb-gold)]">+{Math.round(metricTwo)}%</p>
                <p className="mt-1 text-sm text-[var(--tb-text-muted)]">Рост компетенций</p>
              </article>
              <article className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]">
                <p className="text-3xl font-semibold text-[var(--tb-gold)]">{metricThree.toFixed(1)} / 10</p>
                <p className="mt-1 text-sm text-[var(--tb-text-muted)]">Средняя оценка программы</p>
              </article>
            </div>
            <div className="mt-8 rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-6 transition duration-300 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]">
              <h3 className="text-lg font-semibold">Компетенции до / после</h3>
              <div className="mt-4 space-y-3">
                {content.competencies.map((item) => (
                  <div key={item.name}>
                    <div className="mb-1 flex items-center justify-between text-xs text-[var(--tb-text-muted)]">
                      <span>{item.name}</span>
                      <span>дельта +{item.after - item.before}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--tb-surface-2)]">
                      <div className="relative h-2 w-full">
                        <div
                          className="absolute left-0 top-0 h-2 rounded-full bg-[color:color-mix(in_oklab,var(--tb-text-muted)_55%,transparent)] transition-all duration-1000"
                          style={{ width: `${item.before}%` }}
                        />
                        <div
                          className="absolute top-0 h-2 rounded-full bg-[var(--tb-accent)] transition-all duration-1000"
                          style={{
                            left: `${item.before}%`,
                            width: resultsInView ? `${item.after - item.before}%` : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {content.quotes.map((quote) => (
                <blockquote
                  key={quote.text}
                  className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]"
                >
                  <p className="text-sm leading-relaxed text-[var(--tb-text-muted)]">{quote.text}</p>
                  <footer className="mt-3 text-xs text-[var(--tb-text)]">{quote.author}</footer>
                </blockquote>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="alumni-cases"
          data-reveal
          className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface)] py-14"
        >
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Кейсы выпускников Tech Bootcamp
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-[var(--tb-text-muted)]">
                  Реальные истории лидеров: продуктовые запуски, управление командами и
                  внедрение AI-инструментов в рабочие процессы.
                </p>
              </div>
              <Link
                href="/tech-bootcamp/cases"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--tb-border)] bg-[var(--tb-surface-2)] px-4 py-2 text-sm font-medium text-[var(--tb-text)] transition hover:border-[var(--tb-accent)]/55 hover:text-white"
              >
                Смотреть все кейсы
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {techBootcampCases.map((item) => (
                <article
                  key={item.slug}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--tb-border)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--tb-surface-2)_90%,transparent),color-mix(in_oklab,var(--tb-surface)_92%,transparent))] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--tb-accent)]/60 hover:shadow-[0_20px_50px_-24px_var(--tb-accent-glow)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--tb-accent)]/10 blur-3xl transition duration-300 group-hover:bg-[var(--tb-accent)]/16"
                  />
                  <div className="relative">
                    <span className="inline-flex rounded-full border border-[var(--tb-border)] bg-[var(--tb-surface)] px-2.5 py-1 text-[11px] text-[var(--tb-text-muted)]">
                      {item.coverTag}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold leading-tight">{item.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--tb-text-muted)]">
                      {item.subtitle}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-[var(--tb-text-muted)]">
                      <span className="rounded-full border border-[var(--tb-border)] bg-[var(--tb-surface)] px-2.5 py-1">
                        {item.author}
                      </span>
                      <span className="rounded-full border border-[var(--tb-border)] bg-[var(--tb-surface)] px-2.5 py-1">
                        {item.company}
                      </span>
                    </div>
                    <Link
                      href={`/tech-bootcamp/cases/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--tb-accent)] transition group-hover:text-[var(--tb-accent-hover)]"
                    >
                      Читать кейс
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section data-reveal className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface)] py-14">
          <Container>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Практики, а не теоретики</h2>
            <p className="mt-3 text-sm text-[var(--tb-text-muted)]">
              До 35 экспертов и спикеров. Внутренние эксперты МТС/MWS и приглашённые гости.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.speakers.map((speaker) => (
                <article
                  key={speaker}
                  className="rounded-2xl border border-[var(--tb-border)] bg-[var(--tb-surface-2)] p-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--tb-accent)]/55 hover:shadow-[0_0_30px_var(--tb-accent-glow)]"
                >
                  <div className="h-12 w-12 rounded-full border border-[var(--tb-border)] bg-[var(--tb-surface)]" />
                  <p className="mt-3 text-sm text-[var(--tb-text-muted)]">{speaker}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="pricing" data-reveal className="opacity-0 translate-y-6 transition duration-700 border-y border-[var(--divider)] bg-[var(--tb-surface-soft)] py-14">
          <Container>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Инвестиция в команду технологических лидеров
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {content.pricing.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--tb-accent)]/65 hover:shadow-[0_0_34px_var(--tb-accent-glow)] ${
                    "featured" in plan && plan.featured
                      ? "border-[var(--tb-accent)] bg-[var(--tb-surface)] shadow-[0_0_22px_var(--tb-accent-glow)]"
                      : "border-[var(--tb-border)] bg-[var(--tb-surface)]"
                  }`}
                >
                  {"featured" in plan && plan.featured ? (
                    <span className="mb-3 inline-flex rounded-full bg-[var(--tb-accent)] px-3 py-1 text-xs font-semibold text-white">
                      Популярный
                    </span>
                  ) : null}
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-3xl font-semibold text-[var(--tb-gold)]">{plan.price}</p>
                  <ul className="mt-4 space-y-2">
                    {plan.items.map((item) => (
                      <li key={item} className="text-sm text-[var(--tb-text-muted)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="mt-6 w-full rounded-full border border-[var(--tb-accent)] bg-[var(--tb-accent)] py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--tb-accent-hover)]"
                  >
                    Оставить заявку
                  </button>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-[var(--tb-text-muted)]">
              Хотите обсудить индивидуальный формат?{" "}
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="font-semibold text-[var(--tb-accent)]"
              >
                Обсудить условия
              </button>
            </p>
          </Container>
        </section>

        <section data-reveal className="opacity-0 translate-y-6 transition duration-700 border-t border-[var(--divider)] bg-[var(--tb-surface)] py-16">
          <Container className="rounded-3xl border border-[var(--tb-border)] bg-[var(--tb-surface-2)] p-8 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Готовы прокачать команду технологических лидеров?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--tb-text-muted)]">
              23 места в потоке. Свяжитесь с нами, чтобы узнать детали и условия участия.
            </p>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="mt-8 inline-flex rounded-full border border-[var(--tb-accent)] bg-[var(--tb-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_22px_var(--tb-accent-glow)] transition hover:bg-[var(--tb-accent-hover)]"
            >
              Оставить заявку
            </button>
            <p className="mt-4 text-sm text-[var(--tb-text-muted)]">
              или напишите напрямую:{" "}
              <a href="mailto:avsavche10@mts.ru" className="text-[var(--tb-accent)]">
                avsavche10@mts.ru
              </a>
            </p>
          </Container>
        </section>

        <footer className="border-t border-[var(--divider)] bg-[var(--tb-surface-soft)] py-8">
          <Container className="flex flex-col gap-4 text-sm text-[var(--tb-text-muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 Tech Bootcamp</p>
            <div className="flex flex-wrap gap-3">
              {content.nav.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-[var(--tb-text)]">
                  {item.label}
                </a>
              ))}
              <span>Контакты</span>
            </div>
          </Container>
        </footer>
      </main>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
