"use client";

import { useEffect, useRef } from "react";

type Block = {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: [number, number, number];
};

const blocks: Block[] = [
  { label: "Стратегия", x: 0.1, y: 0.1, w: 0.3, h: 0.13, color: [185, 65, 80] },
  { label: "Команды", x: 0.58, y: 0.1, w: 0.3, h: 0.13, color: [185, 65, 80] },
  { label: "Agile", x: 0.06, y: 0.32, w: 0.22, h: 0.12, color: [95, 138, 205] },
  { label: "OKR", x: 0.32, y: 0.32, w: 0.24, h: 0.12, color: [95, 138, 205] },
  { label: "Leadership", x: 0.62, y: 0.32, w: 0.28, h: 0.12, color: [95, 138, 205] },
  { label: "77.8% NPS", x: 0.1, y: 0.55, w: 0.32, h: 0.12, color: [55, 175, 115] },
  { label: "+23% рост", x: 0.52, y: 0.55, w: 0.34, h: 0.12, color: [55, 175, 115] },
  { label: "23 компании", x: 0.2, y: 0.77, w: 0.56, h: 0.12, color: [200, 160, 58] },
];

const edges: Array<[number, number]> = [
  [0, 2],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 5],
  [4, 6],
  [5, 7],
  [6, 7],
];

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

const appearInterval = 0.75;
const appearDuration = 0.45;
const appearEnd = (blocks.length - 1) * appearInterval + appearDuration;
const fullPause = 1.2;
const disappearInterval = 0.45;
const disappearDuration = 0.3;
const disappearStart = appearEnd + fullPause;
const disappearEnd = disappearStart + (blocks.length - 1) * disappearInterval + disappearDuration;
const cycleDuration = disappearEnd + 0.8;

export function BootcampVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const blockState = (index: number, t: number) => {
      const appearStart = index * appearInterval;
      const disappearAt = disappearStart + index * disappearInterval;

      if (t < appearStart) return { alpha: 0, visible: false, chars: 0, typing: false };
      if (t <= appearStart + appearDuration) {
        const p = clamp((t - appearStart) / appearDuration);
        return {
          alpha: p,
          visible: p > 0.01,
          chars: Math.ceil(blocks[index].label.length * p),
          typing: true,
        };
      }
      if (t < disappearAt) {
        return {
          alpha: 1,
          visible: true,
          chars: blocks[index].label.length,
          typing: false,
        };
      }
      if (t <= disappearAt + disappearDuration) {
        const p = clamp((t - disappearAt) / disappearDuration);
        return {
          alpha: 1 - p,
          visible: p < 0.99,
          chars: blocks[index].label.length,
          typing: false,
        };
      }
      return { alpha: 0, visible: false, chars: 0, typing: false };
    };

    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const draw = (ts: number) => {
      const t = (ts / 1000) % cycleDuration;
      ctx.clearRect(0, 0, width, height);
      const step = 18;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255,255,255,0.038)";
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const states = blocks.map((_, i) => blockState(i, t));
      edges.forEach(([a, b]) => {
        const sa = states[a];
        const sb = states[b];
        if (!sa.visible || !sb.visible) return;
        const ba = blocks[a];
        const bb = blocks[b];
        const x1 = (ba.x + ba.w * 0.5) * width;
        const y1 = (ba.y + ba.h) * height;
        const x2 = (bb.x + bb.w * 0.5) * width;
        const y2 = bb.y * height;
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.setLineDash([4, 3]);
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      blocks.forEach((block, i) => {
        const s = states[i];
        if (!s.visible) return;
        const x = block.x * width;
        const y = block.y * height;
        const w = block.w * width;
        const h = block.h * height;
        const [r, g, b] = block.color;

        ctx.globalAlpha = s.alpha;
        drawRoundedRect(x, y, w, h, 5);
        ctx.fillStyle = `rgba(${r},${g},${b},0.14)`;
        ctx.fill();
        drawRoundedRect(x, y, w, h, 5);
        ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        const text = block.label.slice(0, s.chars);
        const tr = Math.min(255, r + 55);
        const tg = Math.min(255, g + 55);
        const tb = Math.min(255, b + 55);
        ctx.fillStyle = `rgba(${tr},${tg},${tb},0.95)`;
        ctx.font = "500 12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const cursor = s.typing && Math.sin(ts / 140) > 0 ? "|" : "";
        ctx.fillText(`${text}${cursor}`, x + w / 2, y + h / 2);
        ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
