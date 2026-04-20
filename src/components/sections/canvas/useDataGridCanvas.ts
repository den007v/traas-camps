"use client";

import { useCallback, useEffect, useRef } from "react";
import type { RefObject } from "react";
import { easeInOutCubic, lerp, useCanvasResize } from "./canvasUtils";

type Dot = {
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  scatterX: number;
  scatterY: number;
};

type Phase = "scatter" | "gather" | "hold" | "scatter_out";

const SCATTER = 84;
const GATHER = 128;
const HOLD = 120;

export function useDataGridCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef(0);
  const phaseRef = useRef<Phase>("scatter");
  const rafRef = useRef(0);

  const random = (a: number, b: number) => a + Math.random() * (b - a);

  const getGrid = (width: number, height: number) => {
    const cols = 6;
    const rows = 4;
    const padX = width * 0.12;
    const padY = height * 0.18;
    const stepX = (width - padX * 2) / (cols - 1);
    const stepY = (height - padY * 2) / (rows - 1);
    const points: Array<{ x: number; y: number }> = [];
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        points.push({ x: padX + c * stepX, y: padY + r * stepY });
      }
    }
    return { points, cols, rows, padX, padY, stepX, stepY };
  };

  const resetDots = useCallback((width: number, height: number) => {
    const { points } = getGrid(width, height);
    dotsRef.current = points.map(() => {
      const sx = random(0, width);
      const sy = random(0, height);
      return { x: sx, y: sy, fromX: sx, fromY: sy, toX: sx, toY: sy, scatterX: sx, scatterY: sy };
    });
    phaseRef.current = "scatter";
    frameRef.current = 0;
  }, []);

  const setTargets = useCallback((width: number, height: number, toGrid: boolean) => {
    const { points } = getGrid(width, height);
    dotsRef.current.forEach((d, i) => {
      d.fromX = d.x;
      d.fromY = d.y;
      const target = toGrid ? points[i] : { x: random(0, width), y: random(0, height) };
      d.toX = target.x;
      d.toY = target.y;
      d.scatterX = d.fromX;
      d.scatterY = d.fromY;
    });
  }, []);

  useCanvasResize(
    canvasRef,
    useCallback((width, height, ctx) => {
      ctxRef.current = ctx;
      sizeRef.current = { width, height };
      resetDots(width, height);
    }, [resetDots]),
  );

  useEffect(() => {
    const drawGrid = (alpha: number) => {
      const ctx = ctxRef.current;
      const { width, height } = sizeRef.current;
      if (!ctx || alpha <= 0) return;
      const { cols, rows, padX, padY, stepX, stepY } = getGrid(width, height);
      ctx.strokeStyle = `rgba(192,57,43,${alpha * 0.34})`;
      ctx.lineWidth = 0.65;
      for (let r = 0; r < rows; r += 1) {
        ctx.beginPath();
        ctx.moveTo(padX, padY + r * stepY);
        ctx.lineTo(padX + (cols - 1) * stepX, padY + r * stepY);
        ctx.stroke();
      }
      for (let c = 0; c < cols; c += 1) {
        ctx.beginPath();
        ctx.moveTo(padX + c * stepX, padY);
        ctx.lineTo(padX + c * stepX, padY + (rows - 1) * stepY);
        ctx.stroke();
      }
    };

    const draw = () => {
      const ctx = ctxRef.current;
      const { width, height } = sizeRef.current;
      if (!ctx || width <= 0 || height <= 0) return;
      ctx.clearRect(0, 0, width, height);

      frameRef.current += 1;
      const frame = frameRef.current;
      const phase = phaseRef.current;

      let gridAlpha = 0;
      if (phase === "gather") gridAlpha = frame / GATHER;
      if (phase === "hold") gridAlpha = 1;
      if (phase === "scatter_out") gridAlpha = 1 - frame / SCATTER;
      drawGrid(Math.max(0, Math.min(1, gridAlpha)));

      let progress = 0;
      if (phase === "gather") progress = easeInOutCubic(frame / GATHER);
      if (phase === "scatter_out") progress = easeInOutCubic(frame / SCATTER);

      dotsRef.current.forEach((d) => {
        if (phase === "gather" || phase === "scatter_out") {
          d.x = lerp(d.fromX, d.toX, Math.min(1, progress));
          d.y = lerp(d.fromY, d.toY, Math.min(1, progress));
        }
        ctx.fillStyle = "#D45050";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#E05050";
        ctx.beginPath();
        ctx.arc(d.x, d.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      if (phase === "scatter" && frame >= SCATTER) {
        phaseRef.current = "gather";
        frameRef.current = 0;
        setTargets(width, height, true);
      } else if (phase === "gather" && frame >= GATHER) {
        phaseRef.current = "hold";
        frameRef.current = 0;
      } else if (phase === "hold" && frame >= HOLD) {
        phaseRef.current = "scatter_out";
        frameRef.current = 0;
        setTargets(width, height, false);
      } else if (phase === "scatter_out" && frame >= SCATTER) {
        phaseRef.current = "scatter";
        frameRef.current = 0;
      }
    };

    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [setTargets]);
}
