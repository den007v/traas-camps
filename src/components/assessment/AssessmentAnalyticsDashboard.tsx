"use client";

import { motion } from "framer-motion";

type Bucket = { key: string; label: string; count: number };

export type AssessmentAnalyticsData = {
  totalSessions: number;
  avgScore: number;
  levelBuckets: Bucket[];
  roleBuckets: Bucket[];
  companySizeBuckets: Bucket[];
  industryBuckets: Bucket[];
  challengeBuckets: Bucket[];
  lastRuns: { createdAt: string; level: string; score: number }[];
};

function BucketBars({
  title,
  rows,
  accent = "#e30613",
}: {
  title: string;
  rows: Bucket[];
  accent?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <h3 className="text-base font-semibold text-[var(--foreground)]">{title}</h3>
      <div className="mt-4 space-y-3">
        {rows.length ? (
          rows.map((row, idx) => (
            <motion.div
              key={row.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <div className="mb-1 flex items-center justify-between text-xs text-[var(--muted)]">
                <span className="line-clamp-1">{row.label}</span>
                <span>{row.count}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-2)]">
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${(row.count / max) * 100}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-[var(--muted)]">Пока нет данных.</p>
        )}
      </div>
    </section>
  );
}

export function AssessmentAnalyticsDashboard({
  data,
}: {
  data: AssessmentAnalyticsData;
}) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            Сессий теста
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
            {data.totalSessions}
          </p>
        </article>
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            Средний балл
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
            {data.avgScore.toFixed(1)}
          </p>
        </article>
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            Последние сессии
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
            {data.lastRuns.length}
          </p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <BucketBars title="Уровни зрелости" rows={data.levelBuckets} />
        <BucketBars title="Роли респондентов" rows={data.roleBuckets} />
        <BucketBars title="Размер компаний" rows={data.companySizeBuckets} />
        <BucketBars title="Отрасли" rows={data.industryBuckets} />
        <BucketBars title="Главные барьеры" rows={data.challengeBuckets} />
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            Последние прохождения
          </h3>
          <div className="mt-4 space-y-2">
            {data.lastRuns.length ? (
              data.lastRuns.map((run, idx) => (
                <motion.div
                  key={`${run.createdAt}-${idx}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-xs"
                >
                  <span className="text-[var(--muted)]">
                    {new Date(run.createdAt).toLocaleString("ru-RU")}
                  </span>
                  <span className="font-medium text-[var(--foreground)]">
                    {run.level} · {run.score}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-[var(--muted)]">Пока нет данных.</p>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
