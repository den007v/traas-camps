import type { Domain, ProfileQuestion, Question } from "./types";

export const DOMAINS: Domain[] = [
  { key: "ownership", label: "Ownership и mandate", weight: 0.15, hardCap: 49 },
  { key: "use_cases", label: "Use case selection", weight: 0.15, hardCap: 59 },
  { key: "data", label: "Data readiness", weight: 0.2, hardCap: 59 },
  { key: "platform", label: "Platform и delivery", weight: 0.15, hardCap: 69 },
  { key: "governance", label: "Governance и risk", weight: 0.15, hardCap: 69 },
  { key: "adoption", label: "Adoption и change", weight: 0.1 },
  { key: "economics", label: "Economics и value", weight: 0.1 },
  { key: "experience", label: "Опыт и результат", weight: 0 },
];

export const PROFILE_QUESTIONS: ProfileQuestion[] = [
  {
    id: "role",
    label: "Контекст",
    text: "Какая роль у вас в компании?",
    hint: "Это не влияет на результат диагностики, но помогает нам понимать, кто проходит тест и как разные роли оценивают готовность к ИИ.",
    options: [
      { value: "ceo_founder", label: "CEO / основатель / генеральный директор" },
      { value: "cto_cio_cdo", label: "CTO / CIO / CDO / руководитель ИТ или данных" },
      { value: "business_unit", label: "Руководитель бизнес-функции или направления" },
      { value: "hr_transformation", label: "HR / обучение / трансформация / стратегия" },
      { value: "manager_expert", label: "Менеджер, эксперт или проектный лидер" },
      { value: "other", label: "Другая роль" },
    ],
  },
  {
    id: "companySize",
    label: "Контекст",
    text: "Какого размера ваша компания?",
    hint: "Размер компании помогает корректнее интерпретировать ответы: зрелость ИИ в команде на 100 человек и в группе на 10 000 человек устроена по-разному.",
    options: [
      { value: "up_to_100", label: "До 100 сотрудников" },
      { value: "100_500", label: "100–500 сотрудников" },
      { value: "500_2000", label: "500–2 000 сотрудников" },
      { value: "2000_10000", label: "2 000–10 000 сотрудников" },
      { value: "10000_plus", label: "Более 10 000 сотрудников" },
      { value: "not_sure", label: "Затрудняюсь ответить / не применимо" },
    ],
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1_ownership",
    domain: "ownership",
    text: "Кто в вашей компании владеет портфелем ИИ-инициатив?",
    hint: "Под «владельцем» понимаем не идеолога, а человека с управленческим мандатом — с правом приоритизировать, останавливать и перезапускать инициативы.",
    options: [
      { score: 0, label: "Единого владельца нет, инициативы запускаются ситуативно" },
      { score: 1, label: "Владельцы появляются под отдельные пилоты, но не на уровне портфеля" },
      { score: 2, label: "Владелец портфеля назначен формально, но регулярного review нет" },
      { score: 3, label: "Есть владелец, регулярный portfolio review и понятный decision path" },
    ],
  },
  {
    id: "q2_use_cases",
    domain: "use_cases",
    text: "Как у вас выбираются ИИ use case'ы для пилотов?",
    hint: "Речь не про «есть ли идеи», а про процесс отбора: что попадает в пилот, что отсекается и почему.",
    options: [
      { score: 0, label: "Use case'ы пока не выбраны" },
      { score: 1, label: "Выбираем по интересу команд или по обращениям бизнеса" },
      { score: 2, label: "Есть shortlist, но без baseline-метрик и критериев go/no-go" },
      { score: 3, label: "Есть shortlist, baseline-метрики и критерий go/no-go до старта" },
    ],
  },
  {
    id: "q3_data",
    domain: "data",
    text: "Насколько готовы данные для приоритетного ИИ use case?",
    hint: "По нашему опыту, большинство пилотов умирает не из-за алгоритмов, а из-за неготовности данных.",
    options: [
      { score: 0, label: "Источники данных не определены, качество не проверялось" },
      { score: 1, label: "Источники известны, но доступ к данным нестабилен" },
      { score: 2, label: "Доступ есть, но ownership и качество данных формально не закреплены" },
      { score: 3, label: "Подтверждены доступ, владелец данных и базовое качество" },
    ],
  },
  {
    id: "q4_platform",
    domain: "platform",
    text: "Что в вашей ИТ-платформе уже готово к запуску ИИ-решений в продакшен?",
    hint: "Имеется в виду не один пилот «на ноутбуке», а возможность вывести модель в эксплуатацию: интеграции, мониторинг, обновление.",
    options: [
      { score: 0, label: "Нет ни облачной инфраструктуры, ни инструментов работы с моделями" },
      { score: 1, label: "Есть базовое облако, но нет инструментов для ML и интеграций" },
      { score: 2, label: "Есть среда для прототипов, но MLOps и мониторинг моделей отсутствуют" },
      { score: 3, label: "Есть полноценный конвейер: CI/CD, мониторинг моделей, путь до продакшен" },
    ],
  },
  {
    id: "q5_governance",
    domain: "governance",
    text: "Как у вас проходит review privacy/security для ИИ-инициатив?",
    hint: "Этот вопрос становится критичным при выходе из пилота. Если процесс не выстроен, риск — застрять между прототипом и production.",
    options: [
      { score: 0, label: "Процесса review нет, риски не оцениваются заранее" },
      { score: 1, label: "Риски смотрим уже после готового прототипа" },
      { score: 2, label: "Review проводится, но не встроен в этап отбора инициатив" },
      { score: 3, label: "Privacy/security review встроен в процесс с момента отбора use case" },
    ],
  },
  {
    id: "q6_adoption",
    domain: "adoption",
    text: "Как вы планируете внедрение ИИ-решений в работу команд?",
    hint: "Без плана adoption даже хорошие модели остаются «в бэкграунде». Эффект приходит только когда люди начинают пользоваться.",
    options: [
      { score: 0, label: "План внедрения не предусмотрен" },
      { score: 1, label: "Рассчитываем на естественное использование сотрудниками" },
      { score: 2, label: "Есть владелец внедрения и обучение пользователей" },
      { score: 3, label: "Есть владелец, enablement-план, поддержка и измерение реального использования" },
    ],
  },
  {
    id: "q7_economics",
    domain: "economics",
    text: "Как вы оцениваете экономику ИИ-инициатив?",
    hint: "Опыт TraaS на проектах Медси и Сегежи показывает: без честной оценки cost-to-scale пилот может быть успешным, а масштабирование — нет.",
    options: [
      { score: 0, label: "Экономику не считаем, ROI не моделируем" },
      { score: 1, label: "Оцениваем эффект только качественно" },
      { score: 2, label: "Считаем эффект пилота, но без оценки cost-to-scale" },
      { score: 3, label: "Считаем baseline, ROI пилота и cost-to-scale до решения о масштабировании" },
    ],
  },
  {
    id: "q8_experience",
    domain: "experience",
    text: "Что у вас уже работает в продакшене с использованием ИИ или ML?",
    hint: "Считаем только то, что реально используется бизнесом, а не остановленные эксперименты.",
    options: [
      { score: 0, label: "Пока ничего, есть только планы" },
      { score: 1, label: "Был один эксперимент, до продакшена не дошёл" },
      { score: 2, label: "1–2 решения работают в ограниченном масштабе" },
      { score: 3, label: "Несколько внедрений с измеримым бизнес-эффектом" },
    ],
  },
];

export function getDomain(key: Domain["key"]) {
  const domain = DOMAINS.find((item) => item.key === key);
  if (!domain) {
    throw new Error(`Unknown domain: ${key}`);
  }
  return domain;
}

export function getProfileAnswerLabel(questionId: ProfileQuestion["id"], value?: string) {
  if (!value) return null;
  const question = PROFILE_QUESTIONS.find((item) => item.id === questionId);
  return question?.options.find((option) => option.value === value)?.label ?? value;
}
