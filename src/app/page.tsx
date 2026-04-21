import { siteContent } from "@/data/siteContent";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuickNavCards } from "@/components/sections/QuickNavCards";
import { CheckupsSection } from "@/components/sections/CheckupsSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";

export default function Home() {
  return (
    <>
      <SiteHeader content={siteContent} />
      <main className="flex-1">
        <HeroSection content={siteContent} />
        <QuickNavCards content={siteContent} />
        <CheckupsSection content={siteContent} />
        <CasesSection />
        <ServicesSection content={siteContent} />
        <PublicationsSection content={siteContent} />
      </main>
      <SiteFooter content={siteContent} />
      <CookieBanner />
    </>
  );
}
