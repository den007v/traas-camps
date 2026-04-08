export type CaseMetric = { value: string; label: string };
export type CaseTLDRItem = { label: string; text: string };
export type CaseResultItem = { value: string; label: string };

export type TechCampCaseRecord = {
  slug: string;
  title: string;
  subtitle: string;
  heroBadge: string;
  coverTag: string;
  domain: string;
  person: {
    name: string;
    role: string;
    company: string;
  };
  metrics: CaseMetric[];
  tldr: CaseTLDRItem[];
  results: CaseResultItem[];
  tools: string[];
  optionalContext?: string[];
  fullText: string;
  quoteMarkers?: string[];
  highlightMarkers?: string[];
  cta: {
    title: string;
    text: string;
    buttonLabel: string;
  };
};
