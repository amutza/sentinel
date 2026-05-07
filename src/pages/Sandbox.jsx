import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import SandboxScenarioCard from '@/components/sandbox/SandboxScenarioCard';
import SandboxReport from '@/components/sandbox/SandboxReport';
import { SCENARIOS } from '@/lib/sandboxScenarios';
import { ArrowLeft, FlaskConical } from 'lucide-react';

export default function Sandbox() {
  const [activeScenario, setActiveScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [userPrediction, setUserPrediction] = useState(null);

  const runAnalysis = async (scenario, prediction) => {
    setUserPrediction(prediction);
    setLoading(true);
    setReport(null);

    const prompt = `You are an expert memecoin rugpull analyst running a PRACTICE SANDBOX simulation for educational purposes.

Analyze this HYPOTHETICAL memecoin scenario (not a real contract):

Token Name: ${scenario.name}
Scenario Description: ${scenario.description}
Fake Contract Address: ${scenario.fakeCA}
On-chain signals presented:
${scenario.signals.map(s => `- ${s}`).join('\n')}

The student predicted this token is: "${prediction}"

Your task:
1. Analyze the on-chain signals above and give a risk_score (0-100), verdict (safe/caution/high_risk/likely_rug).
2. List 2-4 red_flags and 1-3 green_flags based on the signals.
3. Write a 2-3 sentence educational summary explaining the key signals.
4. In the "feedback" field, give personalized feedback on whether the student's prediction of "${prediction}" was correct or not, and what they should learn from this scenario. Be encouraging but honest. Max 2 sentences.
5. Set "student_was_correct" to true if the student's prediction roughly matches your verdict (safe/caution → safe, high_risk/likely_rug → risky).

Remember: this is a TRAINING scenario to help people learn to spot rugs. Be educational.`;

    const res = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          risk_score: { type: 'number' },
          verdict: { type: 'string', enum: ['safe', 'caution', 'high_risk', 'likely_rug'] },
          summary: { type: 'string' },
          red_flags: { type: 'array', items: { type: 'string' } },
          green_flags: { type: 'array', items: { type: 'string' } },
          feedback: { type: 'string' },
          student_was_correct: { type: 'boolean' },
        },
        required: ['risk_score', 'verdict', 'summary', 'red_flags', 'green_flags', 'feedback', 'student_was_correct'],
      },
    });

    setReport(res);
    setLoading(false);
  };

  const reset = () => {
    setReport(null);
    setActiveScenario(null);
    setUserPrediction(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative noise flex flex-col">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)] pointer-events-none" />

      <header className="relative px-6 pt-6 pb-4 flex items-center gap-3 border-b border-border">
        <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-6 h-6 rounded-md bg-primary grid place-items-center">
          <FlaskConical className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-semibold tracking-tight text-sm">Practice Sandbox</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">axiom.learn · no real funds</p>
        </div>
      </header>

      <main className="relative flex-1 px-6 py-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {!activeScenario && !report && (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl font-semibold tracking-tight leading-tight">
                  Test your <span className="font-serif italic text-primary">instincts</span>
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Analyze hypothetical memecoins. Make a call. See how the AI scores your reasoning.
                </p>
              </div>

              <div className="space-y-3">
                {SCENARIOS.map((s) => (
                  <SandboxScenarioCard
                    key={s.id}
                    scenario={s}
                    onSelect={() => setActiveScenario(s)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeScenario && !report && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ScenarioAnalyzer
                scenario={activeScenario}
                loading={loading}
                onSubmit={(prediction) => runAnalysis(activeScenario, prediction)}
                onBack={() => setActiveScenario(null)}
              />
            </motion.div>
          )}

          {report && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SandboxReport
                report={report}
                scenario={activeScenario}
                userPrediction={userPrediction}
                onReset={reset}
                onNextScenario={() => {
                  const currentIdx = SCENARIOS.findIndex(s => s.id === activeScenario.id);
                  const next = SCENARIOS[(currentIdx + 1) % SCENARIOS.length];
                  setActiveScenario(next);
                  setReport(null);
                  setUserPrediction(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function ScenarioAnalyzer({ scenario, loading, onSubmit, onBack }) {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> All scenarios
      </button>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{scenario.emoji}</span>
          <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${scenario.difficultyColor}`}>
            {scenario.difficulty}
          </span>
        </div>
        <h2 className="text-xl font-semibold">{scenario.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Fake Contract Address</p>
        <p className="font-mono text-xs text-primary break-all">{scenario.fakeCA}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">On-Chain Signals</p>
        {scenario.signals.map((signal, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <span className="text-muted-foreground">›</span>
            <span>{signal}</span>
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Your verdict — is this token:</p>
        <div className="grid grid-cols-2 gap-2">
          {['Safe to ape', 'Proceed with caution', 'High risk', 'Likely a rug'].map((opt) => (
            <button
              key={opt}
              onClick={() => setPrediction(opt)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                prediction === opt
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-secondary/30 hover:border-primary/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => prediction && onSubmit(prediction)}
        disabled={!prediction || loading}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold tracking-tight hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Analyzing…
          </>
        ) : (
          'Submit & Analyze'
        )}
      </button>
    </div>
  );
}