"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { ContactModal } from "@/components/contact/ContactModal";
import { Menu, Moon, SunMedium, X } from "lucide-react";
import type { SiteContent } from "@/types/content";
import { useTheme } from "@/components/theme/ThemeProvider";

function navLinkClass(label: string) {
  const base =
    "rounded-lg px-3 py-2 text-sm transition sm:px-4 sm:py-2.5";
  if (label === "Связаться") {
    return `${base} border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_88%,transparent)] font-medium text-[var(--foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[#e30613]/45 hover:bg-[#e30613]/10`;
  }
  return `${base} font-medium text-[var(--muted)] hover:bg-[color:color-mix(in_oklab,var(--surface)_92%,transparent)] hover:text-[var(--foreground)]`;
}

function isInternalPath(href: string) {
  return href.startsWith("/");
}

export function SiteHeader({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--background)_84%,transparent)] backdrop-blur-xl">
      <Container className="flex h-16 items-center gap-4">
        <Link href="/" className="text-lg">
          <BrandWordmark />
        </Link>

        <nav className="ml-auto hidden items-center gap-2 lg:flex" aria-label="Основное меню">
          {content.headerNav.map((item) =>
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
                href={item.href}
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
            {content.headerNav.map((item) =>
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
                  href={item.href}
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
