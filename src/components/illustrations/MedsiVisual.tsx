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
    let ecgPoints: Array<{ x: number; y: number }> = [];
    const samples = 320;

    const ecgY = (t: number) => {
      if (t < 0.17) return 0;
      if (t < 0.205) {
        const p = (t - 0.17) / 0.035;
        return -0.18 * Math.sin(Math.PI * p);
      }
      if (t < 0.305) return 0;
      if (t < 0.365) {
        const p = (t - 0.305) / 0.06;
        return Math.sin(Math.PI * p) * 0.38;
      }
      if (t < 0.39) {
        const p = (t - 0.365) / 0.025;
        return 0.16 - p * 0.22;
      }
      if (t < 0.425) {
        const p = (t - 0.39) / 0.035;
        return -0.06 - p * 0.23;
      }
      if (t < 0.447) {
        const p = (t - 0.425) / 0.022;
        return -0.29 + p * 1.5;
      }
      if (t < 0.49) {
        const p = (t - 0.447) / 0.043;
        return 1.21 - p * 2.56;
      }
      if (t < 0.522) {
        const p = (t - 0.49) / 0.032;
        return -1.35 + p * 1.18;
      }
      if (t < 0.56) {
        const p = (t - 0.522) / 0.038;
        return -0.17 + p * 0.19;
      }
      if (t < 0.76) return 0;
      if (t < 0.86) {
        const p = (t - 0.76) / 0.1;
        return Math.sin(Math.PI * p) * 0.5;
      }
      if (t < 0.91) {
        const p = (t - 0.86) / 0.05;
        return 0.5 * (1 - p);
      }
      return 0;
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
      const amp = height * 0.2;
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
