"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { AINotice } from "@/components/assessment/AINotice";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { AssessmentQuestion } from "@/components/assessment/AssessmentQuestion";
import { ContactModal } from "@/components/contact/ContactModal";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import {
  assessmentBackground,
  assessmentCard,
  assessmentChip,
  assessmentDangerPanel,
  assessmentElevated,
  assessmentEyebrow,
  assessmentMutedText,
  assessmentPrimaryButton,
  assessmentSecondaryButton,
  assessmentShell,
  assessmentSoftCard,
  assessmentSuccessPanel,
  assessmentWarningPanel,
} from "@/app/assessment/ai-readiness/_components/styles";
import {
  buildItHeatmapDomains,
  buildItRiskFlags,
  getProfileLabel,
  getReadinessLevel,
  itLandscapeQuestions,
  profileQuestions,
  type ItHeatmapDomain,
  type ItRiskFlag,
  type ReadinessLevel,
} from "@/data/assessmentItLandscape";
import { siteContent } from "@/data/siteContent";

const STORAGE_KEY = "traas-it-landscape-v2";
const LOADING_DELAY_MS = 1700;
const AUTO_ADVANCE_DELAY_MS = 300;
const totalSteps = profileQuestions.length + itLandscapeQuestions.length;

type Screen = "intro" | "step" | "loading" | "result";

type StoredState = {
  screen: Screen;
  step: number;
  profileAnswers: Record<string, string>;
  answerValues: string[];
};

function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const win = window as Window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer ?? [];
  win.dataLayer.push({ event: name, ...params });
}
function currentQuestionForStep(step: number) {
  if (step < profileQuestions.length) return profileQuestions[step];
  return itLandscapeQuestions[step - profileQuestions.length];
}
function formatItScore(score: number): string {
  return score.toFixed(1);
}
export default function ItLandscapeAssessmentPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [step, setStep] = useState(0);
  const [profileAnswers, setProfileAnswers] = useState<Record<string, string>>({});
  const [answerValues, setAnswerValues] = useState<string[]>([]);
  const [contactOpen, setContactOpen] = useState(false);
  const analyticsSent = useRef(false);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = currentQuestionForStep(step);
  const isProfileStep = step < profileQuestions.length;
  const scoredStepIndex = step - profileQuestions.length;
  const selectedValue = currentQuestion
    ? isProfileStep
      ? profileAnswers[currentQuestion.id]
      : answerValues[scoredStepIndex]
    : undefined;

  const scoresByQuestion = useMemo(
    () =>
      itLandscapeQuestions.map((q, idx) => {
        const selected = answerValues[idx];
        const score = q.options.find((o) => o.value === selected)?.score;
        return score ?? 1;
      }),
    [answerValues],
  );

  const totalScore = scoresByQuestion.reduce((sum, score) => sum + score, 0);
  const maxScore = itLandscapeQuestions.length * 4;
  const normalizedScore = totalScore / itLandscapeQuestions.length;
  const level = getReadinessLevel(totalScore);
  const heatmapDomains = useMemo(() => buildItHeatmapDomains(scoresByQuestion), [scoresByQuestion]);
  const riskFlags = useMemo(() => buildItRiskFlags(scoresByQuestion), [scoresByQuestion]);
  const dynamicQuickWins = useMemo(() => {
    const weakest = [...heatmapDomains]
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
    return weakest.map((d) => ({
      action: d.insight.action,
      domain: d.title,
    }));
  }, [heatmapDomains]);
  const dynamicStrengths = useMemo(() => {
    return [...heatmapDomains]
      .filter((d) => d.score >= 3)
      .sort((a, b) => b.score - a.score)
      .map((d) => `${d.title}: ${d.insight.title.toLowerCase()}`);
  }, [heatmapDomains]);
  const dynamicRoadmap = useMemo(() => {
    const sorted = [...heatmapDomains].sort((a, b) => a.score - b.score);
    const w0 = sorted[0];
    const w1 = sorted[1];
    return [
      w0
        ? `Приоритет: "${w0.title}" — ${w0.insight.action}`
        : level.nextActions[0],
      w1
        ? `Следующий шаг: "${w1.title}" — ${w1.insight.action}`
        : level.nextActions[1],
      level.nextActions[2] ?? "Внедрите первые улучшения в регулярный операционный контур с метриками и ревью.",
    ];
  }, [heatmapDomains, level.nextActions]);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<StoredState>;
      if (parsed.screen) setScreen(parsed.screen === "loading" ? "step" : parsed.screen);
      if (Number.isFinite(parsed.step)) setStep(Math.min(Math.max(parsed.step ?? 0, 0), totalSteps - 1));
      if (parsed.profileAnswers) setProfileAnswers(parsed.profileAnswers);
      if (parsed.answerValues) setAnswerValues(parsed.answerValues);
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (screen === "loading") return;
    const payload: StoredState = { screen, step, profileAnswers, answerValues };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [answerValues, profileAnswers, screen, step]);

  useEffect(() => {
    if (screen !== "step" || !currentQuestion) return;
    trackEvent("itl_step_view", {
      step_index: step + 1,
      question_id: currentQuestion.id,
      domain: "dimension" in currentQuestion ? currentQuestion.dimension : null,
    });
  }, [currentQuestion, screen, step]);

  useEffect(() => {
    if (screen !== "result" || analyticsSent.current) return;
    analyticsSent.current = true;
    trackEvent("itl_complete", {
      total_score: totalScore,
      max_score: maxScore,
      normalized_score: Number(formatItScore(normalizedScore)),
      profile: level.id,
    });
    void saveAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  useEffect(() => () => {
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    clearAutoAdvance();
  }, []);

  function clearAutoAdvance() {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
  }

  function start() {
    setScreen("step");
    setStep(0);
    trackEvent("itl_start", { source: "it_landscape_page" });
  }

  function selectAnswer(value: string) {
    if (!currentQuestion) return;
    if (isProfileStep) {
      setProfileAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    } else {
      setAnswerValues((prev) => {
        const next = [...prev];
        next[scoredStepIndex] = value;
        return next;
      });
    }

    const selected = currentQuestion.options.find((option) => option.value === value);
    trackEvent("itl_answer", {
      question_id: currentQuestion.id,
      answer_id: selected?.id ?? value,
      score: selected?.score ?? null,
      domain: "dimension" in currentQuestion ? currentQuestion.dimension : null,
    });

    clearAutoAdvance();
    autoAdvanceTimer.current = setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep((prev) => prev + 1);
      } else {
        setScreen("loading");
        loadingTimer.current = setTimeout(() => setScreen("result"), LOADING_DELAY_MS);
      }
      autoAdvanceTimer.current = null;
    }, AUTO_ADVANCE_DELAY_MS);
  }

  function back() {
    clearAutoAdvance();
    if (screen === "result") {
      setScreen("step");
      setStep(totalSteps - 1);
      analyticsSent.current = false;
      return;
    }
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function reset() {
    clearAutoAdvance();
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setScreen("intro");
    setStep(0);
    setProfileAnswers({});
    setAnswerValues([]);
    analyticsSent.current = false;
    window.sessionStorage.removeItem(STORAGE_KEY);
  }

  async function saveAnalytics() {
    try {
      await fetch("/api/assessment/it-landscape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: profileAnswers.role,
          companySize: profileAnswers.companySize,
          primaryChallenge: profileAnswers.primaryChallenge,
          scores: scoresByQuestion,
        }),
      });
    } catch {
      // Analytics must never block the diagnostic UX.
    }
  }

  return (
    <div className={assessmentShell}>
      <div className={assessmentBackground} aria-hidden />
      <SiteHeader content={siteContent} currentPageLabel="Состояние ИТ-ландшафта" />

      <main className="relative z-10">
        {screen === "intro" ? <IntroScreen onStart={start} /> : null}
        {screen === "step" && currentQuestion ? (
          <QuestionFlow
            step={step}
            question={currentQuestion}
            selectedValue={selectedValue}
            onSelect={selectAnswer}
            onBack={back}
          />
        ) : null}
        {screen === "loading" ? <LoadingScreen /> : null}
        {screen === "result" ? (
          <ResultScreen
            level={level}
            totalScore={totalScore}
            maxScore={maxScore}
            normalizedScore={normalizedScore}
            profileAnswers={profileAnswers}
            heatmapDomains={heatmapDomains}
            riskFlags={riskFlags}
            quickWins={dynamicQuickWins}
            strengths={dynamicStrengths}
            roadmap={dynamicRoadmap}
            onBack={back}
            onReset={reset}
            onCta={() => setContactOpen(true)}
          />
        ) : null}
      </main>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <Container className="py-8 sm:py-10 lg:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${assessmentCard} p-6 sm:p-8 lg:p-10`}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color:color-mix(in_oklab,var(--primary)_18%,transparent)] blur-3xl" />
          <div className="relative">
            <p className={assessmentEyebrow}>TraaS · Диагностика</p>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Состояние ИТ-ландшафта
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              6–8 минут · 9 вопросов · персональный отчёт с профилем зрелости, разбором по 6 доменам, Top-3 зонами риска и планом действий на 30/90 дней.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["Профиль", "Оцените текущий уровень по шкале Initial → Advanced"],
                ["Heatmap", "Увидите состояние по 6 ключевым доменам ИТ-ландшафта"],
                ["План", "Получите quick wins и roadmap на 30/90 дней"],
              ].map(([title, text]) => (
                <div key={title} className={`${assessmentSoftCard} p-4`}>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={onStart} className={`${assessmentPrimaryButton} px-6`}>
                Начать диагностику
              </button>
              <Link href="/" className={assessmentSecondaryButton}>
                <Home className="h-4 w-4" /> На главную
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className={`${assessmentCard} p-5`}
        >
          <p className="text-sm font-semibold text-[var(--foreground)]">Что оцениваем</p>
          <p className={`mt-2 ${assessmentMutedText}`}>
            Выбирайте наблюдаемый факт о текущем ИТ-ландшафте. Так отчёт точнее покажет риски и приоритеты.
          </p>
          <div className="mt-5 space-y-3">
            {itLandscapeQuestions.slice(0, 4).map((item) => (
              <div key={item.id} className={`${assessmentElevated} flex items-center gap-3 px-3 py-2.5`}>
                <span className="text-sm text-[#ff8b94]">{item.dimensionIcon}</span>
                <span className="text-sm text-[var(--muted)]">{item.dimension}</span>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </Container>
  );
}

function QuestionFlow({
  step,
  question,
  selectedValue,
  onSelect,
  onBack,
}: {
  step: number;
  question: ReturnType<typeof currentQuestionForStep>;
  selectedValue?: string;
  onSelect: (value: string) => void;
  onBack: () => void;
}) {
  return (
    <Container className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link href="/" className={assessmentChip}>
            <Home className="h-4 w-4" /> На главную
          </Link>
          <span className={assessmentEyebrow}>
            {step < profileQuestions.length ? "Контекст" : "Экспертная оценка"}
          </span>
        </div>
        <AssessmentProgress current={step + 1} total={totalSteps} />
        <div className={`${assessmentCard} mt-6 p-4 sm:p-6`}>
          <AnimatePresence mode="wait">
            <AssessmentQuestion
              key={question.id}
              question={question}
              selectedValue={selectedValue}
              onSelect={onSelect}
            />
          </AnimatePresence>
          <div className="mt-6 flex flex-wrap items-center justify-start gap-3">
            <button
              type="button"
              onClick={onBack}
              disabled={step === 0}
              className={`${assessmentSecondaryButton} min-h-11 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

function LoadingScreen() {
  return (
    <Container className="flex min-h-[calc(100vh-96px)] items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${assessmentCard} max-w-xl p-8 text-center`}
      >
        <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-[var(--surface-2)]">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),#d38f1f,#2ea36b)]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Анализируем ваш ИТ-ландшафт</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Собираем оценку по 6 доменам, определяем зоны риска и формируем приоритеты на 30/90 дней.
        </p>
      </motion.div>
    </Container>
  );
}

function ResultScreen({
  level,
  totalScore,
  maxScore,
  normalizedScore,
  profileAnswers,
  heatmapDomains,
  riskFlags,
  quickWins,
  strengths,
  roadmap,
  onBack,
  onReset,
  onCta,
}: {
  level: ReadinessLevel;
  totalScore: number;
  maxScore: number;
  normalizedScore: number;
  profileAnswers: Record<string, string>;
  heatmapDomains: ItHeatmapDomain[];
  riskFlags: ItRiskFlag[];
  quickWins: { action: string; domain: string }[];
  strengths: string[];
  roadmap: string[];
  onBack: () => void;
  onReset: () => void;
  onCta: () => void;
}) {
  return (
    <Container className="max-w-6xl py-8 sm:py-10">
      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
            <Link href="/" className={assessmentChip}>← TraaS</Link>
            <span>Диагностика ИТ-ландшафта</span>
          </div>
          <AssessmentProgress current={totalSteps} total={totalSteps} />
        </div>

        <section className={`${assessmentCard} p-6 sm:p-8 lg:p-10`}>
          <div
            aria-hidden
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: `color-mix(in oklab, ${level.color} 26%, transparent)` }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_260px] lg:items-start">
            <div>
              <p className={assessmentEyebrow}>Ваш результат</p>
              <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl">
                {level.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--foreground)]/85">
                {level.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {profileAnswers.role ? <ProfilePill label={getProfileLabel("role", profileAnswers.role)} /> : null}
                {profileAnswers.companySize ? <ProfilePill label={getProfileLabel("companySize", profileAnswers.companySize)} /> : null}
                {profileAnswers.primaryChallenge ? <ProfilePill label={getProfileLabel("primaryChallenge", profileAnswers.primaryChallenge)} /> : null}
              </div>
            </div>
            <ScoreBadge score={normalizedScore} totalScore={totalScore} maxScore={maxScore} color={level.color} />
          </div>
        </section>

        <AINotice topic="состояния ИТ-ландшафта" />

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Heatmap domains={heatmapDomains} />
          <RiskFlags riskFlags={riskFlags} />
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <StrengthsOrStart strengths={strengths} />
          <QuickWinsPanel quickWins={quickWins} />
        </section>

        <section className={`${assessmentCard} p-6 sm:p-8`}>
          <p className={assessmentEyebrow}>Roadmap · 90 дней</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {roadmap.map((item, index) => (
              <div key={item} className={`${assessmentSoftCard} p-4`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold" style={{ color: level.color }}>0{index + 1}</span>
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
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">Получить полный разбор от команды TraaS</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{level.ctaText}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={onCta} className={`${assessmentPrimaryButton} text-sm`}>
                {level.ctaLabel}
              </button>
              <button type="button" onClick={onReset} className={`${assessmentSecondaryButton} text-sm`}>
                <RotateCcw className="h-4 w-4" /> Пройти заново
              </button>
            </div>
          </div>
        </section>

        <button type="button" onClick={onBack} className={assessmentChip}>
          <ArrowLeft className="h-4 w-4" /> Вернуться к ответам
        </button>
      </div>
    </Container>
  );
}

function ProfilePill({ label }: { label: string }) {
  return <span className={assessmentChip}>{label}</span>;
}

function ScoreBadge({
  score,
  totalScore,
  maxScore,
  color,
}: {
  score: number;
  totalScore: number;
  maxScore: number;
  color: string;
}) {
  const pct = Math.min(Math.max(score / 4, 0), 1);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className={`${assessmentElevated} p-5 text-center lg:min-w-40`}>
      <svg viewBox="0 0 140 140" className="mx-auto h-36 w-36">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="color-mix(in oklab, var(--muted) 22%, transparent)" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          transform="rotate(-90 70 70)"
        />
        <text x="70" y="66" textAnchor="middle" className="fill-[var(--foreground)] text-3xl font-bold">
          {formatItScore(score)}
        </text>
        <text x="70" y="88" textAnchor="middle" className="fill-[var(--muted)] text-xs">
          из 4.0
        </text>
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
        {totalScore} из {maxScore}
      </p>
    </div>
  );
}

function scoreLabel(score: number): { label: string; color: string } {
  if (score <= 1) return { label: "Требует внимания", color: "#e30613" };
  if (score <= 2) return { label: "Есть потенциал", color: "#d38f1f" };
  if (score <= 3) return { label: "Развивается", color: "#2ea36b" };
  return { label: "Сильная сторона", color: "#7b5cff" };
}

function Heatmap({ domains }: { domains: ItHeatmapDomain[] }) {
  return (
    <section className={`${assessmentCard} p-5 sm:p-6`}>
      <p className={assessmentEyebrow}>Разбор по направлениям</p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
        {[1, 2, 4].map((score) => {
          const { label, color } = scoreLabel(score);
          return (
            <span key={label} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: color }}
              />
              {label}
            </span>
          );
        })}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {domains.map((domain) => {
          const { label, color } = scoreLabel(domain.score);
          return (
            <article key={domain.id} className={`${assessmentSoftCard} p-4 transition hover:border-[color:color-mix(in_oklab,var(--primary)_34%,var(--border))]`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span style={{ color }}>{domain.icon}</span>
                  <h3 className="text-sm font-semibold leading-snug text-[var(--foreground)]">{domain.title}</h3>
                </div>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ background: `color-mix(in oklab, ${color} 16%, transparent)`, color }}
                >
                  {label}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
                <div className="h-full rounded-full" style={{ width: `${(domain.score / domain.maxScore) * 100}%`, background: color }} />
              </div>
              <p className="mt-3 text-xs font-semibold" style={{ color }}>{domain.insight.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{domain.insight.diagnosis}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function QuickWinsPanel({ quickWins }: { quickWins: { action: string; domain: string }[] }) {
  return (
    <section className={`${assessmentWarningPanel} p-5 sm:p-6`}>
      <p className={assessmentEyebrow}>Quick wins на 30 дней</p>
      <div className="mt-5 space-y-3">
        {quickWins.map(({ action, domain }, index) => (
          <div key={domain} className={`${assessmentElevated} p-4`}>
            <div className="flex items-start gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                style={{ background: "#d38f1f" }}
              >
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
  );
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
        По результатам диагностики явных преимуществ в текущем состоянии ИТ-ландшафта не выявлено — большинство
        направлений требуют развития. Это не приговор: большинство компаний начинают именно с такой точки. Главное —
        теперь есть чёткая картина, с чего начинать. Конкретные первые шаги — в разделе Quick wins ниже.
      </p>
    </section>
  );
}

function RiskFlags({ riskFlags }: { riskFlags: ItRiskFlag[] }) {
  return (
    <section className={`${assessmentDangerPanel} p-5 sm:p-6`}>
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--error)]">Top-3 риска</p>
      <div className="mt-5 space-y-3">
        {riskFlags.map((risk) => (
          <article key={risk.title} className={`${assessmentElevated} p-4`}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">{risk.title}</h3>
              <span className="rounded-full bg-[#e30613]/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ffc6ca]">{risk.severity}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{risk.observation}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#ffc6ca]">{risk.businessImpact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
