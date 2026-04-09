export type AnswerOption = {
  id: string;
  text: string;
  value: string;
  score?: 1 | 2 | 3 | 4;
};

export type AssessmentQuestionItem = {
  id: string;
  text: string;
  options: AnswerOption[];
};

export type ProfileQuestion = {
  id: "role" | "companySize" | "industry" | "primaryChallenge";
  text: string;
  options: AnswerOption[];
};

export const profileQuestions: ProfileQuestion[] = [
  {
    id: "role",
    text: "Ваша роль в компании",
    options: [
      { id: "A", value: "ceo_founder", text: "CEO / Основатель" },
      { id: "B", value: "cto_cio", text: "CTO / CIO / CDO" },
      { id: "C", value: "head_unit", text: "Руководитель функции / направления" },
      { id: "D", value: "manager_expert", text: "Менеджер / эксперт команды" },
      { id: "E", value: "other", text: "Другое" },
    ],
  },
  {
    id: "companySize",
    text: "Размер компании",
    options: [
      { id: "A", value: "lt_100", text: "До 100 сотрудников" },
      { id: "B", value: "100_500", text: "100–500 сотрудников" },
      { id: "C", value: "500_2000", text: "500–2000 сотрудников" },
      { id: "D", value: "gt_2000", text: "Более 2000 сотрудников" },
      { id: "E", value: "other", text: "Другое" },
    ],
  },
  {
    id: "industry",
    text: "Отрасль компании",
    options: [
      { id: "A", value: "finance", text: "Финансы / страхование" },
      { id: "B", value: "retail_ecom", text: "Ритейл / eCommerce / FMCG" },
      { id: "C", value: "industrial_energy", text: "Промышленность / энергетика / логистика" },
      { id: "D", value: "it_telecom_other", text: "IT / телеком / другие услуги" },
      { id: "E", value: "other", text: "Другое" },
    ],
  },
  {
    id: "primaryChallenge",
    text: "Что сейчас главный барьер для AI-трансформации?",
    options: [
      { id: "A", value: "strategy_prioritization", text: "Нет ясной стратегии и приоритизации кейсов" },
      { id: "B", value: "data_quality", text: "Низкое качество данных и интеграций" },
      { id: "C", value: "team_skills", text: "Нехватка команды и компетенций" },
      { id: "D", value: "infra_governance", text: "Ограничения инфраструктуры и governance" },
      { id: "E", value: "other", text: "Другое" },
    ],
  },
];

export type ReadinessLevel = {
  id: "initial" | "developing" | "mature" | "advanced";
  min: number;
  max: number;
  title: string;
  color: string;
  description: string;
  insights: string[];
  ctaText: string;
  ctaLabel: string;
};

const baseAiReadinessQuestions: AssessmentQuestionItem[] = [
  {
    id: "q1",
    text: "Насколько чётко в вашей компании сформулирована стратегия применения ИИ?",
    options: [
      { id: "A", value: "a", score: 1, text: "Нет никакой стратегии, ИИ — это пока разговоры" },
      { id: "B", value: "b", score: 2, text: "Есть отдельные инициативы, но единой стратегии нет" },
      { id: "C", value: "c", score: 3, text: "Стратегия формируется, есть первые приоритеты" },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "Чёткая стратегия утверждена и интегрирована в бизнес-план",
      },
    ],
  },
  {
    id: "q2",
    text: "Как организованы данные в вашей компании?",
    options: [
      { id: "A", value: "a", score: 1, text: "Данные разрознены, нет единой системы" },
      {
        id: "B",
        value: "b",
        score: 2,
        text: "Есть отдельные хранилища, но они не связаны между собой",
      },
      {
        id: "C",
        value: "c",
        score: 3,
        text: "Данные централизованы, ведётся работа по качеству и доступности",
      },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "Единая платформа данных, высокое качество, данные доступны для моделей",
      },
    ],
  },
  {
    id: "q3",
    text: "Есть ли у вас команда или экспертиза для работы с ИИ внутри компании?",
    options: [
      { id: "A", value: "a", score: 1, text: "Нет, этим никто не занимается системно" },
      { id: "B", value: "b", score: 2, text: "Есть один-два энтузиаста, но без структуры" },
      { id: "C", value: "c", score: 3, text: "Есть небольшая команда или приглашённые эксперты" },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "Выстроена полноценная AI/ML-команда с чёткими задачами",
      },
    ],
  },
  {
    id: "q4",
    text: "Как ваши бизнес-процессы готовы к интеграции ИИ-инструментов?",
    options: [
      { id: "A", value: "a", score: 1, text: "Процессы не описаны, работа ведётся хаотично" },
      { id: "B", value: "b", score: 2, text: "Основные процессы описаны, но не оцифрованы" },
      {
        id: "C",
        value: "c",
        score: 3,
        text: "Процессы оцифрованы, в ряде мест есть автоматизация",
      },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "Процессы зрелые и автоматизированные, готовы к внедрению ИИ поверх",
      },
    ],
  },
  {
    id: "q5",
    text: "Насколько руководство вашей компании поддерживает ИИ-трансформацию?",
    options: [
      {
        id: "A",
        value: "a",
        score: 1,
        text: "Нет интереса или есть скептицизм на уровне топ-менеджмента",
      },
      {
        id: "B",
        value: "b",
        score: 2,
        text: "Есть точечный интерес, но без выделенных ресурсов и решений",
      },
      {
        id: "C",
        value: "c",
        score: 3,
        text: "Один-два руководителя активно поддерживают и продвигают тему",
      },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "ИИ-трансформация — приоритет на уровне CEO / CTO / совета директоров",
      },
    ],
  },
  {
    id: "q6",
    text: "Используете ли вы уже какие-то ИИ-инструменты в работе?",
    options: [
      { id: "A", value: "a", score: 1, text: "Нет, не используем ничего" },
      {
        id: "B",
        value: "b",
        score: 2,
        text: "Используем базовые инструменты (ChatGPT, Copilot) точечно",
      },
      {
        id: "C",
        value: "c",
        score: 3,
        text: "Есть пилоты или внедрённые решения в отдельных подразделениях",
      },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "ИИ-инструменты работают в нескольких ключевых процессах, есть измеримый эффект",
      },
    ],
  },
  {
    id: "q7",
    text: "Насколько сотрудники готовы работать с ИИ-инструментами?",
    options: [
      {
        id: "A",
        value: "a",
        score: 1,
        text: "Низкая цифровая грамотность, есть сопротивление изменениям",
      },
      { id: "B", value: "b", score: 2, text: "Часть сотрудников готова, большинство — нет" },
      {
        id: "C",
        value: "c",
        score: 3,
        text: "Проводятся обучения, большинство сотрудников открыты к изменениям",
      },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "Культура экспериментирования: сотрудники сами инициируют ИИ-решения",
      },
    ],
  },
  {
    id: "q8",
    text: "Есть ли у вас понимание, где ИИ даст наибольший эффект в вашем бизнесе?",
    options: [
      { id: "A", value: "a", score: 1, text: "Нет, не понимаем, с чего начать" },
      { id: "B", value: "b", score: 2, text: "Есть общие идеи, но без оценки приоритетов" },
      {
        id: "C",
        value: "c",
        score: 3,
        text: "Определены два-три приоритетных направления, идёт проработка",
      },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "Есть карта сценариев с оценкой ROI и рисков",
      },
    ],
  },
  {
    id: "q9",
    text: "Как вы оцениваете зрелость вашей ИТ-инфраструктуры для ИИ-задач?",
    options: [
      { id: "A", value: "a", score: 1, text: "Устаревшая инфраструктура, нет облачных решений" },
      { id: "B", value: "b", score: 2, text: "Частичная облачная миграция, есть узкие места" },
      {
        id: "C",
        value: "c",
        score: 3,
        text: "Современная инфраструктура, облако используется, есть ограничения",
      },
      {
        id: "D",
        value: "d",
        score: 4,
        text: "Гибкая, масштабируемая инфраструктура, готова к ИИ-нагрузкам",
      },
    ],
  },
];

export const aiReadinessQuestions: AssessmentQuestionItem[] = baseAiReadinessQuestions.map(
  (question) => ({
    ...question,
    options: [
      ...question.options,
      {
        id: "E",
        value: "unknown",
        score: 2,
        text: "Затрудняюсь ответить / нужно уточнение",
      },
    ],
  }),
);

export const readinessLevels: ReadinessLevel[] = [
  {
    id: "initial",
    min: 9,
    max: 15,
    title: "Фундамент ещё строится",
    color: "#e30613",
    description:
      "У компании есть интерес к ИИ, но системной базы пока не хватает. Ключевая задача — выстроить опорную архитектуру: приоритеты, данные, роли и первые управляемые пилоты.",
    insights: [
      "Стратегия и карта инициатив пока не зафиксированы на уровне бизнеса.",
      "Данные и инфраструктура не обеспечивают стабильный запуск AI-сценариев.",
      "Нужен короткий план из 2-3 пилотов с понятными метриками эффекта.",
    ],
    ctaText:
      "Разберём вашу ситуацию вместе — запишитесь на бесплатную 30-минутную диагностику",
    ctaLabel: "Записаться на диагностику",
  },
  {
    id: "developing",
    min: 16,
    max: 22,
    title: "Движение есть, направление нужно уточнить",
    color: "#d7a21f",
    description:
      "У вас уже есть активность в теме ИИ, но она фрагментарна. Чтобы ускориться, важно синхронизировать приоритеты между бизнесом, ИТ и командами внедрения.",
    insights: [
      "Есть пилоты и гипотезы, но не хватает единой модели принятия решений.",
      "Часть сотрудников готова к изменениям, часть — требует дообучения и сопровождения.",
      "Нужна связка ROI, рисков и технологической исполнимости по сценариям.",
    ],
    ctaText:
      "Покажем, с каких шагов начать и какие инициативы дадут эффект быстрее",
    ctaLabel: "Обсудить план действий",
  },
  {
    id: "mature",
    min: 23,
    max: 29,
    title: "Хорошая база — важно не упустить темп",
    color: "#2ea36b",
    description:
      "Фундамент уже сформирован: есть зрелость данных, процессов и команд. Следующий шаг — системное масштабирование практик и ускорение time-to-value.",
    insights: [
      "Текущая база позволяет быстро масштабировать успешные кейсы.",
      "Узкие места часто лежат в управлении портфелем инициатив и приоритизации.",
      "Стоит усилить governance и контроль эффекта на уровне бизнес-метрик.",
    ],
    ctaText:
      "Вы близко к точке масштабирования — давайте оценим, что тормозит",
    ctaLabel: "Получить экспертную оценку",
  },
  {
    id: "advanced",
    min: 30,
    max: 36,
    title: "Вы готовы — вопрос в том, как ускориться",
    color: "#7b5cff",
    description:
      "Компания находится в продвинутой зоне зрелости. Главная ценность сейчас — ускорение масштабирования и переход к управлению AI-трансформацией как системной функцией бизнеса.",
    insights: [
      "База позволяет запускать сложные сценарии с высоким бизнес-эффектом.",
      "Решающим фактором становится скорость масштабирования и управленческий ритм.",
      "Нужна дорожная карта следующего уровня: портфель, платформа, people-траектория.",
    ],
    ctaText:
      "Вы готовы к серьёзным шагам — поговорим о дорожной карте TraaS",
    ctaLabel: "Обсудить дорожную карту",
  },
];

export function getReadinessLevel(totalScore: number) {
  return (
    readinessLevels.find(
      (level) => totalScore >= level.min && totalScore <= level.max,
    ) ?? readinessLevels[0]
  );
}

export type RadarAxisPoint = {
  axis: string;
  value: number;
};

export function buildRadarData(scoresByQuestion: number[]): RadarAxisPoint[] {
  const byIndex = (idx: number) => scoresByQuestion[idx] ?? 1;
  const avg = (values: number[]) =>
    values.reduce((sum, value) => sum + value, 0) / values.length;

  return [
    { axis: "Стратегия ИИ", value: avg([byIndex(0), byIndex(7)]) },
    { axis: "Данные и инфраструктура", value: avg([byIndex(1), byIndex(8)]) },
    { axis: "Команда и экспертиза", value: byIndex(2) },
    { axis: "Процессы", value: byIndex(3) },
    { axis: "Культура и люди", value: avg([byIndex(4), byIndex(6)]) },
    { axis: "Применение ИИ", value: byIndex(5) },
  ];
}
