import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import CheckerForm from '@/components/checker/CheckerForm';
import RiskReport from '@/components/checker/RiskReport';
import { motion } from 'framer-motion';

const schema = {
  type: 'object',
  properties: {
    chain: { type: 'string', enum: ['solana', 'ethereum', 'base', 'bsc', 'unknown'] },
    risk_score: { type: 'number', description: '0-100, higher = riskier' },
    verdict: { type: 'string', enum: ['safe', 'caution', 'high_risk', 'likely_rug'] },
    summary: { type: 'string', description: '2-3 sentence plain-English explanation' },
    red_flags: { type: 'array', items: { type: 'string' } },
    green_flags: { type: 'array', items: { type: 'string' } }
  },
  required: ['risk_score', 'verdict', 'summary', 'red_flags', 'green_flags']
};

export default function Checker() {
  const [ca, setCa] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  // Prefill from ?ca= query (bookmarklet passes highlighted text)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get('ca');
    if (prefill) setCa(prefill);
  }, []);

  const runCheck = async () => {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const prompt = `You are an expert memecoin rugpull analyst for the axiom.trade community. Analyze the following contract address for rug/scam risk.

Contract address: ${ca.trim()}

Steps:
1. Detect chain from address format (Solana base58 ~32-44 chars; EVM 0x + 40 hex).
2. Use internet context to look up the token on Dexscreener, Solscan/Etherscan, RugCheck, GoPlus, Birdeye, or X to gather: liquidity, LP lock status, mint/freeze authority (Solana), contract ownership renouncement (EVM), holder concentration, top-holder % (especially dev/deployer), age, volume patterns, sniper clusters, socials, honeypot signals, blacklist functions.
3. Return risk_score 0-100 (0 = very safe, 100 = obvious rug).
4. Verdict thresholds: 0-29 safe, 30-54 caution, 55-79 high_risk, 80-100 likely_rug.
5. red_flags and green_flags: short bullet strings (max 10 words each), 2-5 items each. Cite specific data points.
6. summary: 2-3 crisp sentences, degen-friendly tone, no fluff.

If the token cannot be found anywhere, return verdict "high_risk", score ~70, and explain the absence clearly in red_flags.`;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: schema,
        model: 'gemini_3_flash'
      });

      setReport(res);

      // Fire-and-forget log
      base44.entities.RugCheck.create({
        contract_address: ca.trim(),
        chain: res.chain || 'unknown',
        risk_score: res.risk_score,
        verdict: res.verdict,
        summary: res.summary,
        red_flags: res.red_flags,
        green_flags: res.green_flags
      }).catch(() => {});
    } catch (e) {
      setError('Scan failed. Try again in a moment.');
    }
    setLoading(false);
  };

  const reset = () => {
    setReport(null);
    setCa('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative noise flex flex-col">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)] pointer-events-none" />

      <header className="relative px-6 pt-6 pb-4 flex items-center gap-2.5 border-b border-border">
        <div className="w-6 h-6 rounded-md bg-primary grid place-items-center">
          <span className="text-primary-foreground font-black text-xs">Λ</span>
        </div>
        <div className="flex-1">
          <p className="font-semibold tracking-tight text-sm">Rugpull Checker</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">axiom.check</p>
        </div>
      </header>

      <main className="relative flex-1 px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!report ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight leading-tight">
                  Scan a <span className="font-serif italic text-primary">memecoin</span>
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Paste a contract address. AI analyzes on-chain signals & socials.
                </p>
              </div>

              <CheckerForm
                value={ca}
                onChange={setCa}
                onSubmit={runCheck}
                loading={loading}
              />

              {error && (
                <div className="text-sm text-destructive border border-destructive/30 bg-destructive/5 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              {loading && (
                <div className="space-y-2 text-xs font-mono text-muted-foreground">
                  <LoadingLine text="Detecting chain…" delay={0} />
                  <LoadingLine text="Fetching liquidity & holders…" delay={0.6} />
                  <LoadingLine text="Scanning for rug patterns…" delay={1.4} />
                  <LoadingLine text="Cross-checking socials…" delay={2.2} />
                </div>
              )}
            </div>
          ) : (
            <RiskReport report={report} onReset={reset} />
          )}
        </motion.div>
      </main>
    </div>
  );
}

function LoadingLine({ text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-2"
    >
      <span className="text-primary">›</span> {text}
    </motion.div>
  );
}