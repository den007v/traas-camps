import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TraasCasePage } from "@/components/cases/TraasCasePage";
import { getTraasCase } from "@/data/cases/traasCases";

export const metadata: Metadata = {
  title: "Диагностика ИТ-блока крупной медицинской сети | TraaS",
  description:
    "Как TraaS провела полную диагностику технологической зрелости ИТ-блока одной из крупнейших частных медицинских сетей России и сформировала приоритетный портфель инициатив на 1,5 года.",
};

export default function MedsiItDiagnosticPage() {
  const caseItem = getTraasCase("medsi-it-diagnostic");
  if (!caseItem) notFound();
  return <TraasCasePage caseItem={caseItem} />;
}
