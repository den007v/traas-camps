"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
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
  calculateProcessMaturityResult,
  formatMaturityScore,
  getProfileLabel,
  processMaturityQuestions,
  profileQuestions,
  scoreColor,
  type DomainScore,
  type ProcessMaturityResult,
} from "@/data/assessmentProcessMaturity";
import { siteContent } from "@/data/siteContent";

const STORAGE_KEY = "traas-process-data-maturity-v2";
const LOADING_DELAY_MS = 1700;

type Screen = "intro" | "step" | "loading" | "result";

type StoredState = {
  screen: Screen;
  step: number;
  profileAnswers: Record<string, string>;
  expertAnswers: Record<string, string>;
};

const totalSteps = profileQuestions.length + processMaturityQuestions.length;

function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const win = window as Window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer ?? [];
  win.dataLayer.push({ event: name, ...params });
}

function currentQuestionForStep(step: number) {
  if (step < profileQuestions.length) return profileQuestions[step];
  return processMaturityQuestions[step - profileQuestions.length];
}

export default function ProcessMaturityAssessmentPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [step, setStep] = useState(0);
  const [profileAnswers, setProfileAnswers] = useState<Record<string, string>>({});
  const [expertAnswers, setExpertAnswers] = useState<Record<string, string>>({});
  const [contactOpen, setContactOpen] = useState(false);
  const analyticsSent = useRef(false);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = currentQuestionForStep(step);
  const isProfileStep = step < profileQuestions.length;
  const selectedValue = currentQuestion
    ? isProfileStep
      ? profileAnswers[currentQuestion.id]
      : expertAnswers[currentQuestion.id]
    : undefined;

  const result = useMemo(
    () => calculateProcessMaturityResult(expertAnswers),
    [expertAnswers],
  );

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<StoredState>;
      if (parsed.screen) setScreen(parsed.screen === "loading" ? "step" : parsed.screen);
      if (Number.isFinite(parsed.step)) setStep(Math.min(Math.max(parsed.step ?? 0, 0), totalSteps - 1));
      if (parsed.profileAnswers) setProfileAnswers(parsed.profileAnswers);
      if (parsed.expertAnswers) setExpertAnswers(parsed.expertAnswers);
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (screen === "loading") return;
    const payload: StoredState = { screen, step, profileAnswers, expertAnswers };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [screen, step, profileAnswers, expertAnswers]);

  useEffect(() => {
    if (screen !== "step" || !currentQuestion) return;
    trackEvent("pdm_step_view", {
      step_index: step + 1,
      question_id: currentQuestion.id,
      domain: "domain" in currentQuestion ? currentQuestion.domain : null,
    });
  }, [screen, step, currentQuestion]);

  useEffect(() => {
    if (screen !== "result" || analyticsSent.current) return;
    analyticsSent.current = true;
    trackEvent("pdm_complete", {
      total_score: Number(formatMaturityScore(result.totalScore)),
      profile: result.level.id,
      domain_scores: result.domainScores.map((item) => ({ id: item.id, score: Number(formatMaturityScore(item.score)) })),
    });
    void saveAnalytics(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  useEffect(() => () => {
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
  }, []);

  function start() {
    setScreen("step");
    setStep(0);
    trackEvent("pdm_start", { source: "process_maturity_page" });
  }

  function selectAnswer(value: string) {
    if (!currentQuestion) return;
    if (isProfileStep) {
      setProfileAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    } else {
      setExpertAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    }

    const selected = currentQuestion.options.find((option) => option.value === value);
    trackEvent("pdm_answer", {
      question_id: currentQuestion.id,
      answer_id: selected?.id ?? value,
      score: selected?.score ?? null,
      domain: "domain" in currentQuestion ? currentQuestion.domain : null,
    });
  }

  function next() {
    if (!selectedValue) return;
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
      return;
    }
    setScreen("loading");
    loadingTimer.current = setTimeout(() => setScreen("result"), LOADING_DELAY_MS);
  }

  function back() {
    if (screen === "result") {
      setScreen("step");
      setStep(totalSteps - 1);
      analyticsSent.current = false;
      return;
    }
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function reset() {
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setScreen("intro");
    setStep(0);
    setProfileAnswers({});
    setExpertAnswers({});
    analyticsSent.current = false;
    window.sessionStorage.removeItem(STORAGE_KEY);
  }

  async function saveAnalytics(assessmentResult: ProcessMaturityResult) {
    try {
      await fetch("/api/assessment/process-maturity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentVersion: "process_data_maturity_v2",
          profileAnswers,
          answers: expertAnswers,
          result: {
            totalScore: assessmentResult.totalScore,
            uncappedScore: assessmentResult.uncappedScore,
            levelId: assessmentResult.level.id,
            hardCapApplied: assessmentResult.hardCapApplied,
            domainScores: assessmentResult.domainScores.map((domain) => ({
              id: domain.id,
              score: domain.score,
              rawScore: domain.rawScore,
              weight: domain.weight,
            })),
          },
        }),
      });
    } catch {
      // Analytics must never block the diagnostic UX.
    }
  }

  return (
    <div className={assessmentShell}>
      <div className={assessmentBackground} aria-hidden />
      <SiteHeader content={siteContent} currentPageLabel="Зрелость процессов и данных" />

      <main className="relative z-10">
        {screen === "intro" ? <IntroScreen onStart={start} /> : null}
        {screen === "step" && currentQuestion ? (
          <QuestionFlow
            step={step}
            question={currentQuestion}
            selectedValue={selectedValue}
            onSelect={selectAnswer}
            onBack={back}
            onNext={next}
          />
        ) : null}
        {screen === "loading" ? <LoadingScreen /> : null}
        {screen === "result" ? (
          <ResultScreen
            result={result}
            profileAnswers={profileAnswers}
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
          <p className={assessmentEyebrow}>
            TraaS · Диагностика
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Зрелость процессов и данных
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            5–7 минут · 10 вопросов · персональный отчёт с профилем зрелости, heatmap по 8 доменам, Top-3 зонами риска и планом действий на 30/90 дней.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["Профиль", "Поймёте текущий уровень по шкале MWS 1–5"],
              ["Heatmap", "Увидите зрелость процессов и данных по 8 доменам"],
              ["План", "Получите quick wins и roadmap на 90 дней"],
            ].map(([title, text]) => (
              <div key={title} className={`${assessmentSoftCard} p-4`}>
                <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onStart}
              className={`${assessmentPrimaryButton} px-6`}
            >
              Начать диагностику
            </button>
            <Link
              href="/"
              className={assessmentSecondaryButton}
            >
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
          <p className="text-sm font-semibold text-[var(--foreground)]">Как отвечать</p>
          <p className={`mt-2 ${assessmentMutedText}`}>
            Выбирайте наблюдаемый факт о текущем состоянии, а не желаемую картину. Так scoring будет ближе к реальности.
          </p>
          <div className="mt-5 space-y-3">
            {processMaturityQuestions.slice(0, 4).map((item) => (
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
  onNext,
}: {
  step: number;
  question: ReturnType<typeof currentQuestionForStep>;
  selectedValue?: string;
  onSelect: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
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
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              disabled={step === 0}
              className={`${assessmentSecondaryButton} min-h-11 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!selectedValue}
              className={`${assessmentPrimaryButton} min-h-11 px-5 py-2.5 text-sm`}
            >
              {step === totalSteps - 1 ? "Показать отчёт" : "Далее"}
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
        <h2 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">
          Считаем профиль вашей компании
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Собираем результат по 8 доменам зрелости процессов и данных, проверяем hard caps и формируем приоритеты на 30/90 дней.
        </p>
      </motion.div>
    </Container>
  );
}

function ResultScreen({
  result,
  profileAnswers,
  onBack,
  onReset,
  onCta,
}: {
  result: ProcessMaturityResult;
  profileAnswers: Record<string, string>;
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
            <span>Диагностика зрелости процессов и данных</span>
          </div>
          <AssessmentProgress current={totalSteps} total={totalSteps} />
        </div>

        <section className={`${assessmentCard} p-6 sm:p-8 lg:p-10`}>
          <div
            aria-hidden
            className="absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: `color-mix(in oklab, ${result.level.color} 26%, transparent)` }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_260px] lg:items-start">
            <div>
              <p className={assessmentEyebrow}>
                Ваш результат
              </p>
              <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl">
                {result.level.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--foreground)]/85">
                {result.level.description}
              </p>
              {result.hardCapApplied ? (
                <div className="mt-5 rounded-2xl border border-[#e30613]/35 bg-[#e30613]/10 p-4 text-sm leading-relaxed text-[#ffc6ca]">
                  Сработал hard cap: базовая гигиена по владельцам процессов или качеству данных ограничивает итоговый уровень до 2.5/5, даже если другие домены выглядят сильнее.
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {profileAnswers.role ? <ProfilePill label={getProfileLabel("role", profileAnswers.role)} /> : null}
                {profileAnswers.scope ? <ProfilePill label={getProfileLabel("scope", profileAnswers.scope)} /> : null}
              </div>
            </div>
            <ScoreBadge score={result.totalScore} uncappedScore={result.uncappedScore} color={result.level.color} />
          </div>
        </section>

        <AIGeneratedNotice />

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Heatmap domains={result.domainScores} />
          <RiskFlags result={result} />
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <InfoPanel title="Что у вас работает" items={result.strengths} tone="success" />
          <InfoPanel title="Quick wins на 30 дней" items={result.quickWins} tone="warning" />
        </section>

        <section className={`${assessmentCard} p-6 sm:p-8`}>
          <p className={assessmentEyebrow}>Roadmap · 90 дней</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {result.roadmap.map((item, index) => (
              <div key={item} className={`${assessmentSoftCard} p-4`}>
                <span className="text-sm font-semibold" style={{ color: result.level.color }}>0{index + 1}</span>
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
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                {result.level.ctaText} Полный отчёт уже доступен здесь; контакты нужны только для PDF, benchmark или 30-минутного разбора.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={onCta} className={`${assessmentPrimaryButton} text-sm`}>
                {result.level.ctaLabel}
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
  return (
    <span className={assessmentChip}>
      {label}
    </span>
  );
}

function AIGeneratedNotice() {
  return (
    <section className={`${assessmentSoftCard} border-l-2 border-l-[var(--primary)] p-5`}>
      <p className={assessmentEyebrow}>
        Важно о результате
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        Этот отчёт подготовлен AI на основе ваших ответов и не является экспертным заключением TraaS.
        Он помогает быстро увидеть вероятные зоны риска, но не заменяет полноценную диагностику с интервью,
        анализом процессов, системных артефактов и качества данных. Если хотите более глубокий и конкретный
        разбор вашей ситуации — приходите к нам, команда TraaS поможет собрать практичный план действий.
      </p>
    </section>
  );
}

function ScoreBadge({ score, uncappedScore, color }: { score: number; uncappedScore: number; color: string }) {
  const pct = Math.min(Math.max(score / 5, 0), 1);
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
          {formatMaturityScore(score)}
        </text>
        <text x="70" y="88" textAnchor="middle" className="fill-[var(--muted)] text-xs">
          из 5.0
        </text>
      </svg>
      {Math.abs(score - uncappedScore) > 0.01 ? (
        <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">До hard cap: {formatMaturityScore(uncappedScore)}</p>
      ) : null}
    </div>
  );
}

function Heatmap({ domains }: { domains: DomainScore[] }) {
  return (
    <section className={`${assessmentCard} p-5 sm:p-6`}>
      <p className={assessmentEyebrow}>Heatmap по 8 доменам</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {domains.map((domain) => {
          const color = scoreColor(domain.score);
          return (
            <article key={domain.id} className={`${assessmentSoftCard} p-4 transition hover:border-[color:color-mix(in_oklab,var(--primary)_34%,var(--border))]`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span style={{ color }}>{domain.icon}</span>
                  <h3 className="text-sm font-semibold leading-snug text-[var(--foreground)]">{domain.title}</h3>
                </div>
                <span className="text-sm font-semibold" style={{ color }}>{formatMaturityScore(domain.score)}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
                <div className="h-full rounded-full" style={{ width: `${(domain.score / 5) * 100}%`, background: color }} />
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

function RiskFlags({ result }: { result: ProcessMaturityResult }) {
  return (
    <section className={`${assessmentDangerPanel} p-5 sm:p-6`}>
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--error)]">Top-3 риска</p>
      <div className="mt-5 space-y-3">
        {result.riskFlags.map((risk) => (
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

function InfoPanel({ title, items, tone }: { title: string; items: string[]; tone: "success" | "warning" }) {
  const color = tone === "success" ? "#2ea36b" : "#d38f1f";
  const panelClass = tone === "success" ? assessmentSuccessPanel : assessmentWarningPanel;
  return (
    <section className={`${panelClass} p-5 sm:p-6`}>
      <p className={assessmentEyebrow}>{title}</p>
      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div key={item} className={`${assessmentElevated} flex gap-3 p-4`}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: color }}>
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed text-[var(--foreground)]/85">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
