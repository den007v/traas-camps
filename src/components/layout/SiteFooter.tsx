import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import type { SiteContent } from "@/types/content";

export function SiteFooter({ content }: { content: SiteContent }) {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="border-t border-white/10 bg-[#0b0b0f]">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-lg">
              <BrandWordmark />
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              {content.footer.tagline}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {content.footer.contacts.map((c) => (
                <li key={c.label}>
                  <span className="text-zinc-500">
                    {c.label}:{" "}
                  </span>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="font-medium text-[#ff5a65] hover:underline"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-zinc-200">
                      {c.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {content.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition hover:text-[#ff5a65]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-xs leading-relaxed text-zinc-500">
          {content.footer.legal.replace("{год}", String(year))}
        </p>
      </Container>
    </footer>
  );
}
