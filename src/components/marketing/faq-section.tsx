import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    q: "Does Parallax custody funds?",
    a: "No. The product reads wallet state and prepares transaction previews. Execution stays behind the user's wallet signature.",
  },
  {
    q: "Why prediction markets instead of normal stop losses?",
    a: "Event contracts can express discrete outcomes. That makes them useful for hedging specific catalysts that already affect a portfolio.",
  },
  {
    q: "Are the markets live in this demo?",
    a: "This build uses deterministic demo data with production-shaped boundaries. Jupiter and Helius integrations are documented in the research notes.",
  },
  {
    q: "What makes the agent output trustworthy?",
    a: "Every agent reports probability, confidence, evidence, and historical calibration. The UI keeps disagreement visible before any recommendation.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-background/84 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.72fr_1fr]">
        <div>
          <Badge>FAQ</Badge>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Questions before signature.</h2>
        </div>
        <Accordion type="single" collapsible className="rounded-md border border-border bg-card/82 px-6 shadow-[0_0_42px_rgba(36,88,255,0.1)]">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
