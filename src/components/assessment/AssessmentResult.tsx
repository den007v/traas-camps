import { motion } from "framer-motion";
import type { RadarAxisPoint, ReadinessLevel } from "@/data/assessmentAiReadiness";

type Props = {
  level: ReadinessLevel;
  radarData: RadarAxisPoint[];
  onReset: () => void;
  onCta: () => void;
};

export function AssessmentResult({
  level,
  radarData,
  onReset,
  onCta,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-7"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_90%,transparent)] p-5 sm:p-6"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full blur-3xl"
          style={{ background: `color-mix(in oklab, ${level.color} 26%, transparent)` }}
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Ваш результат
            </p>
            <h2
              className="mt-2 text-balance text-[28px] font-semibold leading-tight sm:text-4xl"
              style={{ color: level.color }}
            >
              {level.title}
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--foreground)]/92">
              {level.description}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 80 }}
        className="rounded-2xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_94%,transparent)] p-3 sm:p-5"
      >
        <ModernRadarChart data={radarData} color={level.color} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--surface)_94%,transparent),color-mix(in_oklab,var(--primary)_8%,transparent))] p-5"
      >
        <p className="text-sm leading-relaxed text-[var(--foreground)]">{level.ctaText}</p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Что получите: экспресс-разбор текущего уровня, приоритеты на 30-90 дней и рекомендации по следующему шагу.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCta}
            className="rounded-full border border-[#e30613]/68 bg-[linear-gradient(180deg,#ef1b2a,#d10614)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(227,6,19,0.24)] transition hover:brightness-105"
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

      <div className="space-y-2.5">
        {level.insights.map((insight, idx) => (
          <motion.div
            key={insight}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 + idx * 0.1 }}
            className="rounded-xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_94%,transparent)] px-4 py-3 text-sm text-[var(--foreground)]/90"
          >
            {insight}
          </motion.div>
        ))}
      </div>
    </motion.div>
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
  const polygonPath = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
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
    <div className="relative mx-auto max-w-[680px]">
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
                  <tspan key={`${axis.axis}-${lineIdx}`} x={axisLabelAt(idx).x} dy={lineIdx === 0 ? 0 : 12}>
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
            key={`${p.x}-${p.y}`}
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
