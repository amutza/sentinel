import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, ShieldAlert, Skull, RotateCcw } from 'lucide-react';

const verdictMap = {
  safe: { label: 'Looks OK', icon: ShieldCheck, color: 'text-primary', bar: 'bg-primary', ring: 'ring-primary/30' },
  caution: { label: 'Caution', icon: ShieldAlert, color: 'text-yellow-400', bar: 'bg-yellow-400', ring: 'ring-yellow-400/30' },
  high_risk: { label: 'High risk', icon: AlertTriangle, color: 'text-orange-400', bar: 'bg-orange-400', ring: 'ring-orange-400/30' },
  likely_rug: { label: 'Likely rug', icon: Skull, color: 'text-destructive', bar: 'bg-destructive', ring: 'ring-destructive/40' }
};

export default function RiskReport({ report, onReset }) {
  const v = verdictMap[report.verdict] || verdictMap.caution;
  const Icon = v.icon;
  const score = Math.max(0, Math.min(100, report.risk_score ?? 50));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className={`relative rounded-2xl border border-border bg-card p-5 ring-1 ${v.ring}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-lg bg-secondary grid place-items-center ${v.color}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Verdict</p>
              <p className={`font-semibold ${v.color}`}>{v.label}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Risk</p>
            <p className="text-2xl font-semibold tracking-tight">{score}<span className="text-sm text-muted-foreground">/100</span></p>
          </div>
        </div>

        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full ${v.bar}`}
          />
        </div>

        {report.summary && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{report.summary}</p>
        )}
      </div>

      {report.red_flags?.length > 0 && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-destructive mb-3">Red flags</p>
          <ul className="space-y-2">
            {report.red_flags.map((f, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-destructive">—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {report.green_flags?.length > 0 && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">Green flags</p>
          <ul className="space-y-2">
            {report.green_flags.map((f, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-primary">+</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl border border-border hover:border-primary hover:text-primary text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Check another contract
      </button>

      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 text-center">
        Not financial advice · DYOR
      </p>
    </motion.div>
  );
}