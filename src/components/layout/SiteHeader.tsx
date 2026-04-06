"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { ContactModal } from "@/components/contact/ContactModal";
import { Menu, X } from "lucide-react";
import type { SiteContent } from "@/types/content";

function navLinkClass(label: string) {
  const base =
    "rounded-lg px-3 py-2 text-sm transition sm:px-4 sm:py-2.5";
  if (label === "Связаться") {
    return `${base} border border-white/18 bg-white/[0.06] font-medium text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e30613]/45 hover:bg-[#e30613]/12 hover:text-white`;
  }
  return `${base} font-medium text-zinc-300 hover:bg-white/8 hover:text-white`;
}

export function SiteHeader({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0d13]/88 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg">
          <BrandWordmark />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Основное меню">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-200 lg:hidden"
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
          className="border-t border-white/10 bg-[#111119] px-4 py-4 lg:hidden"
        >
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
