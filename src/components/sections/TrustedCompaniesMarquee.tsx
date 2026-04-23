import Image from "next/image";
import { trustedCompanies } from "@/data/trustedCompanies";

export function TrustedCompaniesMarquee() {
  const marqueeItems = [
    ...trustedCompanies,
    ...trustedCompanies,
    ...trustedCompanies,
  ];

  return (
    <section
      aria-label="Компании, для которых мы делали проекты"
      className="relative overflow-hidden border-y border-[var(--divider)] bg-[var(--surface-soft)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:radial-gradient(circle_at_10%_50%,rgba(227,6,19,0.12),transparent_42%),radial-gradient(circle_at_88%_50%,rgba(255,255,255,0.06),transparent_38%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:color-mix(in_oklab,var(--accent)_22%,transparent)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--divider)] to-transparent" />

      <div className="trusted-marquee relative mx-[20%] w-[60%] min-w-0 overflow-hidden">
        <div className="trusted-marquee__track py-7 md:py-9">
          {marqueeItems.map((company, index) => (
            <span key={`${company.id}-${index}`} className="trusted-marquee__item">
              <Image
                src={company.logoUrl}
                alt={company.name}
                width={220}
                height={72}
                sizes="(max-width: 768px) 120px, 200px"
                className="trusted-marquee__logo"
              />
            </span>
          ))}
        </div>
        <span aria-hidden className="trusted-marquee__shimmer" />
        <span aria-hidden className="trusted-marquee__fade trusted-marquee__fade--left" />
        <span aria-hidden className="trusted-marquee__fade trusted-marquee__fade--right" />
      </div>
    </section>
  );
}
