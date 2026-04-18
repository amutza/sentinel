import React from 'react';

export default function Footer() {
  return (
    <footer className="relative px-6 md:px-10 py-12 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary grid place-items-center">
            <span className="text-primary-foreground font-black text-[10px]">Λ</span>
          </div>
          <span className="font-mono">axiom.check — not financial advice</span>
        </div>
        <div className="font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} · Built for degens
        </div>
      </div>
    </footer>
  );
}