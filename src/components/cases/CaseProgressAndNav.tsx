"use client";

import { useEffect, useMemo, useState } from "react";

export function CaseReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(100, Math.max(0, (doc.scrollTop / max) * 100));
      setProgress(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-[2px] bg-transparent">
      <div
        className="h-[2px] bg-[#e30613] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function CaseSectionNav({
  sections,
}: {
  sections: Array<{ id: string; title: string }>;
}) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);
  const idsKey = useMemo(() => sections.map((s) => s.id).join("|"), [sections]);

  useEffect(() => {
    if (!sections.length) return;
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.5, 1],
      },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey, sections]);

  if (!sections.length) return null;

  return (
    <ul className="mt-2.5 space-y-1.5">
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block rounded-md px-2 py-1 text-[12px] transition ${
                isActive
                  ? "bg-[#e30613]/14 text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {section.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
