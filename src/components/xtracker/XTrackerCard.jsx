import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const SIGNAL_CONFIG = {
  contract_drop: { label: 'CA Drop', color: 'text-primary', bg: 'bg-primary/10 border-primary/30' },
  shill_call:    { label: 'Shill Call', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' },
  early_gem:     { label: 'Early Gem', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/30' },
  warning:       { label: 'Warning', color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30' },
  alpha:         { label: 'Alpha', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/30' },
};

const SENTIMENT_EMOJI = { bullish: '📈', bearish: '📉', neutral: '➡️' };

export default function XTrackerCard({ item, index, onCheckCA }) {
  const [copied, setCopied] = useState(false);
  const sig = SIGNAL_CONFIG[item.signal_type] || SIGNAL_CONFIG.alpha;

  const copyCA = async (ca) => {
    await navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-border bg-card p-4 space-y-3"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold uppercase">
            {item.handle[0]}
          </div>
          <div>
            <span className="text-sm font-semibold">@{item.handle}</span>
            <span className="ml-2 text-[10px] font-mono text-muted-foreground">{item.posted_at}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${sig.bg} ${sig.color}`}>
            {sig.label}
          </span>
          <span className="text-base">{SENTIMENT_EMOJI[item.sentiment] || '➡️'}</span>
        </div>
      </div>

      {/* Tweet text */}
      <p className="text-sm text-muted-foreground leading-relaxed">{item.post_text}</p>

      {/* Token mention pill */}
      {item.token_mention && (
        <div className="inline-block text-xs font-mono font-semibold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-full">
          {item.token_mention}
        </div>
      )}

      {/* Contract address block */}
      {item.contract_address && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Contract Address Detected</p>
          <p className="text-xs font-mono break-all text-foreground/80">{item.contract_address}</p>
          <div className="flex gap-2">
            <button
              onClick={() => onCheckCA(item.contract_address)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:brightness-110 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Rug Check
            </button>
            <button
              onClick={() => copyCA(item.contract_address)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs hover:border-primary hover:text-primary transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy CA'}
            </button>
          </div>
        </div>
      )}

      {/* External link */}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="w-3 h-3" /> View on X
        </a>
      )}
    </motion.div>
  );
}