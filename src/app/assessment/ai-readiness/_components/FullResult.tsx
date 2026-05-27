import { useMemo } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { AINotice } from "@/components/assessment/AINotice";
import { Container } from "@/components/ui/Container";
import { BLOCKER_CONTENT, DOMAIN_VERDICTS, PROFILES, ROADMAP_CONTENT } from "../_lib/content";
import { DOMAINS, getProfileAnswerLabel, PROFILE_QUESTIONS, QUESTIONS } from "../_lib/schema";
import { Heatmap } from "./Heatmap";
import { ProgressBar } from "./ProgressBar";
import { ScoreCircle } from "./ScoreCircle";
import {
  assessmentCard,
  assessmentChip,
  assessmentDangerPanel,
  assessmentElevated,
  assessmentEyebrow,
  assessmentPrimaryButton,
  assessmentSecondaryButton,
  assessmentSoftCard,
  assessmentSuccessPanel,
  assessmentWarningPanel,
} from "./styles";
import type { DomainKey, ProfileAnswers, ScoreResult } from "../_lib/types";

export function FullResult({
  result,
  profileAnswers,
  onReset,
}: {
  result: ScoreResult;
  profileAnswers: ProfileAnswers;
  onReset: () => void;
}) {
  const profile = PROFILES[result.profile];
  const roleLabel = getProfileAnswerLabel("role", profileAnswers.role);
  const companySizeLabel = getProfileAnswerLabel("companySize", profileAnswers.companySize);
  const totalSteps = PROFILE_QUESTIONS.length + QUESTIONS.length;
  const dynamicQuickWins = result.topBlockers
    .filter((d): d is Exclude<typeof d, "experience"> => d !== "experience")
    .slice(0, 3)
    .map((d) => ({
      domain: BLOCKER_CONTENT[d]?.title.replace("Узкое место: ", "") ?? d,
      action: BLOCKER_CONTENT[d]?.firstStep ?? "",
    }))
    .filter((w) => w.action);
  const dynamicRoadmap = useMemo(() => {
    const blockers = result.topBlockers
      .filter((d): d is Exclude<typeof d, "experience"> => d !== "experience")
      .slice(0, 2);
    const b0 = blockers[0] ? BLOCKER_CONTENT[blockers[0]] : null;
    const b1 = blockers[1] ? BLOCKER_CONTENT[blockers[1]] : null;
    const fallback = ROADMAP_CONTENT[result.profile] ?? [];
    return [
      b0
        ? `${b0.title.replace("Узкое место: ", "")}: ${b0.firstStep}`
        : fallback[0] ?? "",
      b1
        ? `${b1.title.replace("Узкое место: ", "")}: ${b1.firstStep}`
        : fallback[1] ?? "",
      fallback[2] ?? "Внедрите первые результаты в регулярный операционный контур.",
    ];
  }, [result]);
  const dynamicStrengths = useMemo(() => {
    return DOMAINS
      .filter((d) => d.key !== "experience")
      .flatMap((d) => {
        const key = d.key as Exclude<typeof d.key, "experience">;
        const score = result.domainScores[key];
        if (score?.level !== "high") return [];
        const verdict = DOMAIN_VERDICTS[key]?.high;
        return verdict ? [`${d.label}: ${verdict}`] : [];
      });
  }, [result.domainScores]);

  return (
    <main className="py-8 sm:py-10">
      <Container className="max-w-6xl space-y-12">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
          <Link
            href="/"
            className={assessmentChip}
          >
            ← TraaS
          </Link>
          <span>Оценка готовности к ИИ-трансформации</span>
        </div>
        <ProgressBar current={totalSteps} total={totalSteps} />
      </div>

      <section className={`${assessmentCard} p-6 sm:p-8 lg:p-10`}>
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: `color-mix(in oklab, ${profile.color} 22%, transparent)` }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-4">
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
              style={{
                background: profile.bgTint,
                border: `1px solid ${profile.border}`,
                color: profile.color,
              }}
            >
              {profile.subtitle}
            </span>
            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl">
              {profile.title}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">{profile.description}</p>

            {(roleLabel || companySizeLabel) ? (
              <div className="flex flex-wrap gap-2">
                {roleLabel ? (
                  <span className={assessmentChip}>Роль: {roleLabel}</span>
                ) : null}
                {companySizeLabel ? (
                  <span className={assessmentChip}>Размер: {companySizeLabel}</span>
                ) : null}
              </div>
            ) : null}

            <div
              className={`${assessmentElevated} border-l-2 p-5`}
              style={{ borderColor: profile.color }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: profile.color }}>
                Контекст рынка
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{profile.marketContext}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className={`${assessmentDangerPanel} p-5`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--error)]">
                  В чём риск
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--foreground)_86%,var(--error)_14%)]">
                  {profile.riskAndOpportunity.risk}
                </p>
              </div>
              <div className={`${assessmentSuccessPanel} p-5`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--success)]">
                  В чём возможность
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:color-mix(in_oklab,var(--foreground)_86%,var(--success)_14%)]">
                  {profile.riskAndOpportunity.opportunity}
                </p>
              </div>
            </div>

            <div>
              <p className={assessmentEyebrow}>
                Главное «не делать»
              </p>
              <ul className="mt-3 space-y-2">
                {profile.warnings.map((warning) => (
                  <li key={warning} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                    <span className="text-[#ff6e79]">×</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center lg:min-w-40">
            <ScoreCircle score={result.finalScore} color={profile.color} size={140} />
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex justify-between gap-2 text-xs text-[var(--muted)]">
            <span>Начальный</span>
            <span>Эксперименты</span>
            <span>Зрелый старт</span>
            <span>Лидер</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[color:color-mix(in_oklab,var(--surface-2)_76%,transparent)]">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${result.finalScore}%`, background: profile.color }}
            />
          </div>
        </div>
      </section>

      <AINotice topic="готовности к ИИ-трансформации" />

      <Heatmap domainScores={result.domainScores} />

      <section className={`${assessmentDangerPanel} p-5 sm:p-6`}>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--error)]">
          Top-3 блокера
        </p>
        <div className="mt-5 space-y-3">
          {result.topBlockers.map((domain) => {
            const content = getBlockerContent(domain);
            if (!content) return null;
            return (
              <article key={domain} className={`${assessmentElevated} p-4`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{content.title}</h3>
                  <span className="rounded-full bg-[#e30613]/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ffc6ca]">Высокая</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{content.whatHappens}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#ffc6ca]">{content.consequences}</p>
              </article>
            );
          })}
        </div>
      </section>

      <StrengthsOrStart strengths={dynamicStrengths} />

      <section className={`${assessmentWarningPanel} p-5 sm:p-6`}>
        <p className={assessmentEyebrow}>Quick wins на 30 дней</p>
        <div className="mt-5 space-y-3">
          {dynamicQuickWins.map(({ domain, action }, index) => (
            <div key={domain} className={`${assessmentElevated} p-4`}>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d38f1f] text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#d38f1f]">
                    {domain}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/85">
                    {action}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${assessmentCard} p-6 sm:p-8`}>
        <p className={assessmentEyebrow}>Roadmap · 90 дней</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {dynamicRoadmap.map((item, index) => (
            <div key={item} className={`${assessmentSoftCard} p-4`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold" style={{ color: profile.color }}>0{index + 1}</span>
                <span className="rounded-full border border-[var(--divider)] px-2 py-0.5 text-[10px] text-[var(--muted)]">
                  {index === 0 ? "30 дней" : index === 1 ? "60 дней" : "90 дней"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/85">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${assessmentCard} p-6 sm:p-8`}>
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_50%_0%,rgba(227,6,19,0.16),transparent_34%)]" />
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{profile.ctaTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{profile.ctaDescription}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/#contact" className={`${assessmentPrimaryButton} text-sm`}>
              {profile.ctaButtonText}
            </Link>
            <button type="button" onClick={onReset} className={`${assessmentSecondaryButton} text-sm`}>
              <RotateCcw className="h-4 w-4" /> Пройти заново
            </button>
          </div>
        </div>
      </section>
      </Container>
    </main>
  );
}
function getBlockerContent(domain: DomainKey) {
  if (domain === "experience") return null;
  return BLOCKER_CONTENT[domain];
}
function StrengthsOrStart({ strengths }: { strengths: string[] }) {
  if (strengths.length > 0) {
    return (
      <section className={`${assessmentSuccessPanel} p-5 sm:p-6`}>
        <p className={assessmentEyebrow}>Что у вас работает</p>
        <div className="mt-5 space-y-3">
          {strengths.map((item, index) => (
            <div key={item} className={`${assessmentElevated} flex gap-3 p-4`}>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                style={{ background: "#2ea36b" }}
              >
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-[var(--foreground)]/85">{item}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`${assessmentSoftCard} border-l-2 border-l-[var(--muted)] p-5 sm:p-6`}>
      <p className={assessmentEyebrow}>С чего начать</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        По результатам диагностики ни одно ИИ-направление не достигло уровня сильной стороны. Это нормальная
        стартовая позиция для большинства компаний. Главное — у вас теперь есть конкретная картина узких мест.
        Приоритеты для первых шагов — в Quick wins ниже.
      </p>
    </section>
  );
}
