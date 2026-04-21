"use client";

import { useEffect, useRef } from "react";

export function MedsiVisual() {
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
    let ecgPoints: Array<{ x: number; y: number }> = [];
    const samples = 360;
    const ecgAnchors: Array<[number, number]> = [
      [0.0, 0],
      [0.16, 0],
      [0.185, -0.18],
      [0.205, 0],
      [0.33, 0],
      [0.365, 0.36],
      [0.39, -0.05],
      [0.42, 0.18],
      [0.44, -0.22],
      [0.455, -0.08],
      [0.466, 1.12],
      [0.488, 0.28],
      [0.515, -1.26],
      [0.54, -0.12],
      [0.565, 0.0],
      [0.74, 0.0],
      [0.8, 0.5],
      [0.84, 0.0],
      [1.0, 0.0],
    ];

    const ecgY = (t: number) => {
      if (t <= ecgAnchors[0][0]) return ecgAnchors[0][1];
      for (let i = 1; i < ecgAnchors.length; i += 1) {
        const [x1, y1] = ecgAnchors[i];
        const [x0, y0] = ecgAnchors[i - 1];
        if (t <= x1) {
          const p = (t - x0) / Math.max(0.0001, x1 - x0);
          return y0 + (y1 - y0) * p;
        }
      }
      return ecgAnchors[ecgAnchors.length - 1][1];
    };

    const rebuildStaticLine = () => {
      const baseY = height * 0.52;
      const amp = height * 0.2;
      ecgPoints = [];
      for (let i = 0; i <= samples; i += 1) {
        const t = i / samples;
        ecgPoints.push({ x: t * width, y: baseY - ecgY(t) * amp });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildStaticLine();
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, width, height);

      const sx = width / 7;
      const sy = height / 5;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      for (let x = 0; x <= width; x += sx) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += sy) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const baseY = height * 0.52;
      const amp = height * 0.2;
      const loop = (ts * 0.00022) % 1;
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(180,60,70,0.22)";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ecgPoints.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      const tailLen = width * 0.18;
      const headX = (1 - loop) * width;
      const tailX = Math.min(width, headX + tailLen);
      const yAt = (x: number) => {
        const t = x / width;
        return baseY - ecgY(t) * amp;
      };
      const headY = yAt(headX);

      const grad = ctx.createLinearGradient(tailX, 0, headX, 0);
      grad.addColorStop(0, "rgba(255,80,90,0)");
      grad.addColorStop(1, "rgba(255,100,110,0.98)");
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = grad;
      const tailSamples = 42;
      for (let i = 0; i <= tailSamples; i += 1) {
        const p = i / tailSamples;
        const x = tailX - (tailX - headX) * p;
        const y = yAt(x);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "rgba(255,80,90,0.12)";
      ctx.arc(headX, headY, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "rgba(255,100,110,0.35)";
      ctx.arc(headX, headY, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#ff6878";
      ctx.arc(headX, headY, 3.5, 0, Math.PI * 2);
      ctx.fill();

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
