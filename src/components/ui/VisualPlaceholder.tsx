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
      className={`relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#171720] via-[#111117] to-[#220b10] ring-1 ring-white/12 ${className}`}
      aria-hidden={!label}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(227,6,19,0.20),transparent_50%)]" />
      {children}
      {label ? (
        <span className="relative z-[1] max-w-[80%] text-center text-xs font-medium uppercase tracking-wider text-zinc-400">
          {label}
        </span>
      ) : null}
    </div>
  );
}
