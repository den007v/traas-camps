export function ScoreCircle({
  score,
  color,
  size = 112,
  label = "Индекс готовности",
}: {
  score: number;
  color: string;
  size?: number;
  label?: string;
}) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference;

  return (
    <div className="inline-flex flex-col items-center gap-2 text-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="color-mix(in oklab, var(--surface-2) 82%, transparent)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-[var(--foreground)] text-2xl font-semibold"
        >
          {score}%
        </text>
      </svg>
      {label ? <span className="text-xs text-[var(--muted)]">{label}</span> : null}
    </div>
  );
}
