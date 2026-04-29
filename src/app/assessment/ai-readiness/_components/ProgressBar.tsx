export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={current === 0 ? 0 : 1}
      aria-valuemax={total}
      aria-label={`Шаг ${current} из ${total}`}
      className="grid h-1.5 grid-cols-8 gap-1"
    >
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-full rounded-full transition-colors ${
            index < current
              ? "bg-[linear-gradient(90deg,var(--primary),var(--primary-hover))] shadow-[0_0_16px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
              : "bg-[color:color-mix(in_oklab,var(--surface-2)_76%,transparent)]"
          }`}
        />
      ))}
    </div>
  );
}
