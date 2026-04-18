import React from 'react';
import { Loader2, Search } from 'lucide-react';

export default function CheckerForm({ value, onChange, onSubmit, loading }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className="space-y-3"
    >
      <label className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        Contract address
      </label>
      <div className="relative">
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste CA — e.g. So11111111111111111111111111111111111111112"
          className="w-full px-4 py-4 pr-12 rounded-xl bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm transition-all placeholder:text-muted-foreground/60"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold tracking-tight disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Scanning on-chain…
          </>
        ) : (
          <>Run rugpull check</>
        )}
      </button>
    </form>
  );
}