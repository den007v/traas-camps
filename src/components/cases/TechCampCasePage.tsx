import { CasesCtaPanel } from "@/components/tech-bootcamp/CasesCtaPanel";
import { CaseRevealProvider } from "@/components/cases/CaseRevealProvider";
import { CaseReadingProgress } from "@/components/cases/CaseProgressAndNav";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteContent } from "@/data/siteContent";
import {
  CaseHighlight,
  CaseHero,
  CaseOptionalContext,
  CasePageLayout,
  CaseQuote,
  CaseResults,
  CaseSidePanel,
  CaseTLDR,
  CaseToolsStrip,
} from "@/components/cases/CaseSections";
import type { TechCampCaseRecord } from "@/data/cases/types";

function estimateReadMinutes(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(4, Math.round(words / 220));
}

function splitParagraphs(text: string) {
  return text
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

function isHeading(paragraph: string) {
  return paragraph.length <= 84 && !/[.!?]$/.test(paragraph) && !paragraph.includes("\n");
}

function parseListItems(paragraph: string) {
  const lines = paragraph.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;
  const isList = lines.every((line) => /^([—•-]|\d+[.)])\s*/.test(line));
  if (!isList) return null;
  return lines.map((line) => line.replace(/^([—•-]|\d+[.)])\s*/, ""));
}

export function TechCampCasePage({
  caseItem,
  nextPrev,
}: {
  caseItem: TechCampCaseRecord;
  nextPrev: {
    prev?: { slug: string; title: string };
    next?: { slug: string; title: string };
  };
}) {
  const readTime = estimateReadMinutes(caseItem.fullText);
  const paragraphs = splitParagraphs(caseItem.fullText);
  const { sections, headingIdsByParagraphIndex } = paragraphs.reduce<{
    sections: { id: string; title: string }[];
    headingIdsByParagraphIndex: Map<number, string>;
  }>(
    (acc, paragraph, idx) => {
      if (!isHeading(paragraph)) return acc;
      const id = `case-section-${acc.sections.length + 1}`;
      acc.headingIdsByParagraphIndex.set(idx, id);
      acc.sections.push({ id, title: paragraph });
      return acc;
    },
    {
      sections: [],
      headingIdsByParagraphIndex: new Map<number, string>(),
    },
  );

  return (
    <CasePageLayout>
      <CaseReadingProgress />
      <CaseRevealProvider />
      <SiteHeader
        content={siteContent}
        currentPageLabel="Кейс Tech Bootcamp"
        backHref="/tech-bootcamp"
      />
      <main className="mx-auto w-full max-w-[1120px] px-4 py-7 sm:px-6 sm:py-9">
        <CaseHero caseItem={caseItem} readTime={readTime} />
        <CaseTLDR items={caseItem.tldr} />
        <CaseToolsStrip tools={caseItem.tools} />

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article
            data-case-reveal
            className="opacity-0 translate-y-4 transition duration-700 min-w-0 max-w-3xl"
          >
            <div className="space-y-3.5">
              {paragraphs.map((paragraph, idx) => {
                const listItems = parseListItems(paragraph);
                if (listItems) {
                  return (
                    <ul key={`${idx}-list`} className="space-y-1.5 pl-5 text-[15px] leading-7 text-[var(--foreground)]/92">
                      {listItems.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (caseItem.quoteMarkers?.some((marker) => paragraph.includes(marker))) {
                  return <CaseQuote key={`${idx}-quote`} text={paragraph} />;
                }

                if (caseItem.highlightMarkers?.some((marker) => paragraph.includes(marker))) {
                  return <CaseHighlight key={`${idx}-highlight`} text={paragraph} />;
                }

                if (isHeading(paragraph)) {
                  return (
                    <h2
                      key={`${idx}-heading`}
                      id={headingIdsByParagraphIndex.get(idx)}
                      className="mt-8 border-b border-[#e30613]/40 pb-2 text-2xl font-semibold leading-tight sm:text-[30px]"
                    >
                      {paragraph}
                    </h2>
                  );
                }

                return (
                  <p key={`${idx}-p`} className="text-[15px] leading-7 text-[var(--foreground)]/92 sm:text-[16px]">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>

          <CaseSidePanel tools={caseItem.tools} sections={sections} nextPrev={nextPrev} />
        </section>

        <CaseResults items={caseItem.results} />
        <CaseOptionalContext items={caseItem.optionalContext ?? []} />

        <div className="mt-10">
          <CasesCtaPanel
            backHref="/tech-bootcamp/cases"
            title={caseItem.cta.title}
            text={caseItem.cta.text}
            buttonLabel={caseItem.cta.buttonLabel}
          />
        </div>
      </main>
    </CasePageLayout>
  );
}
