/** Темы обращения — согласованы с разделами лендинга TraaS & Camps */
export const CONTACT_TOPICS = [
  {
    value: "assessment",
    label: "Оценка готовности: ИИ, процессы, ИТ-ландшафт",
  },
  {
    value: "project",
    label: "Сопровождение проекта после оценки",
  },
  {
    value: "cases",
    label: "Кейсы и внедрение в команде",
  },
  {
    value: "other",
    label: "Другой вопрос",
  },
] as const;

export type ContactTopicValue = (typeof CONTACT_TOPICS)[number]["value"];
