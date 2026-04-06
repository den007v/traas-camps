"use client";

import { useId } from "react";

type Variant = "ai" | "digital" | "tech";

/** Лаконичная SVG-инфографика с лёгким hover — без подписей под графиком */
export function AssessmentInfographic({ variant }: { variant: Variant }) {
  const uid = useId().replace(/:/g, "");

  if (variant === "ai") {
    const gid = `ai-g-${uid}`;
    return (
      <svg
        viewBox="0 0 200 120"
        className="h-[5.5rem] w-full max-w-[200px] text-[#ff6e79] transition-transform duration-300 group-hover:scale-[1.03]"
        aria-hidden
      >
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e30613" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff8b94" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="58" r="28" fill={`url(#${gid})`} opacity="0.35" />
        <circle cx="100" cy="58" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = 38;
          const x = 100 + r * Math.cos((deg * Math.PI) / 180);
          const y = 58 + r * Math.sin((deg * Math.PI) / 180);
          return (
            <g key={deg}>
              <line
                x1="100"
                y1="58"
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <circle cx={x} cy={y} r="5" fill="currentColor" opacity={0.5 + (i % 3) * 0.12} />
            </g>
          );
        })}
      </svg>
    );
  }

  if (variant === "digital") {
    const gid = `dig-g-${uid}`;
    return (
      <svg
        viewBox="0 0 200 120"
        className="h-[5.5rem] w-full max-w-[200px] text-[#ff6e79] transition-transform duration-300 group-hover:scale-[1.03]"
        aria-hidden
      >
        <rect
          x="28"
          y="28"
          width="144"
          height="56"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <rect x="40" y="40" width="36" height="10" rx="2" fill="currentColor" opacity="0.35" />
        <rect x="82" y="40" width="72" height="10" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="40" y="58" width="114" height="8" rx="2" fill="currentColor" opacity="0.15" />
        <path
          d="M48 88 L100 62 L152 88"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e30613" />
            <stop offset="100%" stopColor="#ff8b94" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 120"
      className="h-[5.5rem] w-full max-w-[200px] text-[#ff6e79] transition-transform duration-300 group-hover:scale-[1.03]"
      aria-hidden
    >
      <rect x="36" y="36" width="52" height="52" rx="6" fill="currentColor" opacity="0.12" />
      <rect x="112" y="36" width="52" height="52" rx="6" fill="currentColor" opacity="0.2" />
      <path
        d="M88 62 L112 62"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="62" cy="62" r="6" fill="currentColor" opacity="0.5" />
      <circle cx="138" cy="62" r="6" fill="currentColor" opacity="0.65" />
    </svg>
  );
}
