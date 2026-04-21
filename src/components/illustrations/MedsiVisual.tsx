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
    let pulse = 0;
    let lastTs = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const ecgY = (t: number) => {
      if (t < 0.16) return 0;
      if (t < 0.2) {
        const p = (t - 0.16) / 0.04;
        return -0.24 * Math.sin(Math.PI * p);
      }
      if (t < 0.34) return 0;
      if (t < 0.39) {
        const p = (t - 0.34) / 0.05;
        return Math.sin(Math.PI * p) * 0.42;
      }
      if (t < 0.42) {
        const p = (t - 0.39) / 0.03;
        return 0.1 - 0.22 * p;
      }
      if (t < 0.455) {
        const p = (t - 0.42) / 0.035;
        return -0.12 - 0.24 * p;
      }
      if (t < 0.474) {
        const p = (t - 0.455) / 0.019;
        return -0.36 + p * 1.42;
      }
      if (t < 0.507) {
        const p = (t - 0.474) / 0.033;
        return 1.06 - p * 2.35;
      }
      if (t < 0.535) {
        const p = (t - 0.507) / 0.028;
        return -1.29 + p * 1.05;
      }
      if (t < 0.565) {
        const p = (t - 0.535) / 0.03;
        return -0.24 + p * 0.18;
      }
      if (t < 0.72) return 0;
      if (t < 0.81) {
        const p = (t - 0.72) / 0.09;
        return Math.sin(Math.PI * p) * 0.55;
      }
      if (t < 0.86) {
        const p = (t - 0.81) / 0.05;
        return 0.55 * (1 - p);
      }
      return 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;
      pulse = (pulse + dt * 0.00028) % 1;

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
      const amp = height * 0.21;
      const points: Array<{ x: number; y: number }> = [];
      const samples = 280;
      for (let i = 0; i <= samples; i += 1) {
        const t = i / samples;
        points.push({ x: t * width, y: baseY - ecgY(t) * amp });
      }

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(180,60,70,0.22)";
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      const tailLen = width * 0.18;
      const headX = pulse * width;
      const tailX = Math.max(0, headX - tailLen);
      const yAt = (x: number) => {
        const t = x / width;
        return baseY - ecgY(t) * amp;
      };
      const headY = yAt(headX);

      const grad = ctx.createLinearGradient(tailX, 0, headX, 0);
      grad.addColorStop(0, "rgba(255,80,90,0)");
      grad.addColorStop(1, "rgba(255,100,110,1)");
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = grad;
      const tailSamples = 42;
      for (let i = 0; i <= tailSamples; i += 1) {
        const p = i / tailSamples;
        const x = tailX + (headX - tailX) * p;
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
