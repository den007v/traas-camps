"use client";

import { useRef } from "react";
import type { AssessmentVariant } from "@/types/content";
import { useNeuralNetCanvas } from "./useNeuralNetCanvas";
import { useDataGridCanvas } from "./useDataGridCanvas";
import { useItArchCanvas } from "./useItArchCanvas";

function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useNeuralNetCanvas(ref);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ zIndex: 0, pointerEvents: "none" }} aria-hidden />;
}

function DataGridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useDataGridCanvas(ref);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ zIndex: 0, pointerEvents: "none" }} aria-hidden />;
}

function ItArchCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useItArchCanvas(ref);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ zIndex: 0, pointerEvents: "none" }} aria-hidden />;
}

export function DiagnosticCardCanvas({ variant }: { variant: AssessmentVariant }) {
  if (variant === "ai") return <NeuralCanvas />;
  if (variant === "digital") return <DataGridCanvas />;
  return <ItArchCanvas />;
}
