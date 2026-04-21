"use client";

import { motion } from "framer-motion";
import {
  aiReadinessQuestions,
  getProfileLabel,
  scoreColor,
  type RadarAxisPoint,
  type ReadinessLevel,
} from "@/data/assessmentAiReadiness";

type Props = {
  level: ReadinessLevel;
  radarData: RadarAxisPoint[];
  scoresByQuestion: number[];
  totalScore: number;
  profileAnswers: Record<string, string>;
  onReset: () => void;
  onCta: () => void;
};

const PROFILE_ICONS: Record<string, string> = {
  role: "◈",
  companySize: "▦",
  primaryChallenge: "◎",
};

const ROLE_LABELS: Record<string, string> = {
  ceo_founder: "CEO / Основатель",
  cto_cio: "CTO / CIO / CDO",
  head_unit: "Руководитель функции",
  manager_expert: "Менеджер / эксперт",
  other: "Другая роль",
};

export function AssessmentResult({
  level,
  radarData,
  scoresByQuestion,
  totalScore,
  profileAnswers,
  onReset,
  onCta,
}: Props) {
  const maxScore = aiReadinessQuestions.length * 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-5"
    >
      {/* ── 1. Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_90%,transparent)] p-5 sm:p-7"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full blur-3xl"
          style={{ background: `color-mix(in oklab, ${level.color} 24%, transparent)` }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Ваш результат
              </p>
              <h2
                className="mt-2 text-balance text-[26px] font-semibold leading-tight sm:text-[32px]"
                style={{ color: level.color }}
              >
                {level.title}
              </h2>
            </div>
            <div
              className="flex flex-col items-end gap-0.5 rounded-xl border px-4 py-2.5 text-right"
              style={{ borderColor: `${level.color}44`, background: `${level.color}0f` }}
            >
              <span className="text-2xl font-bold leading-none" style={{ color: level.color }}>
                {totalScore}
              </span>
              <span className="text-[11px] text-[var(--muted)]">из {maxScore} баллов</span>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[var(--foreground)]/85 sm:text-[15px]">
            {level.description}
          </p>

          {/* Profile pills */}
          {(profileAnswers.role || profileAnswers.companySize || profileAnswers.primaryChallenge) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {profileAnswers.role && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[12px] text-[var(--foreground)]/80">
                  <span className="opacity-60">{PROFILE_ICONS.role}</span>
                  {ROLE_LABELS[profileAnswers.role] ?? profileAnswers.role}
                </span>
              )}
              {profileAnswers.companySize && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[12px] text-[var(--foreground)]/80">
                  <span className="opacity-60">{PROFILE_ICONS.companySize}</span>
                  {getProfileLabel("companySize", profileAnswers.companySize)}
                </span>
              )}
              {profileAnswers.primaryChallenge && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[12px] text-[var(--foreground)]/80">
                  <span className="opacity-60">{PROFILE_ICONS.primaryChallenge}</span>
                  {getProfileLabel("primaryChallenge", profileAnswers.primaryChallenge)}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* ── 2. Dimension breakdown ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Разбор по направлениям
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {aiReadinessQuestions.map((question, idx) => {
            const score = scoresByQuestion[idx] ?? 1;
            const insight = question.dimensionInsights[score - 1];
            const color = scoreColor(score);
            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 + idx * 0.07 }}
                className="rounded-xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_94%,transparent)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px]" style={{ color }}>{question.dimensionIcon}</span>
                    <span className="text-[13px] font-semibold text-[var(--foreground)]">
                      {question.dimension}
                    </span>
                  </div>
                  <ScoreDots score={score} color={color} />
                </div>

                <p
                  className="mt-2 text-[12px] font-semibold leading-snug"
                  style={{ color }}
                >
                  {insight.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-[var(--foreground)]/75">
                  {insight.diagnosis}
                </p>
                <div className="mt-2.5 flex items-start gap-1.5">
                  <span className="mt-0.5 shrink-0 text-[10px]" style={{ color }}>→</span>
                  <p className="text-[12px] leading-relaxed" style={{ color: `color-mix(in oklab, ${color} 85%, var(--foreground))` }}>
                    {insight.action}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── 3. Radar chart ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.32, type: "spring", stiffness: 80 }}
        className="rounded-2xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_94%,transparent)] p-3 sm:p-5"
      >
        <p className="mb-1 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Профиль готовности
        </p>
        <ModernRadarChart data={radarData} color={level.color} />
      </motion.div>

      {/* ── 4. Next actions ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="rounded-2xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_94%,transparent)] p-5"
      >
        <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Что делать прямо сейчас
        </p>
        <div className="space-y-3">
          {level.nextActions.map((action, idx) => (
            <motion.div
              key={action}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42 + idx * 0.09 }}
              className="flex items-start gap-3"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ background: level.color }}
              >
                {idx + 1}
              </span>
              <p className="text-[13px] leading-relaxed text-[var(--foreground)]/85">
                {action}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── 5. Level insights ────────────────────────────────── */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Ключевые наблюдения
        </p>
        {level.insights.map((insight, idx) => (
          <motion.div
            key={insight}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.08 }}
            className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_94%,transparent)] px-4 py-3"
          >
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: level.color }} />
            <p className="text-[13px] leading-relaxed text-[var(--foreground)]/85">{insight}</p>
          </motion.div>
        ))}
      </div>

      {/* ── 6. CTA ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58 }}
        className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--surface)_94%,transparent),color-mix(in_oklab,var(--primary)_8%,transparent))] p-5 sm:p-6"
      >
        <p className="text-[15px] font-semibold leading-snug text-[var(--foreground)]">
          {level.ctaText}
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
          Бесплатная сессия · 30 минут · Экспресс-разбор текущего уровня, приоритеты на 30–90 дней и рекомендации по следующему шагу
        </p>
        <p className="mt-1.5 text-[11px] text-[var(--muted)]/70">
          Уже работаем с компаниями из портфеля АФК Система, СДЭК, МЕДСИ
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCta}
            className="rounded-full border border-[#e30613]/68 bg-[linear-gradient(180deg,#ef1b2a,#d10614)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(227,6,19,0.24)] transition hover:brightness-105 active:brightness-95"
          >
            {level.ctaLabel}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-[var(--border)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Пройти тест заново
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScoreDots({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="inline-block h-2 w-4 rounded-sm transition-colors"
          style={{ background: i <= score ? color : "color-mix(in oklab, var(--muted) 28%, transparent)" }}
        />
      ))}
    </div>
  );
}

function ModernRadarChart({
  data,
  color,
}: {
  data: RadarAxisPoint[];
  color: string;
}) {
  const size = 560;
  const center = size / 2;
  const maxR = 148;
  const levels = [0.2, 0.4, 0.6, 0.8, 1];

  const angleFor = (idx: number) => (Math.PI * 2 * idx) / data.length - Math.PI / 2;
  const pointAt = (idx: number, radius: number) => {
    const a = angleFor(idx);
    return {
      x: center + Math.cos(a) * radius,
      y: center + Math.sin(a) * radius,
    };
  };

  const points = data.map((d, idx) => pointAt(idx, (d.value / 4) * maxR));
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const polygonPath =
    points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const labelOffset = 42;

  const axisLabelAt = (idx: number) => {
    const p = pointAt(idx, maxR + labelOffset);
    const a = angleFor(idx);
    const cos = Math.cos(a);
    let anchor: "start" | "middle" | "end" = "middle";
    if (cos > 0.24) anchor = "start";
    if (cos < -0.24) anchor = "end";
    return { ...p, anchor };
  };

  const splitLabel = (label: string) => {
    if (label.length <= 18) return [label];
    const words = label.split(" ");
    if (words.length < 2) return [label];
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  };

  return (
    <div className="relative mx-auto max-w-[640px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full">
        <defs>
          <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.44" />
            <stop offset="100%" stopColor={color} stopOpacity="0.14" />
          </linearGradient>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.16" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx={center}
          cy={center}
          r={maxR * 0.72}
          fill="url(#coreGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.08 }}
        />

        {levels.map((l, idx) => (
          <motion.polygon
            key={l}
            points={data
              .map((_, i) => {
                const p = pointAt(i, maxR * l);
                return `${p.x},${p.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="color-mix(in oklab, var(--muted) 34%, transparent)"
            strokeWidth={l === 1 ? "1.2" : "1"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.08 }}
          />
        ))}

        {data.map((axis, idx) => {
          const p = pointAt(idx, maxR);
          return (
            <g key={axis.axis}>
              <motion.line
                x1={center}
                y1={center}
                x2={p.x}
                y2={p.y}
                stroke="color-mix(in oklab, var(--muted) 32%, transparent)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.12 + idx * 0.06, duration: 0.45 }}
              />
              <motion.text
                x={axisLabelAt(idx).x}
                y={axisLabelAt(idx).y}
                textAnchor={axisLabelAt(idx).anchor}
                dominantBaseline="middle"
                fill="color-mix(in oklab, var(--foreground) 84%, var(--muted))"
                className="text-[10px] font-medium sm:text-[11px]"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 + idx * 0.07 }}
              >
                {splitLabel(axis.axis).map((line, lineIdx) => (
                  <tspan
                    key={`${axis.axis}-${lineIdx}`}
                    x={axisLabelAt(idx).x}
                    dy={lineIdx === 0 ? 0 : 12}
                  >
                    {line}
                  </tspan>
                ))}
              </motion.text>
            </g>
          );
        })}

        <motion.polygon
          points={polygonPoints}
          fill="url(#radarFill)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.45 }}
        />

        <motion.path
          d={polygonPath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          filter="url(#glow)"
          initial={{ opacity: 0.3, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.35 }}
        />

        {points.map((p, idx) => (
          <motion.circle
            key={`${p.x}-${p.y}-${idx}`}
            cx={p.x}
            cy={p.y}
            r="4.2"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.64 + idx * 0.06 }}
          />
        ))}
      </svg>
    </div>
  );
}
