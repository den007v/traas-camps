export const techBootcampContent = {
  nav: [
    { label: "Программа", href: "#program" },
    { label: "Для кого", href: "#audience" },
    { label: "Результаты", href: "#results" },
    { label: "Стоимость", href: "#pricing" },
  ],
  hero: {
    badge: "Программа для технологических лидеров",
    title: "Из технического эксперта —\nв стратегического лидера",
    subtitle:
      "2-недельный интенсив для CTO, CIO и Tech Lead. 70% практики, защита реальных кейсов, выездной формат.",
    metrics: [
      { value: "77.8%", label: "NPS" },
      { value: "+26%", label: "Коэффициент роста компетенций" },
      { value: "9.1 / 10", label: "Средняя оценка программы" },
    ],
  },
  socialProof: [
    "МТС",
    "Segezha Group",
    "Aqua Holding",
    "NATURA SIBERICA",
    "Cosmos Hotel Group",
    "PLACEHOLDER: добавить полный список компаний",
  ],
  audienceCards: [
    {
      icon: "⌘",
      title: "CTO и CIO",
      text: "Руководители, ответственные за технологическую стратегию компании. Управляют командами от 50+ человек.",
    },
    {
      icon: "↗",
      title: "CIO-1 / CTO-1",
      text: "Следующие в очереди на позицию технологического лидера. Готовятся к переходу на следующий уровень.",
    },
    {
      icon: "</>",
      title: "Tech Lead",
      text: "Опытные технические руководители, которые хотят выйти за рамки технической экспертизы в управление и стратегию.",
    },
  ],
  challenges: [
    "AI и LLM меняют стек быстрее, чем обновляются компетенции",
    "DevOps и SRE требуют системного мышления, а не точечных навыков",
    "Бизнес ждёт от CTO стратегических решений, а не технических ответов",
    "Команды растут — нужны управленческие и soft skills нового уровня",
  ],
  formatFacts: [
    { value: "2 недели", description: "Интенсивный выездной формат с полным погружением" },
    { value: "70% практики", description: "Кейсы, воркшопы, защиты — не лекции" },
    { value: "до 350 часов", description: "Полная программа включая вечерние сессии" },
    { value: "23 участника", description: "Закрытый поток, уровень — только senior" },
  ],
  timeline: [
    "09:00 — Утренний блок: теория и разбор контекста",
    "11:00 — Практический воркшоп / кейс-сессия",
    "13:00 — Обед + нетворкинг",
    "14:00 — Командная работа / защита решений",
    "17:00 — Экспертная сессия / guest speaker",
    "20:00 — Soft skills / стратегические игры",
  ],
  weekOneModules: [
    "Технологические тренды и стратегия",
    "Архитектура: Cloud Native, ArchOps",
    "Продуктовое мышление: VPC, Lean Canvas, CustDev",
    "От идеи до MVP: Discovery, PoC, Product Vision Board",
    "Event Storming, OKR/KPI/4DX",
    "Design Thinking",
  ],
  weekTwoModules: [
    "Soft skills: управление командой, коммуникация",
    "DevOps: культура, инструменты, DevSecOps",
    "Надёжность: SLA/SLO/SLI, blameless culture, postmortem",
    "AI и LLM: практическое применение",
    "Цифровизация: RPA, Process Mining",
    "BCM, BCP/DRP (управление непрерывностью)",
    "Стратегия и Change Management",
    "Soft skills: Management 3.0",
  ],
  competencies: [
    { name: "Strategy", before: 42, after: 76 },
    { name: "Product Mgmt", before: 38, after: 71 },
    { name: "Architecture", before: 50, after: 79 },
    { name: "Dev", before: 56, after: 82 },
    { name: "DevOps", before: 40, after: 74 },
    { name: "Agile", before: 44, after: 77 },
    { name: "QA", before: 49, after: 73 },
    { name: "SRE", before: 35, after: 72 },
  ],
  quotes: [
    {
      text: "PLACEHOLDER: реальная цитата участника о стратегическом сдвиге после программы.",
      author: "Участник программы, CTO, крупная tech-компания",
    },
    {
      text: "PLACEHOLDER: реальная цитата о росте управленческих компетенций.",
      author: "Участник программы, CIO, enterprise-компания",
    },
  ],
  speakers: [
    "PLACEHOLDER: Имя Фамилия — Эксперт программы, МТС / MWS",
    "PLACEHOLDER: Имя Фамилия — Приглашённый эксперт",
    "PLACEHOLDER: Имя Фамилия — CTO, индустриальная компания",
    "PLACEHOLDER: Имя Фамилия — Руководитель направления",
  ],
  pricing: [
    { name: "Базовый", price: "12 000 000 ₽", items: ["PLACEHOLDER: состав пакета"] },
    {
      name: "Стандарт",
      price: "14 000 000 ₽",
      items: ["PLACEHOLDER: состав пакета"],
      featured: true,
    },
    { name: "Расширенный", price: "22 000 000 ₽", items: ["PLACEHOLDER: состав пакета"] },
  ],
} as const;
