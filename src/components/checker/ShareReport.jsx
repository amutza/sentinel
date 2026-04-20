import React, { useState } from 'react';
import { Share2, Copy, Check, Twitter } from 'lucide-react';

const verdictEmoji = {
  safe: '🟢',
  caution: '🟡',
  high_risk: '🟠',
  likely_rug: '🔴'
};

const verdictLabel = {
  safe: 'Looks OK',
  caution: 'Caution',
  high_risk: 'High Risk',
  likely_rug: 'Likely Rug'
};

export default function ShareReport({ report, ca }) {
  const [copied, setCopied] = useState(false);

  const shareText = `${verdictEmoji[report.verdict]} ${verdictLabel[report.verdict]} — Risk Score: ${report.risk_score}/100\n\n${report.summary}\n\nChecked on axiom.check\nCA: ${ca}`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const copyLink = async () => {
    const pageUrl = `${window.location.origin}/checker?ca=${encodeURIComponent(ca)}`;
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
        <Share2 className="w-3 h-3" /> Share report
      </p>
      <div className="flex gap-2">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-secondary/30 hover:border-primary hover:text-primary text-sm font-medium transition-colors"
        >
          <Twitter className="w-3.5 h-3.5" /> Post on X
        </a>
        <button
          onClick={copyLink}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-secondary/30 hover:border-primary hover:text-primary text-sm font-medium transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}