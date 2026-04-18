import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative px-6 md:px-10 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Built for axiom.trade degens
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95]"
        >
          Don&apos;t get <span className="font-serif italic text-primary text-glow">rugged</span>.
          <br />
          One click away.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Drag the button to your bookmark bar. Paste any memecoin contract. Get an
          AI-powered rugpull breakdown in seconds — straight from axiom.trade.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" /> ~2s
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> On-chain checks
          </div>
          <div className="w-px h-3 bg-border" />
          <div>No wallet needed</div>
        </motion.div>
      </div>
    </section>
  );
}