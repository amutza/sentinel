import React, { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';

const verdictColor = {
  safe: '#a3e635',
  caution: '#facc15',
  high_risk: '#fb923c',
  likely_rug: '#ef4444'
};

const verdictLabel = {
  safe: 'SAFE',
  caution: 'CAUTION',
  high_risk: 'HIGH RISK',
  likely_rug: 'LIKELY RUG'
};

export default function RiskBadge({ report, ca }) {
  const [copied, setCopied] = useState(false);
  const color = verdictColor[report.verdict] || '#94a3b8';
  const label = verdictLabel[report.verdict] || 'UNKNOWN';
  const score = report.risk_score ?? 0;

  const svgBadge = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="28">
  <rect width="90" height="28" rx="4" fill="#18181b"/>
  <rect x="90" width="90" height="28" rx="4" fill="${color}"/>
  <text x="45" y="18" font-family="monospace" font-size="11" fill="#ffffff" text-anchor="middle">axiom.check</text>
  <text x="135" y="18" font-family="monospace" font-size="11" fill="#000000" font-weight="bold" text-anchor="middle">${label} ${score}</text>
</svg>`;

  const dataUri = `data:image/svg+xml;base64,${btoa(svgBadge)}`;
  const mdSnippet = `[![Rug Check](${dataUri})](${window.location.origin}/checker?ca=${encodeURIComponent(ca)})`;

  const copy = async () => {
    await navigator.clipboard.writeText(mdSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
        <Code2 className="w-3 h-3" /> Risk badge
      </p>
      <div className="flex items-center gap-4">
        <img src={dataUri} alt="risk badge" className="h-7" />
        <button
          onClick={copy}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied markdown' : 'Copy markdown'}
        </button>
      </div>
    </div>
  );
}