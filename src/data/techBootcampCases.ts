import {
  aquaMovingMotivatorsText,
  cdekHomelabText,
  mtsBankCfaLaunchText,
} from "@/data/techBootcampCaseTexts";

export type TechBootcampCase = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  company: string;
  publishedAt: string;
  domain: string;
  coverTag: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  tools: string[];
  summaryBullets: string[];
  fullText: string;
  ctaText: string;
};

export const techBootcampCases: TechBootcampCase[] = [
  {
    slug: "mts-bank-cfa-launch",
    title: "Как МТС Банк запустил продукт на блокчейне, когда сроки уже поджимали",
    subtitle:
      "Проект ЦФА с опаздывающим графиком, сокращённой командой и новым для кластера технологическим стеком.",
    author: "Александр Лавреев",
    company: "МТС Банк (ЦФА)",
    publishedAt: "Февраль 2026",
    domain: "Финтех / Blockchain",
    coverTag: "Запуск under pressure",
    challenge:
      "Проект ЦФА стартовал без полноценного discovery, сроки были сорваны, а команда уже сокращена на 20%.",
    solution:
      "CTO перестроил проект на короткие регулярные статусы, жёсткую приоритизацию и фокус на критическом пути запуска.",
    outcome:
      "Платформа вышла в прод, через неё привлечены миллиарды рублей, а продукт перешёл в фазу масштабирования.",
    metrics: [
      { label: "Срок до стабилизации", value: "несколько месяцев" },
      { label: "Сокращение команды", value: "-20%" },
      { label: "Размер выпусков", value: "100 млн — 1,5 млрд ₽" },
      { label: "Операционный результат", value: "запуск в прод" },
    ],
    tools: [
      "Product discovery",
      "Ежедневные статусы",
      "Жёсткая приоритизация",
      "Интеграция с ЦФА Хаб",
      "Юридический SLA-контур",
    ],
    summaryBullets: [
      "Без качественного discovery сроки почти всегда «плывут».",
      "Юридическая обвязка должна быть в дорожной карте наравне с разработкой.",
      "Новая технология не мешает запуску при системной операционной дисциплине.",
    ],
    fullText: mtsBankCfaLaunchText,
    ctaText:
      "Хотите разобрать ваш продуктовый запуск под давлением сроков и ресурсов? Поможем собрать рабочую карту действий для вашей команды.",
  },
  {
    slug: "aquaholding-moving-motivators",
    title: "Когда команда «буксует»: как Moving Motivators вернул управленческую ясность",
    subtitle:
      "Кейс про команду без явного кризиса, но с потерей фокуса, и про то, как структурированный диалог помог принять сильные управленческие решения.",
    author: "Анастасия Горная",
    company: "Холдинг Аква",
    publishedAt: "Февраль 2026",
    domain: "Leadership / Management 3.0",
    coverTag: "Команда и мотивация",
    challenge:
      "Команда не проваливалась по метрикам, но ощущала стагнацию: размытый фокус, скрытое напряжение и неопределённость перед планированием года.",
    solution:
      "Команда провела серию индивидуальных сессий по Moving Motivators, чтобы увидеть разрыв между личными драйверами и текущей реальностью работы.",
    outcome:
      "Распределение ролей и проектов стало более осознанным, снизилось скрытое напряжение, а решения по удержанию стали точнее.",
    metrics: [
      { label: "Формат внедрения", value: "7 индивидуальных сессий" },
      { label: "Длительность сессии", value: "~1 час" },
      { label: "Подготовка", value: "< 1 часа" },
      { label: "Результат", value: "рост управленческой прозрачности" },
    ],
    tools: [
      "Moving Motivators",
      "1:1 глубинные интервью",
      "Трекинг договорённостей",
      "Ролевое планирование",
      "Управление удержанием",
    ],
    summaryBullets: [
      "Стагнация без кризиса — самый опасный тип управленческой неопределённости.",
      "Один структурированный разговор может убрать месяцы «серой зоны».",
      "Прозрачность помогает не только удерживать, но и корректно расставаться.",
    ],
    fullText: aquaMovingMotivatorsText,
    ctaText:
      "Если вашей команде нужна управленческая ясность перед новым циклом, поможем внедрить практику, которая даёт прозрачность уже в ближайшие недели.",
  },
  {
    slug: "cdek-homelab-ai-secretary",
    title: "От сломанного RAID0 к домашнему датацентру и ИИ‑секретарю встреч",
    subtitle:
      "Практический кейс о том, как бытовая поломка привела к созданию инфраструктуры из 28 сервисов и автоматизации управленческой рутины.",
    author: "Николай Пахомов",
    company: "СДЭК",
    publishedAt: "2026",
    domain: "Automation / AI Productivity",
    coverTag: "Личный Lab → бизнес-эффект",
    challenge:
      "Потеря домашнего NAS стала триггером. Параллельно оставалась рабочая боль: встречи проводились, но конспекты терялись или не делались вовремя.",
    solution:
      "Собран HomeLab с Docker и автоматизациями, затем построен пайплайн «запись встречи → распознавание → LLM-summary → Obsidian + Telegram».",
    outcome:
      "Конспекты встреч создаются по умолчанию, без ручного усилия. Управленческие договорённости фиксируются быстрее и стабильнее.",
    metrics: [
      { label: "Сервисов в контуре", value: "28 контейнеров" },
      { label: "База хранения", value: "~6 ТБ данных" },
      { label: "Скорость summary (30 мин)", value: "2–3 минуты" },
      { label: "Скорость summary (60 мин)", value: "5–7 минут" },
    ],
    tools: [
      "Docker / Portainer",
      "n8n",
      "WhisperX",
      "Ollama / OpenWebUI",
      "Syncthing / Tailscale",
      "Obsidian / Telegram Bot",
    ],
    summaryBullets: [
      "Локальная инфраструктура может закрыть реальные управленческие боли, а не только «техно-интерес».",
      "Автоматизация заметок повышает качество исполнения договорённостей.",
      "Лучший старт — минимальный рабочий пайплайн и итерации по качеству.",
    ],
    fullText: cdekHomelabText,
    ctaText:
      "Хотите внедрить похожий контур автоматизации встреч и решений для вашей команды? Подскажем, как запустить это поэтапно без перегруза.",
  },
];

export function getTechBootcampCaseBySlug(slug: string) {
  return techBootcampCases.find((item) => item.slug === slug);
}

export function getAdjacentTechBootcampCases(slug: string) {
  const index = techBootcampCases.findIndex((item) => item.slug === slug);
  if (index < 0) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? techBootcampCases[index - 1] : undefined,
    next: index < techBootcampCases.length - 1 ? techBootcampCases[index + 1] : undefined,
  };
}
