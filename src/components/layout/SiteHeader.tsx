"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ContactModal } from "@/components/contact/ContactModal";
import { ChevronLeft, Menu, Moon, SunMedium, X } from "lucide-react";
import type { SiteContent } from "@/types/content";
import { useTheme } from "@/components/theme/ThemeProvider";

function navLinkClass(label: string) {
  const base =
    "rounded-lg px-3 py-2 text-sm transition sm:px-4 sm:py-2.5";
  if (label === "Связаться") {
    return `${base} border border-[color:color-mix(in_oklab,var(--primary)_70%,#ffffff)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_84%,#ff5e67),var(--primary-hover))] font-semibold text-white shadow-[0_10px_24px_color-mix(in_oklab,var(--primary)_34%,transparent),inset_0_1px_0_rgba(255,255,255,0.24)] hover:brightness-105`;
  }
  if (label === "Tech Bootcamp") {
    return `${base} border border-[color:color-mix(in_oklab,var(--primary)_45%,var(--border))] bg-[color:color-mix(in_oklab,var(--surface)_88%,var(--primary)_12%)] font-semibold text-[var(--foreground)] shadow-[0_8px_22px_color-mix(in_oklab,var(--primary)_16%,transparent)] hover:border-[color:color-mix(in_oklab,var(--primary)_62%,var(--border))] hover:text-[var(--primary)]`;
  }
  return `${base} font-medium text-[var(--muted)] hover:bg-[color:color-mix(in_oklab,var(--surface)_92%,transparent)] hover:text-[var(--foreground)]`;
}

const traasCasesButtonClass =
  "inline-flex items-center rounded-lg border border-[color:color-mix(in_oklab,#ffffff_74%,var(--border))] bg-[color:color-mix(in_oklab,var(--surface)_86%,transparent)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[color:color-mix(in_oklab,var(--surface)_96%,transparent)] hover:border-white/90 sm:px-4 sm:py-2.5";

function isInternalPath(href: string) {
  return href.startsWith("/");
}

function resolveNavHref(pathname: string, href: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

type HeaderItem = { label: string; href: string };

export function SiteHeader({
  content,
  navItems,
  currentPageLabel,
  backHref,
}: {
  content: SiteContent;
  navItems?: HeaderItem[];
  currentPageLabel?: string;
  backHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const items = navItems ?? content.headerNav;
  const isTechBootcampRoute = pathname.startsWith("/tech-bootcamp");
  const showTraasCasesButton = !isTechBootcampRoute;
  const techBackHref = pathname === "/tech-bootcamp" ? "/" : "/tech-bootcamp";
  const techBackLabel = pathname === "/tech-bootcamp" ? "TraaS" : "Tech Bootcamp";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--background)_84%,transparent)] backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs">
            {showTraasCasesButton ? (
              <Link href="/cases" className={traasCasesButtonClass}>
                Кейсы TraaS
              </Link>
            ) : currentPageLabel ? (
              <>
                <Link
                  href={backHref ?? techBackHref}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[var(--muted)] transition hover:border-[var(--primary)]/55 hover:text-[var(--foreground)]"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-medium">{techBackLabel}</span>
                </Link>
              </>
            ) : (
              <Link href="/cases" className={traasCasesButtonClass}>
                Кейсы TraaS
              </Link>
            )}
          </div>
        </div>

        <nav className="ml-auto hidden items-center gap-2 lg:flex" aria-label="Основное меню">
          {items.map((item) =>
            item.label === "Связаться" ? (
              <button
                key={item.href + item.label}
                type="button"
                onClick={() => setContactOpen(true)}
                className={navLinkClass(item.label)}
              >
                {item.label}
              </button>
            ) : isInternalPath(item.href) ? (
              <Link
                key={item.href + item.label}
                href={resolveNavHref(pathname, item.href)}
                className={navLinkClass(item.label)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href + item.label}
                href={item.href}
                className={navLinkClass(item.label)}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <button
          type="button"
          aria-label="Переключить тему"
          onClick={toggleTheme}
          className="hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--muted)] transition hover:text-[var(--foreground)] lg:inline-flex"
        >
          {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--foreground)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-[var(--divider)] bg-[var(--surface)] px-4 py-4 lg:hidden"
        >
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              aria-label="Переключить тему"
              onClick={toggleTheme}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-2 text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
          <nav className="flex flex-col gap-2" aria-label="Мобильное меню">
            {items.map((item) =>
              item.label === "Связаться" ? (
                <button
                  key={item.href + item.label}
                  type="button"
                  className={`${navLinkClass(item.label)} px-3 py-3 text-base`}
                  onClick={() => {
                    setOpen(false);
                    setContactOpen(true);
                  }}
                >
                  {item.label}
                </button>
              ) : isInternalPath(item.href) ? (
                <Link
                  key={item.href + item.label}
                  href={resolveNavHref(pathname, item.href)}
                  className={`${navLinkClass(item.label)} px-3 py-3 text-base`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  className={`${navLinkClass(item.label)} px-3 py-3 text-base`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
      ) : null}

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </header>
  );
}
