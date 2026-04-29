import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FULL_DIAGNOSTIC_ARTIFACTS, PROFILES, RELATED_CASES } from "../_lib/content";
import { getProfileAnswerLabel, PROFILE_QUESTIONS, QUESTIONS } from "../_lib/schema";
import { BenchmarkSection } from "./BenchmarkSection";
import { BlockerCard } from "./BlockerCard";
import { EmailGate } from "./EmailGate";
import { Heatmap } from "./Heatmap";
import { PitfallsSection } from "./PitfallsSection";
import { ProgressBar } from "./ProgressBar";
import { RoadmapSection } from "./RoadmapSection";
import { ScoreCircle } from "./ScoreCircle";
import { TeamQuestions } from "./TeamQuestions";
import {
  assessmentCard,
  assessmentChip,
  assessmentDangerPanel,
  assessmentElevated,
  assessmentEyebrow,
  assessmentPrimaryButton,
  assessmentSecondaryButton,
  assessmentSectionTitle,
  assessmentSoftCard,
  assessmentSuccessPanel,
} from "./styles";
import type { Answers, ProfileAnswers, ScoreResult } from "../_lib/types";

export function FullResult({
  result,
  profileAnswers,
  answers,
}: {
  result: ScoreResult;
  profileAnswers: ProfileAnswers;
  answers: Answers;
}) {
  const profile = PROFILES[result.profile];
  const relatedCase = RELATED_CASES[result.profile];
  const roleLabel = getProfileAnswerLabel("role", profileAnswers.role);
  const companySizeLabel = getProfileAnswerLabel("companySize", profileAnswers.companySize);
  const totalSteps = PROFILE_QUESTIONS.length + QUESTIONS.length;

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

      <section className={`${assessmentSoftCard} border-l-2 border-l-[var(--primary)] p-5`}>
        <p className={assessmentEyebrow}>
          Важно о результате
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Этот отчёт подготовлен AI на основе ваших ответов и не является экспертным заключением TraaS.
          Он помогает быстро увидеть вероятные зоны риска, но не заменяет полноценную диагностику с интервью,
          анализом артефактов и проверкой данных. Если хотите более глубокий и конкретный разбор вашей
          ситуации — приходите к нам, команда TraaS поможет собрать практичный план действий.
        </p>
      </section>

      <Heatmap domainScores={result.domainScores} />

      <section aria-labelledby="blockers-title" className="space-y-4">
        <h2 id="blockers-title" className={assessmentSectionTitle}>
          Узкие места
        </h2>
        <div className="grid gap-4">
          {result.topBlockers.map((domain) => (
            <BlockerCard key={domain} domain={domain} />
          ))}
        </div>
      </section>

      <BenchmarkSection profile={result.profile} />

      <PitfallsSection profile={result.profile} />

      <TeamQuestions profile={result.profile} />

      <RoadmapSection profile={result.profile} />

      <section className={`${assessmentCard} p-6 text-center sm:p-8 lg:p-12`}>
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_50%_0%,rgba(227,6,19,0.16),transparent_34%)]" />
        <div className="relative">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--primary)_16%,transparent)] text-[#ff6e79]">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--foreground)]">{profile.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-[var(--muted)]">
          {profile.ctaDescription}
        </p>
        <Link
          href="/#contact"
          className={`${assessmentPrimaryButton} mt-6`}
        >
          {profile.ctaButtonText}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        </div>
      </section>

      <EmailGate result={result} profileAnswers={profileAnswers} answers={answers} />

      <section className={`${assessmentCard} p-6 sm:p-8`}>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Что даёт полная диагностика TraaS
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FULL_DIAGNOSTIC_ARTIFACTS.map((item) => (
            <div key={item} className={`${assessmentSoftCard} p-4`}>
              <p className="font-semibold leading-relaxed text-[var(--foreground)]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${assessmentCard} p-6 sm:p-8`}>
        <p className={assessmentEyebrow}>
          Релевантный кейс
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{relatedCase.title}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-[var(--muted)]">{relatedCase.description}</p>
        <Link
          href={`/cases/${relatedCase.slug}`}
          className={`${assessmentSecondaryButton} mt-5 min-h-11`}
        >
          Читать кейс <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <footer className={`${assessmentCard} p-6 text-center sm:p-8`}>
        <p className="text-lg font-semibold text-[var(--foreground)]">
          Хотите обсудить результат с командой TraaS?
        </p>
        <Link
          href="/#contact"
          className={`${assessmentPrimaryButton} mt-4`}
        >
          Забронировать 30-минутный созвон <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </footer>
      </Container>
    </main>
  );
}
