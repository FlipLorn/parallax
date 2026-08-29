import { MarketingNav } from "@/components/marketing/marketing-nav";
import { Act01Hero } from "@/components/marketing/act-01-hero";
import { Act02HiddenExposure } from "@/components/marketing/act-02-hidden-exposure";
import { Act03MarketVsParallax } from "@/components/marketing/act-03-market-vs-parallax";
import { Act04RiskToAction } from "@/components/marketing/act-04-risk-to-action";
import { Act05FinalCta } from "@/components/marketing/act-05-final-cta";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-[#070A0E] text-[#F1F0EA] selection:bg-[#2878FF]/30">
      <MarketingNav />
      <div id="hero">
        <Act01Hero />
      </div>

      <div id="exposure">
        <ScrollReveal yOffset={40} blur={true}>
          <Act02HiddenExposure />
        </ScrollReveal>
      </div>

      <div id="intelligence">
        <ScrollReveal yOffset={40} blur={true}>
          <Act03MarketVsParallax />
        </ScrollReveal>
      </div>

      <div id="action">
        <ScrollReveal yOffset={40} blur={true}>
          <Act04RiskToAction />
        </ScrollReveal>
      </div>

      <ScrollReveal yOffset={30} blur={false}>
        <Act05FinalCta />
      </ScrollReveal>
    </main>
  );
}
