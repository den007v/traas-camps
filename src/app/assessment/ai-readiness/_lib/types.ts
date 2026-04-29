export type DomainKey =
  | "ownership"
  | "use_cases"
  | "data"
  | "platform"
  | "governance"
  | "adoption"
  | "economics"
  | "experience";

export interface Domain {
  key: DomainKey;
  label: string;
  weight: number;
  hardCap?: number;
}

export interface AnswerOption {
  score: 0 | 1 | 2 | 3;
  label: string;
}

export interface ProfileAnswerOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  domain: DomainKey;
  text: string;
  hint?: string;
  options: AnswerOption[];
}

export interface ProfileQuestion {
  id: "role" | "companySize";
  label: string;
  text: string;
  hint?: string;
  options: ProfileAnswerOption[];
}

export interface Answers {
  [questionId: string]: number;
}

export type ProfileAnswers = Partial<Record<ProfileQuestion["id"], string>>;

export type ProfileKey =
  | "fragmented"
  | "pilot_ready"
  | "managed_scaling"
  | "platform_ready";

export interface ScoreResult {
  rawScore: number;
  finalScore: number;
  hardCapTriggered: boolean;
  domainScores: {
    [key in DomainKey]?: {
      raw: number;
      max: number;
      pct: number;
      level: "low" | "mid" | "high";
    };
  };
  profile: ProfileKey;
  topBlockers: DomainKey[];
}

export type ScreenState =
  | { kind: "intro" }
  | { kind: "profile"; index: number }
  | { kind: "question"; index: number }
  | { kind: "result" };

export interface LeadFormData {
  email: string;
  name?: string;
  company?: string;
  marketingOptIn: boolean;
}

export type ProfileContent = {
  title: string;
  subtitle: string;
  description: string;
  marketContext: string;
  riskAndOpportunity: {
    risk: string;
    opportunity: string;
  };
  warnings: string[];
  color: string;
  bgTint: string;
  border: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
};

export type BlockerContent = {
  title: string;
  whatHappens: string;
  industryContext: string;
  consequences: string;
  firstStep: string;
  effort: string;
};

export interface BenchmarkData {
  id: string;
  metric: string;
  value: string;
  description: string;
  source: string;
}

export interface PitfallContent {
  title: string;
  description: string;
  industryNote: string;
}

export interface RoadmapMonth {
  month: number;
  title: string;
  activities: string[];
  deliverables: string[];
}
