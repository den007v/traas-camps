import type { ReactNode } from "react";

/** Плейсхолдер под иллюстрацию или фото — замените на next/image или свой компонент. */
export function VisualPlaceholder({
  label,
  className = "",
  children,
}: {
  label?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--surface-2)] via-[var(--surface)] to-[color:color-mix(in_oklab,var(--surface)_84%,#2a0e14)] ring-1 ring-[var(--divider)] ${className}`}
      aria-hidden={!label}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(227,6,19,0.20),transparent_50%)]" />
      {children}
      {label ? (
        <span className="relative z-[1] max-w-[80%] text-center text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {label}
        </span>
      ) : null}
    </div>
  );
}
