import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TechCampCasePage } from "@/components/cases/TechCampCasePage";
import {
  getAdjacentTechCampCases,
  getTechCampCase,
  techCampCases,
} from "@/data/cases/cases";

export function generateStaticParams() {
  return techCampCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getTechCampCase(slug);
  if (!caseItem) {
    return { title: "Кейс не найден" };
  }
  return {
    title: `${caseItem.title} — Tech Bootcamp`,
    description: caseItem.subtitle,
  };
}

export default async function TechBootcampCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseItem = getTechCampCase(slug);
  if (!caseItem) notFound();
  const { prev, next } = getAdjacentTechCampCases(slug);
  return <TechCampCasePage caseItem={caseItem} nextPrev={{ prev, next }} />;
}
