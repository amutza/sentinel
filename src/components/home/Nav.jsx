import React from 'react';
import { motion } from 'framer-motion';

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 flex items-center justify-between px-6 md:px-10 py-6"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md bg-primary grid place-items-center">
          <span className="text-primary-foreground font-black text-sm">Λ</span>
        </div>
        <span className="font-semibold tracking-tight text-lg">axiom<span className="text-primary">.</span>check</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
        <a href="#install" className="hover:text-foreground transition-colors">Install</a>
        <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
      </div>
      <a
        href="/checker"
        className="text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
      >
        Try it →
      </a>
    </motion.nav>
  );
}