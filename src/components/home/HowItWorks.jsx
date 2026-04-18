import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, ClipboardPaste, Brain } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    n: '02',
    title: 'Click the bookmark',
    body: 'On axiom.trade, Dexscreener, X — anywhere. A popup opens instantly.'
  },
  {
    icon: ClipboardPaste,
    n: '03',
    title: 'Paste the CA',
    body: 'Or highlight a contract address before clicking — we prefill it for you.'
  },
  {
    icon: Brain,
    n: '04',
    title: 'Get the verdict',
    body: 'AI scans on-chain signals, holder patterns, and socials for rug indicators.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative px-6 md:px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">How it works</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Three clicks between you and <span className="font-serif italic">not getting rugged</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-border bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}