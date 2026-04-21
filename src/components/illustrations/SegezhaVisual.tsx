"use client";

import { useEffect, useRef } from "react";

type Tree = {
  x: number;
  baseY: number;
  h: number;
  w: number;
  layer: 0 | 1 | 2;
  delay: number;
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
    for (let i = 0; i < 34; i += 1) {
      const r = rand(i + 1);
      const layer = (i % 3) as 0 | 1 | 2;
      const layerScale = layer === 0 ? 0.72 : layer === 1 ? 0.9 : 1.05;
      trees.push({
        x: 18 + r * 364,
        baseY: 218 + layer * 9 + rand(i + 21) * 6,
        h: (36 + rand(i + 11) * 34) * layerScale,
        w: (20 + rand(i + 31) * 18) * layerScale,
        layer,
        delay: i * 0.028 + rand(i + 41) * 0.08,
        sway: rand(i + 51) * Math.PI * 2,
        swaySpeed: 0.8 + rand(i + 61) * 0.9,
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
      const sway = Math.sin(time * tree.swaySpeed + tree.sway) * 1.2;
      const x = (tree.x / 400) * width + sway;
      const baseY = (tree.baseY / 300) * height;
      const h = (tree.h / 300) * height * grow;
      const w = (tree.w / 400) * width * grow;

      const layerAlpha = tree.layer === 0 ? 0.58 : tree.layer === 1 ? 0.72 : 0.86;
      const grad = ctx.createLinearGradient(x, baseY - h, x, baseY);
      grad.addColorStop(0, `rgba(139,199,139,${0.6 * layerAlpha})`);
      grad.addColorStop(1, `rgba(40,86,46,${0.8 * layerAlpha})`);

      ctx.fillStyle = grad;
      for (let i = 0; i < 4; i += 1) {
        const k = i / 4;
        const tierH = h * (0.34 - i * 0.03);
        const yTop = baseY - h + k * h * 0.32;
        const half = w * (0.58 - i * 0.07);
        ctx.beginPath();
        ctx.moveTo(x, yTop);
        ctx.lineTo(x - half, yTop + tierH);
        ctx.lineTo(x + half, yTop + tierH);
        ctx.closePath();
        ctx.fill();
      }

      ctx.fillStyle = `rgba(36,26,20,${0.82 * layerAlpha})`;
      ctx.fillRect(x - Math.max(0.7, w * 0.06), baseY - h * 0.08, Math.max(1.4, w * 0.12), h * 0.28);
    };

    const draw = (ts: number) => {
      const sec = ts / 1000;

      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#08101a");
      skyGrad.addColorStop(0.5, "#0c1e18");
      skyGrad.addColorStop(1, "#091410");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      const moonX = width * 0.74;
      const moonY = height * 0.17;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 55 * (width / 400));
      moonGlow.addColorStop(0, "rgba(170,215,175,0.18)");
      moonGlow.addColorStop(1, "rgba(170,215,175,0)");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 55 * (width / 400), 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(195,230,205,0.65)";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 11 * (width / 400), 0, Math.PI * 2);
      ctx.fill();

      const fogBands = [0.62, 0.69, 0.76];
      fogBands.forEach((f, i) => {
        const y = height * f;
        const fg = ctx.createLinearGradient(0, y, 0, y + 28);
        fg.addColorStop(0, `rgba(170,215,175,${0.08 - i * 0.018})`);
        fg.addColorStop(1, "rgba(170,215,175,0)");
        ctx.fillStyle = fg;
        ctx.fillRect(0, y, width, 32);
      });

      const groundY = height * 0.74;
      const ground = ctx.createLinearGradient(0, groundY, 0, height);
      ground.addColorStop(0, "#091f0f");
      ground.addColorStop(1, "#050c07");
      ctx.fillStyle = ground;
      ctx.fillRect(0, groundY, width, height - groundY);

      trees.forEach((tree) => drawTree(tree, sec));

      fireflies.forEach((f) => {
        const x = (f.x / 400) * width + Math.sin(sec * f.speed + f.phase) * f.ampX;
        const y = (f.y / 300) * height + Math.cos(sec * f.speed * 0.8 + f.phase * 1.2) * f.ampY;
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
