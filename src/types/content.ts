export type Publication = {
  id: string;
  categoryName: string;
  title: string;
  subTitle: string;
  date: string;
  readTime: string;
  href: string;
};

export type Checkup = {
  id: string;
  title: string;
  description: string;
  outcomes?: string[];
  ctaLabel?: string;
  href?: string;
  meta?: string;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  href?: string;
};

export type AssessmentVariant = "ai" | "digital" | "tech";

export type QuickNavCard = {
  id: string;
  /** Короткий заголовок на обороте карточки */
  title: string;
  /** Единый заголовок на лицевой стороне */
  frontTitle: string;
  description: string;
  /** Доп. пункты на обороте */
  backPoints?: string[];
  href: string;
  variant: AssessmentVariant;
};

export type FeatureRow = {
  id: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  imageSide: "left" | "right";
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  topBanner?: string;
  brandName: string;
  headerNav: { label: string; href: string }[];
  headerCta: { label: string; href: string };
  hero: {
    eyebrow?: string;
    title: string;
    subtitleUnderTitle?: string;
    subtitle: string;
    /** Строка ссылок под описанием (как в референсе). */
    links?: { label: string; href: string }[];
  };
  quickNavIntro: { title: string; description: string };
  quickNav: QuickNavCard[];
  checkupsIntro: { title: string; subtitle?: string };
  checkups: Checkup[];
  featureRows: FeatureRow[];
  servicesIntro: { title: string; subtitle: string };
  services: Service[];
  publicationsIntro: { title: string; subtitle: string };
  publications: Publication[];
  footer: {
    tagline: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    legal: string;
    contacts: { label: string; value: string; href?: string }[];
  };
};
