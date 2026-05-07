import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, RefreshCw, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import PortfolioForm from '@/components/portfolio/PortfolioForm';
import HoldingRow from '@/components/portfolio/HoldingRow';

export default function Portfolio() {
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingHolding, setEditingHolding] = useState(null);

  useEffect(() => {
    loadHoldings();
  }, []);

  const loadHoldings = async () => {
    const data = await base44.entities.PortfolioHolding.list('-created_date');
    setHoldings(data);
    if (data.length > 0) fetchPrices(data);
  };

  const fetchPrices = async (holdingsList) => {
    setLoadingPrices(true);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a crypto price API. For each of these tokens, return the current approximate market price in USD. Use the contract address and chain to identify the token. If you can't find a price, return null.

Tokens:
${holdingsList.map(h => `- Name: ${h.token_name}, CA: ${h.contract_address}, Chain: ${h.chain}`).join('\n')}

Return a JSON object where keys are contract_address and values are current_price_usd (number or null).`,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          prices: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                contract_address: { type: 'string' },
                current_price_usd: { type: ['number', 'null'] },
                token_symbol: { type: 'string' },
              },
              required: ['contract_address', 'current_price_usd'],
            },
          },
        },
        required: ['prices'],
      },
    });
    const priceMap = {};
    (result.prices || []).forEach(p => {
      priceMap[p.contract_address] = p.current_price_usd;
    });
    setPrices(priceMap);
    setLoadingPrices(false);
  };

  const handleSave = async (data) => {
    if (editingHolding) {
      await base44.entities.PortfolioHolding.update(editingHolding.id, data);
    } else {
      await base44.entities.PortfolioHolding.create(data);
    }
    setShowForm(false);
    setEditingHolding(null);
    loadHoldings();
  };

  const handleDelete = async (id) => {
    await base44.entities.PortfolioHolding.delete(id);
    setHoldings(prev => prev.filter(h => h.id !== id));
  };

  const handleEdit = (holding) => {
    setEditingHolding(holding);
    setShowForm(true);
  };

  // Portfolio summary
  const summary = holdings.reduce((acc, h) => {
    const currentPrice = prices[h.contract_address];
    const costBasis = h.purchase_price_usd * h.amount;
    acc.totalCost += costBasis;
    if (currentPrice != null) {
      const currentValue = currentPrice * h.amount;
      acc.totalValue += currentValue;
      acc.hasLiveData = true;
    }
    return acc;
  }, { totalCost: 0, totalValue: 0, hasLiveData: false });

  const totalPnl = summary.totalValue - summary.totalCost;
  const totalPnlPct = summary.totalCost > 0 ? (totalPnl / summary.totalCost) * 100 : 0;

  return (
    <div className="min-h-screen bg-background text-foreground relative noise flex flex-col">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)] pointer-events-none" />

      <header className="relative px-6 pt-6 pb-4 flex items-center gap-3 border-b border-border">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-6 h-6 rounded-md bg-primary grid place-items-center">
          <Wallet className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-semibold tracking-tight text-sm">My Portfolio</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">unrealized P&amp;L tracker</p>
        </div>
        <button
          onClick={() => holdings.length > 0 && fetchPrices(holdings)}
          disabled={loadingPrices || holdings.length === 0}
          className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-40"
          title="Refresh prices"
        >
          <RefreshCw className={`w-4 h-4 ${loadingPrices ? 'animate-spin' : ''}`} />
        </button>
      </header>

      <main className="relative flex-1 px-6 py-6 max-w-lg mx-auto w-full space-y-6">

        {/* Summary card */}
        {holdings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Portfolio Summary</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Cost basis</p>
                <p className="font-semibold text-sm mt-0.5">${summary.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              {summary.hasLiveData && (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground">Current value</p>
                    <p className="font-semibold text-sm mt-0.5">${summary.totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Unrealized P&L</p>
                    <div className={`flex items-center gap-1 mt-0.5 ${totalPnl >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {totalPnl >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span className="font-semibold text-sm">
                        {totalPnl >= 0 ? '+' : ''}{totalPnlPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </>
              )}
              {loadingPrices && !summary.hasLiveData && (
                <div className="col-span-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Fetching live prices…
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Add button */}
        <button
          onClick={() => { setEditingHolding(null); setShowForm(true); }}
          className="w-full py-3 rounded-xl border border-dashed border-border hover:border-primary hover:text-primary text-sm font-medium transition-all flex items-center justify-center gap-2 text-muted-foreground"
        >
          <Plus className="w-4 h-4" /> Add holding
        </button>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <PortfolioForm
              initial={editingHolding}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingHolding(null); }}
            />
          )}
        </AnimatePresence>

        {/* Holdings list */}
        <div className="space-y-3">
          <AnimatePresence>
            {holdings.map((h, i) => (
              <HoldingRow
                key={h.id}
                holding={h}
                currentPrice={prices[h.contract_address]}
                loadingPrice={loadingPrices}
                onEdit={() => handleEdit(h)}
                onDelete={() => handleDelete(h.id)}
                index={i}
              />
            ))}
          </AnimatePresence>
        </div>

        {holdings.length === 0 && !showForm && (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">💼</div>
            <p className="text-sm">No holdings yet. Add your first memecoin above.</p>
          </div>
        )}

        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 text-center pb-8">
          Prices are estimates · Not financial advice
        </p>
      </main>
    </div>
  );
}