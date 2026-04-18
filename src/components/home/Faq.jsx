import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Is this affiliated with axiom.trade?',
    a: 'No. This is an independent companion tool built for the axiom.trade community to make on-the-fly rug checks effortless.'
  },
  {
    q: 'Does it work on any website?',
    a: 'Yes. The bookmarklet opens a self-contained popup window, so it works on axiom.trade, Dexscreener, X (Twitter), Telegram web — anywhere you find a contract address.'
  },
  {
    q: 'What chains are supported?',
    a: 'Solana, Ethereum, Base, and BSC. The AI auto-detects the chain from the address format.'
  },
  {
    q: 'Is the analysis financial advice?',
    a: 'Absolutely not. This is a heuristic risk signal. Always DYOR — nothing replaces your own due diligence.'
  },
  {
    q: 'Do I need a wallet or API key?',
    a: 'Nope. Just drag, click, paste. Zero setup.'
  }
];

export default function Faq() {
  return (
    <section id="faq" className="relative px-6 md:px-10 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Questions, <span className="font-serif italic">answered</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left hover:text-primary hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}