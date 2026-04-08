import { Container } from "@/components/ui/Container";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  profileQuestions,
  readinessLevels,
} from "@/data/assessmentAiReadiness";
import {
  AssessmentAnalyticsDashboard,
  type AssessmentAnalyticsData,
} from "@/components/assessment/AssessmentAnalyticsDashboard";

type Row = {
  created_at: string;
  role: string | null;
  company_size: string | null;
  industry: string | null;
  primary_challenge: string | null;
  total_score: number;
  level_id: string;
};

function labelFromQuestion(questionId: string, value: string | null) {
  if (!value) return "Не указано";
  const q = profileQuestions.find((item) => item.id === questionId);
  const option = q?.options.find((opt) => opt.value === value);
  return option?.text ?? value;
}

function countBuckets(values: (string | null)[], toLabel: (v: string | null) => string) {
  const map = new Map<string, number>();
  for (const value of values) {
    const label = toLabel(value);
    map.set(label, (map.get(label) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([label, count]) => ({ key: label, label, count }))
    .sort((a, b) => b.count - a.count);
}

function toDashboardData(rows: Row[]): AssessmentAnalyticsData {
  const totalSessions = rows.length;
  const avgScore = totalSessions
    ? rows.reduce((sum, r) => sum + r.total_score, 0) / totalSessions
    : 0;

  const levelBuckets = readinessLevels.map((lvl) => ({
    key: lvl.id,
    label: lvl.title,
    count: rows.filter((r) => r.level_id === lvl.id).length,
  }));

  return {
    totalSessions,
    avgScore,
    levelBuckets,
    roleBuckets: countBuckets(rows.map((r) => r.role), (v) =>
      labelFromQuestion("role", v),
    ),
    companySizeBuckets: countBuckets(rows.map((r) => r.company_size), (v) =>
      labelFromQuestion("companySize", v),
    ),
    industryBuckets: countBuckets(rows.map((r) => r.industry), (v) =>
      labelFromQuestion("industry", v),
    ),
    challengeBuckets: countBuckets(rows.map((r) => r.primary_challenge), (v) =>
      labelFromQuestion("primaryChallenge", v),
    ),
    lastRuns: rows.slice(0, 12).map((r) => ({
      createdAt: r.created_at,
      level:
        readinessLevels.find((l) => l.id === r.level_id)?.title ?? r.level_id,
      score: r.total_score,
    })),
  };
}

export default async function AssessmentAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  const dashboardKey = process.env.ADMIN_DASHBOARD_KEY;

  if (dashboardKey && params.key !== dashboardKey) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-20 text-[var(--foreground)]">
        <Container>
          <div className="mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <h1 className="text-2xl font-semibold">Доступ ограничен</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Для просмотра аналитики добавьте корректный ключ в URL.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-20 text-[var(--foreground)]">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <h1 className="text-2xl font-semibold">Аналитика недоступна</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Не настроен серверный доступ к Supabase. Проверьте
              NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("assessment_ai_readiness_sessions")
    .select(
      "created_at,role,company_size,industry,primary_challenge,total_score,level_id",
    )
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-20 text-[var(--foreground)]">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <h1 className="text-2xl font-semibold">Ошибка загрузки данных</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">{error.message}</p>
          </div>
        </Container>
      </div>
    );
  }

  const dashboardData = toDashboardData((data ?? []) as Row[]);

  return (
    <div className="min-h-screen bg-[var(--background)] py-10 text-[var(--foreground)] sm:py-14">
      <Container>
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Аналитика теста AI Readiness
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Анонимные данные прохождений: роли, размер компаний, отрасли, ключевые
            барьеры и распределение уровней зрелости.
          </p>
        </header>
        <AssessmentAnalyticsDashboard data={dashboardData} />
      </Container>
    </div>
  );
}
