"use client";

import { useCallback, useEffect, useRef } from "react";
import type { RefObject } from "react";
import { lerp, useCanvasResize } from "./canvasUtils";

type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string };
type Pulse = { from: number; to: number; progress: number; speed: number };

const EDGE_DIST = 98;

export function useNeuralNetCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef(0);

  const random = (a: number, b: number) => a + Math.random() * (b - a);

  const resetScene = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    for (let i = 0; i < 26; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = random(0.1, 0.22);
      nodes.push({
        x: i === 0 ? width / 2 : random(8, width - 8),
        y: i === 0 ? height / 2 : random(8, height - 8),
        vx: i === 0 ? 0 : Math.cos(angle) * speed,
        vy: i === 0 ? 0 : Math.sin(angle) * speed,
        r: i === 0 ? 5.4 : random(2.2, 3.6),
        color: Math.random() > 0.5 ? "#7B2D8B" : "#C0392B",
      });
    }
    nodesRef.current = nodes;
    pulsesRef.current = [];
  }, []);

  useCanvasResize(canvasRef, useCallback((width, height, ctx) => {
    ctxRef.current = ctx;
    sizeRef.current = { width, height };
    resetScene(width, height);
  }, [resetScene]));

  useEffect(() => {
    const draw = () => {
      const ctx = ctxRef.current;
      const { width, height } = sizeRef.current;
      if (!ctx || width <= 0 || height <= 0) return;

      frameRef.current += 1;
      const t = frameRef.current;
      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;
      ctx.clearRect(0, 0, width, height);

      const edges: Array<[number, number, number]> = [];
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < EDGE_DIST) {
            const alpha = 1 - dist / EDGE_DIST;
            edges.push([i, j, alpha]);
            ctx.strokeStyle = `rgba(192,57,43,${alpha * 0.35})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      if (t % 54 === 0 && edges.length && pulses.length < 6) {
        const [from, to] = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ from, to, progress: 0, speed: random(0.006, 0.012) });
      }

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const p = pulses[i];
        const a = nodes[p.from];
        const b = nodes[p.to];
        const t0 = Math.max(0, p.progress - 0.25);
        const x0 = lerp(a.x, b.x, t0);
        const y0 = lerp(a.y, b.y, t0);
        const x1 = lerp(a.x, b.x, p.progress);
        const y1 = lerp(a.y, b.y, p.progress);
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, "rgba(224,80,80,0)");
        grad.addColorStop(1, "rgba(224,80,80,0.9)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        ctx.fillStyle = "#E05050";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#FF4444";
        ctx.beginPath();
        ctx.arc(x1, y1, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        p.progress += p.speed;
        if (p.progress >= 1) pulses.splice(i, 1);
      }

      for (let i = 1; i < nodes.length; i += 1) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= n.r || n.x >= width - n.r) n.vx *= -1;
        if (n.y <= n.r || n.y >= height - n.r) n.vy *= -1;
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#E05050";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const centralR = 5.4 + Math.sin(t * 0.04) * 1.8;
      nodes[0].x = width / 2;
      nodes[0].y = height / 2;
      ctx.fillStyle = "#E53935";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#E53935";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, centralR, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
}
