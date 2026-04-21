import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TraasCasePage } from "@/components/cases/TraasCasePage";
import { getTraasCase } from "@/data/cases/traasCases";

export const metadata: Metadata = {
  title: "Tech Bootcamp — TraaS",
  description:
    "Интенсивная программа развития ИТ-лидеров. 23 компании, NPS 77.8%, рост компетенций +23%.",
  openGraph: {
    title: "Tech Bootcamp — как вырастить ИТ-лидера за 5 дней",
    description: "Кейс TraaS: интенсивное обучение для CTO и ИТ-директоров крупных компаний.",
  },
};

export default function TechBootcampCasePage() {
  const caseItem = getTraasCase("tech-bootcamp");
  if (!caseItem) notFound();
  return <TraasCasePage caseItem={caseItem} />;
}
