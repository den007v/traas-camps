"use client";

import { useCallback, useEffect, useRef } from "react";
import type { RefObject } from "react";
import { lerp, roundRect, useCanvasResize } from "./canvasUtils";

type Phase = "intro" | "connect" | "glow" | "pulse" | "reset";
type Pulse = { from: number; to: number; progress: number; speed: number };

const RELATIVE_POS = [
  { x: 0.2, y: 0.18 },
  { x: 0.75, y: 0.18 },
  { x: 0.1, y: 0.42 },
  { x: 0.5, y: 0.35 },
  { x: 0.5, y: 0.65 },
  { x: 0.85, y: 0.42 },
  { x: 0.25, y: 0.75 },
  { x: 0.75, y: 0.75 },
];

const SERVICES = ["CRM", "ERP", "API GW", "Data DB", "Bus", "Auth", "CI/CD", "Infra"];
const CONNECTIONS: Array<[number, number]> = [
  [0, 2], [0, 3], [1, 3], [1, 5], [2, 3], [3, 4], [3, 5], [4, 6], [4, 7], [5, 7], [6, 3], [7, 3],
];

export function useItArchCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const frameRef = useRef(0);
  const phaseRef = useRef<Phase>("intro");
  const pulsesRef = useRef<Pulse[]>([]);
  const rafRef = useRef(0);

  useCanvasResize(
    canvasRef,
    useCallback((width, height, ctx) => {
      ctxRef.current = ctx;
      sizeRef.current = { width, height };
      frameRef.current = 0;
      phaseRef.current = "intro";
      pulsesRef.current = [];
    }, []),
  );

  useEffect(() => {
    const random = (a: number, b: number) => a + Math.random() * (b - a);

    const loop = () => {
      const ctx = ctxRef.current;
      const { width, height } = sizeRef.current;
      if (!ctx || width <= 0 || height <= 0) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      frameRef.current += 1;
      const frame = frameRef.current;
      const phase = phaseRef.current;
      ctx.clearRect(0, 0, width, height);

      const services = RELATIVE_POS.map((p, i) => ({
        x: p.x * width,
        y: p.y * height,
        w: Math.max(46, width * 0.16),
        h: Math.max(20, height * 0.08),
        label: SERVICES[i],
      }));

      let serviceCount = 0;
      let connectionCount = 0;
      let glowIntensity = 0;
      let resetAlpha = 1;

      if (phase === "intro") serviceCount = Math.min(services.length, Math.floor(frame / 20) + 1);
      if (phase === "connect") {
        serviceCount = services.length;
        connectionCount = Math.min(CONNECTIONS.length, Math.floor(frame / 25) + 1);
      }
      if (phase === "glow") {
        serviceCount = services.length;
        connectionCount = CONNECTIONS.length;
        glowIntensity = Math.min(1, frame / 60);
      }
      if (phase === "pulse") {
        serviceCount = services.length;
        connectionCount = CONNECTIONS.length;
        glowIntensity = 1;
      }
      if (phase === "reset") {
        serviceCount = services.length;
        connectionCount = CONNECTIONS.length;
        glowIntensity = 1;
        resetAlpha = Math.max(0, 1 - frame / 40);
      }

      ctx.globalAlpha = resetAlpha;

      for (let i = 0; i < connectionCount; i += 1) {
        const [a, b] = CONNECTIONS[i];
        const sa = services[a];
        const sb = services[b];
        ctx.setLineDash(i < CONNECTIONS.length ? [4, 4] : []);
        ctx.strokeStyle = "rgba(192,60,60,0.45)";
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      if (phase === "pulse" && frame % 42 === 0 && pulsesRef.current.length < 4) {
        const [from, to] = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
        pulsesRef.current.push({ from, to, progress: 0, speed: random(0.01, 0.016) });
      }

      for (let i = pulsesRef.current.length - 1; i >= 0; i -= 1) {
        const p = pulsesRef.current[i];
        const a = services[p.from];
        const b = services[p.to];
        const t0 = Math.max(0, p.progress - 0.25);
        const x0 = lerp(a.x, b.x, t0);
        const y0 = lerp(a.y, b.y, t0);
        const x1 = lerp(a.x, b.x, p.progress);
        const y1 = lerp(a.y, b.y, p.progress);
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, "rgba(224,80,80,0)");
        grad.addColorStop(1, "rgba(224,80,80,1)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        ctx.fillStyle = "#FF5555";
        ctx.shadowBlur = 7;
        ctx.shadowColor = "#E53935";
        ctx.beginPath();
        ctx.arc(x1, y1, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        p.progress += p.speed;
        if (p.progress >= 1) pulsesRef.current.splice(i, 1);
      }

      for (let i = 0; i < serviceCount; i += 1) {
        const s = services[i];
        const alpha = phase === "intro" ? Math.min(1, (frame - i * 20) / 15) : 1;
        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha * resetAlpha);
        if (glowIntensity > 0) {
          ctx.shadowBlur = glowIntensity * 12;
          ctx.shadowColor = "#E53935";
        }
        ctx.strokeStyle = "#C03C3C";
        ctx.lineWidth = 1;
        ctx.fillStyle = "rgba(192,60,60,0.05)";
        roundRect(ctx, s.x - s.w / 2, s.y - s.h / 2, s.w, s.h, 3);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#E05050";
        ctx.font = "700 9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.label, s.x, s.y);
        ctx.restore();
      }

      if (phase === "intro" && frame >= 160) { phaseRef.current = "connect"; frameRef.current = 0; }
      else if (phase === "connect" && frame >= 300) { phaseRef.current = "glow"; frameRef.current = 0; }
      else if (phase === "glow" && frame >= 60) { phaseRef.current = "pulse"; frameRef.current = 0; }
      else if (phase === "pulse" && frame >= 180) { phaseRef.current = "reset"; frameRef.current = 0; pulsesRef.current = []; }
      else if (phase === "reset" && frame >= 40) { phaseRef.current = "intro"; frameRef.current = 0; }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
}
