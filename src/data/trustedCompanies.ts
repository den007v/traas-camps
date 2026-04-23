export type TrustedCompany = {
  readonly id: string;
  readonly name: string;
  /**
   * Временные логотипы через Clearbit Logo API (по домену компании).
   * Для продакшена замените на свои файлы в `/public/images/...` или CDN.
   */
  readonly logoUrl: string;
};

function logoFromDomain(domain: string): string {
  return `https://logo.clearbit.com/${encodeURIComponent(domain)}`;
}

export const trustedCompanies: TrustedCompany[] = [
  { id: "medsi", name: "МЕДСИ", logoUrl: logoFromDomain("medsi.ru") },
  { id: "segezha", name: "Segezha Group", logoUrl: logoFromDomain("segezha.com") },
  { id: "sistema", name: "АФК Система", logoUrl: logoFromDomain("sistema.ru") },
  { id: "mts", name: "МТС", logoUrl: logoFromDomain("mts.ru") },
  { id: "ozon", name: "Ozon", logoUrl: logoFromDomain("ozon.ru") },
  { id: "sber", name: "Сбер", logoUrl: logoFromDomain("sber.ru") },
  { id: "x5", name: "X5 Group", logoUrl: logoFromDomain("x5.ru") },
  { id: "rosatom", name: "Росатом", logoUrl: logoFromDomain("rosatom.ru") },
  { id: "vk", name: "VK", logoUrl: logoFromDomain("vk.com") },
  { id: "sibur", name: "Сибур", logoUrl: logoFromDomain("sibur.ru") },
];
