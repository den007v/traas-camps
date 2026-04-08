import { motion } from "framer-motion";

export function AssessmentProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.min((current / total) * 100, 100);
  const progressColor =
    pct < 35 ? "#e30613" : pct < 75 ? "#d38f1f" : "#2ea36b";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
        <span>Прогресс</span>
        <span>
          Вопрос {Math.min(current, total)} из {total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
          className="h-1.5 rounded-full"
          style={{ backgroundColor: progressColor }}
        />
      </div>
    </div>
  );
}
