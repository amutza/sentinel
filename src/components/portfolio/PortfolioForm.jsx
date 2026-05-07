import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const CHAINS = ['solana', 'ethereum', 'base', 'bsc'];

export default function PortfolioForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    token_name: initial?.token_name || '',
    contract_address: initial?.contract_address || '',
    chain: initial?.chain || 'solana',
    purchase_price_usd: initial?.purchase_price_usd || '',
    amount: initial?.amount || '',
    notes: initial?.notes || '',
  });

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      purchase_price_usd: parseFloat(form.purchase_price_usd),
      amount: parseFloat(form.amount),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-2xl border border-primary/30 bg-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-sm">{initial ? 'Edit holding' : 'Add holding'}</p>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Token name</label>
            <input
              required
              value={form.token_name}
              onChange={e => set('token_name', e.target.value)}
              placeholder="$PEPE"
              className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Chain</label>
            <select
              value={form.chain}
              onChange={e => set('chain', e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
            >
              {CHAINS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Contract address</label>
          <input
            required
            value={form.contract_address}
            onChange={e => set('contract_address', e.target.value)}
            placeholder="0x… or Solana CA"
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm font-mono outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Buy price (USD)</label>
            <input
              required
              type="number"
              step="any"
              min="0"
              value={form.purchase_price_usd}
              onChange={e => set('purchase_price_usd', e.target.value)}
              placeholder="0.000001"
              className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Amount held</label>
            <input
              required
              type="number"
              step="any"
              min="0"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
              placeholder="1000000"
              className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">Notes (optional)</label>
          <input
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="e.g. bought on hype, watching dev wallet"
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors">
            Cancel
          </button>
          <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
            Save
          </button>
        </div>
      </form>
    </motion.div>
  );
}