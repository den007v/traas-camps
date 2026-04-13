import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TraasCasePage } from "@/components/cases/TraasCasePage";
import { getTraasCase, traasCases } from "@/data/cases/traasCases";

export function generateStaticParams() {
  return traasCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getTraasCase(slug);
  if (!caseItem) {
    return { title: "Кейс не найден" };
  }
  return {
    title: `${caseItem.title} — Кейсы TraaS`,
    description: caseItem.subtitle,
  };
}

export default async function TraasCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseItem = getTraasCase(slug);
  if (!caseItem) notFound();
  return <TraasCasePage caseItem={caseItem} />;
}
