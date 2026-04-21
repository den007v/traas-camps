"use client";

import { useEffect, useRef } from "react";

type Tree = {
  x: number;
  baseY: number;
  h: number;
  w: number;
  layer: 0 | 1 | 2 | 3;
  sway: number;
  swaySpeed: number;
};

type Firefly = {
  x: number;
  y: number;
  phase: number;
  speed: number;
  ampX: number;
  ampY: number;
};

export function SegezhaVisual() {
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

    const rand = (seed: number) => {
      const x = Math.sin(seed * 9283.17) * 43758.5453;
      return x - Math.floor(x);
    };

    const trees: Tree[] = [];
    for (let i = 0; i < 52; i += 1) {
      const r = rand(i + 1);
      const layer = (i % 4) as 0 | 1 | 2 | 3;
      const layerScale = layer === 0 ? 0.74 : layer === 1 ? 0.92 : layer === 2 ? 1.08 : 1.22;
      trees.push({
        x: 6 + r * 388,
        baseY: 246 + layer * 12 + rand(i + 21) * 9,
        h: (62 + rand(i + 11) * 66) * layerScale,
        w: (24 + rand(i + 31) * 26) * layerScale,
        layer,
        sway: rand(i + 51) * Math.PI * 2,
        swaySpeed: 0.14 + rand(i + 61) * 0.1,
      });
    }

    const fireflies: Firefly[] = [];
    for (let i = 0; i < 9; i += 1) {
      fireflies.push({
        x: 40 + rand(i + 101) * 320,
        y: 86 + rand(i + 111) * 108,
        phase: rand(i + 121) * Math.PI * 2,
        speed: 0.6 + rand(i + 131) * 1.1,
        ampX: 8 + rand(i + 141) * 14,
        ampY: 3 + rand(i + 151) * 8,
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawTree = (tree: Tree, time: number) => {
      const grow = 1;
      const sway = Math.sin(time * tree.swaySpeed + tree.sway) * 0.09;
      const x = (tree.x / 400) * width + sway;
      const baseY = (tree.baseY / 300) * height;
      const h = (tree.h / 300) * height * grow;
      const w = (tree.w / 400) * width * grow;

      const layerAlpha = tree.layer === 0 ? 0.2 : tree.layer === 1 ? 0.3 : tree.layer === 2 ? 0.46 : 0.62;
      const grad = ctx.createLinearGradient(x, baseY - h, x, baseY);
      grad.addColorStop(0, `rgba(62,162,88,${0.68 * layerAlpha})`);
      grad.addColorStop(1, `rgba(20,72,40,${0.92 * layerAlpha})`);

      ctx.fillStyle = grad;
      for (let i = 0; i < 3; i += 1) {
        const k = i / 4;
        const tierH = h * (0.6 - i * 0.09);
        const yTop = baseY - h + k * h * 0.39;
        const half = w * (0.78 - i * 0.1);
        ctx.beginPath();
        ctx.moveTo(x, yTop);
        ctx.lineTo(x - half, yTop + tierH);
        ctx.lineTo(x + half, yTop + tierH);
        ctx.closePath();
        ctx.fill();
      }

      ctx.fillStyle = `rgba(30,45,30,${0.72 * layerAlpha})`;
      ctx.fillRect(x - Math.max(0.9, w * 0.048), baseY - h * 0.085, Math.max(1.6, w * 0.096), h * 0.23);
    };

    const draw = (ts: number) => {
      const sec = ts / 1000;

      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#061428");
      skyGrad.addColorStop(0.54, "#052221");
      skyGrad.addColorStop(1, "#08160e");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      const moonX = width * 0.74;
      const moonY = height * 0.165;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 74 * (width / 400));
      moonGlow.addColorStop(0, "rgba(198,228,210,0.22)");
      moonGlow.addColorStop(1, "rgba(170,215,175,0)");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 74 * (width / 400), 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(205,231,218,0.75)";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 13 * (width / 400), 0, Math.PI * 2);
      ctx.fill();

      const fogBands = [0.65, 0.73, 0.8];
      fogBands.forEach((f, i) => {
        const y = height * f;
        const fg = ctx.createLinearGradient(0, y, 0, y + 28);
        fg.addColorStop(0, `rgba(132,201,157,${0.06 - i * 0.013})`);
        fg.addColorStop(1, "rgba(170,215,175,0)");
        ctx.fillStyle = fg;
        ctx.fillRect(0, y, width, 32);
      });

      const groundY = height * 0.955;
      const ground = ctx.createLinearGradient(0, groundY, 0, height);
      ground.addColorStop(0, "#04120c");
      ground.addColorStop(1, "#020a06");
      ctx.fillStyle = ground;
      ctx.fillRect(0, groundY, width, height - groundY);

      trees.forEach((tree) => drawTree(tree, sec));

      fireflies.forEach((f) => {
        const x = (f.x / 400) * width + Math.sin(sec * f.speed + f.phase) * f.ampX;
        const y = (f.y / 300) * height + Math.cos(sec * f.speed * 0.8 + f.phase * 1.2) * f.ampY * 0.85;
        const alpha = ((Math.sin(sec * 3.2 + f.phase) + 1) * 0.5) * 0.55;
        ctx.fillStyle = `rgba(210,255,190,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fill();
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
