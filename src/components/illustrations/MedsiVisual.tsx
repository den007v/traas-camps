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
      if (t < 0.14) return 0;
      if (t < 0.22) {
        const p = (t - 0.14) / 0.08;
        return Math.sin(Math.PI * p) * 0.45;
      }
      if (t < 0.32) {
        const p = (t - 0.22) / 0.1;
        return -0.75 * Math.sin(Math.PI * p);
      }
      if (t < 0.44) {
        const p = (t - 0.32) / 0.12;
        return 0.4 * Math.sin(Math.PI * p);
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

      const bg = ctx.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, width * 0.8);
      bg.addColorStop(0, "#1c0404");
      bg.addColorStop(1, "#060206");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const sx = width / 7;
      const sy = height / 5;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255,34,0,0.042)";
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

      const cx = width * 0.5;
      const cy = height * 0.5;
      const pulseBeat = (Math.sin(ts / 1500) + 1) * 0.5;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,34,0,${0.12 + pulseBeat * 0.1})`;
      ctx.ellipse(cx, cy, width * 0.24 * (1 + pulseBeat * 0.05), height * 0.26 * (1 + pulseBeat * 0.05), 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,34,0,${0.08 + pulseBeat * 0.08})`;
      ctx.ellipse(cx, cy, width * 0.13 * (1 + pulseBeat * 0.07), height * 0.145 * (1 + pulseBeat * 0.07), 0, 0, Math.PI * 2);
      ctx.fill();

      const crossVx = width * 0.42;
      const crossVy = height * 0.29;
      const crossVw = width * 0.16;
      const crossVh = height * 0.41;
      const crossHx = width * 0.29;
      const crossHy = height * 0.4;
      const crossHw = width * 0.42;
      const crossHh = height * 0.19;
      const centerW = width * 0.1;
      const centerH = height * 0.11;

      ctx.fillStyle = "rgba(255,22,0,0.13)";
      ctx.strokeStyle = "rgba(255,68,52,0.9)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(crossVx, crossVy, crossVw, crossVh, 4);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(crossHx, crossHy, crossHw, crossHh, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "rgba(255,32,16,0.45)";
      ctx.beginPath();
      ctx.roundRect(cx - centerW / 2, cy - centerH / 2, centerW, centerH, 3);
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,85,68,0.55)";
      ctx.lineWidth = 0.65;
      ctx.arc(cx, cy, width * 0.048, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(204,32,0,0.32)";
      ctx.lineWidth = 0.45;
      ctx.arc(cx, cy, width * 0.082, 0, Math.PI * 2);
      ctx.stroke();

      const baseY = height * 0.653;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(85,12,0,0.4)";
      ctx.lineWidth = 0.4;
      ctx.moveTo(width * 0.115, baseY);
      ctx.lineTo(width * 0.885, baseY);
      ctx.stroke();

      const drawRail = (x0: number, x1: number, progress: number) => {
        const samples = 120;
        const points: Array<{ x: number; y: number }> = [];
        for (let i = 0; i <= samples; i += 1) {
          const t = i / samples;
          points.push({ x: x0 + (x1 - x0) * t, y: baseY - ecgY(t) * height * 0.12 });
        }

        ctx.beginPath();
        ctx.strokeStyle = "rgba(221,48,32,0.42)";
        ctx.lineWidth = 1.1;
        points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.stroke();

        const headX = x0 + (x1 - x0) * progress;
        const tailX = Math.max(x0, headX - (x1 - x0) * 0.2);
        const yAt = (x: number) => {
          const t = (x - x0) / Math.max(1, x1 - x0);
          return baseY - ecgY(Math.max(0, Math.min(1, t))) * height * 0.12;
        };
        const headY = yAt(headX);

        const grad = ctx.createLinearGradient(tailX, 0, headX, 0);
        grad.addColorStop(0, "rgba(255,80,90,0)");
        grad.addColorStop(1, "rgba(255,100,110,1)");
        ctx.beginPath();
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = grad;
        const tailSamples = 34;
        for (let i = 0; i <= tailSamples; i += 1) {
          const p = i / tailSamples;
          const x = tailX + (headX - tailX) * p;
          const y = yAt(x);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,80,90,0.15)";
        ctx.arc(headX, headY, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,100,110,0.38)";
        ctx.arc(headX, headY, 4.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#ff6878";
        ctx.arc(headX, headY, 2.8, 0, Math.PI * 2);
        ctx.fill();
      };

      drawRail(width * 0.115, width * 0.345, (pulse * 1.4) % 1);
      drawRail(width * 0.655, width * 0.885, (pulse * 1.4 + 0.35) % 1);

      ctx.fillStyle = "rgba(255,255,255,0.96)";
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ff0e00";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
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
