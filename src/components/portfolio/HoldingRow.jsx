import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

export default function HoldingRow({ holding, currentPrice, loadingPrice, onEdit, onDelete, index }) {
  const costBasis = holding.purchase_price_usd * holding.amount;
  const currentValue = currentPrice != null ? currentPrice * holding.amount : null;
  const pnl = currentValue != null ? currentValue - costBasis : null;
  const pnlPct = pnl != null && costBasis > 0 ? (pnl / costBasis) * 100 : null;

  const formatUsd = (n) => {
    if (n == null) return '—';
    if (Math.abs(n) < 0.01) return `$${n.toExponential(2)}`;
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-border bg-card p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{holding.token_name}</span>
            <span className="text-[10px] font-mono uppercase text-muted-foreground px-1.5 py-0.5 rounded bg-secondary">
              {holding.chain}
            </span>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground/60 truncate">{holding.contract_address}</p>
          {holding.notes && (
            <p className="text-xs text-muted-foreground mt-1 italic">"{holding.notes}"</p>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Buy price</p>
          <p className="font-mono font-medium mt-0.5">{formatUsd(holding.purchase_price_usd)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Current price</p>
          {loadingPrice && currentPrice == null ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground mt-0.5" />
          ) : (
            <p className="font-mono font-medium mt-0.5">{formatUsd(currentPrice)}</p>
          )}
        </div>
        <div>
          <p className="text-muted-foreground">P&L</p>
          {pnlPct != null ? (
            <div className={`flex items-center gap-0.5 mt-0.5 font-semibold ${pnl >= 0 ? 'text-primary' : 'text-destructive'}`}>
              {pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {pnl >= 0 ? '+' : ''}{pnlPct.toFixed(1)}%
            </div>
          ) : (
            <p className="text-muted-foreground mt-0.5">—</p>
          )}
        </div>
      </div>

      {pnl != null && (
        <div className={`mt-2 text-xs font-mono ${pnl >= 0 ? 'text-primary/70' : 'text-destructive/70'}`}>
          {pnl >= 0 ? '+' : ''}{formatUsd(pnl)} unrealized
        </div>
      )}
    </motion.div>
  );
}