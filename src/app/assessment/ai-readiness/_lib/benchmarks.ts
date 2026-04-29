import type { BenchmarkData, ProfileKey } from "./types";

export const COMMON_BENCHMARKS: BenchmarkData[] = [
  {
    id: "adoption",
    metric: "Адопция ИИ",
    value: "88%",
    description: "компаний регулярно используют ИИ хотя бы в одной функции",
    source: "McKinsey State of AI 2025",
  },
  {
    id: "scaling",
    metric: "Масштабирование",
    value: "33%",
    description: "только треть компаний дошли до scaled deployment ИИ",
    source: "McKinsey State of AI 2025",
  },
  {
    id: "data-ready",
    metric: "AI-ready data",
    value: "43%",
    description: "компаний считают свои данные готовыми к ИИ",
    source: "Gartner Hype Cycle 2025",
  },
  {
    id: "high-performers",
    metric: "High performers",
    value: "6%",
    description: "компаний имеют EBIT-эффект от ИИ ≥5%",
    source: "McKinsey State of AI 2025",
  },
];

export const PROFILE_BENCHMARKS: Record<ProfileKey, string> = {
  fragmented:
    "По BCG, 60% компаний на вашем уровне зрелости получают «hardly any material value» от ИИ-инвестиций. Это широкая группа, но именно сейчас открыто окно: лидеры тратят на 64% больше ИТ-бюджета на ИИ — каждый год без структурного подхода увеличивает разрыв.",
  pilot_ready:
    "По MIT NANDA 2025, 95% GenAI-пилотов не дают измеримого P&L-эффекта. Главная причина — запуск без подготовки оснований. Вы в группе, которая может избежать этой ошибки, потому что осознаёт gap'ы до старта.",
  managed_scaling:
    "Вы среди 26% компаний, которые BCG относит к scaled value group. Внутри этой группы лидеры (top 6%) делают workflow redesign в 2,8 раза чаще среднего — это самый сильный сигнал перехода от scaled adoption к настоящей трансформации.",
  platform_ready:
    "Вы среди ~5% компаний, которые BCG относит к «future-built». Эти компании достигают 5x роста выручки и 3x снижения издержек по сравнению с laggards — и каждый год реинвестируют в новые capabilities, увеличивая разрыв.",
};
