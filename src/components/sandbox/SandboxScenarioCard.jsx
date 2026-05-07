import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function SandboxScenarioCard({ scenario, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 p-4 transition-all duration-200 group"
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{scenario.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-sm">{scenario.name}</span>
            <span className={`text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full ${scenario.difficultyColor}`}>
              {scenario.difficulty}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{scenario.description}</p>
          <p className="text-[10px] font-mono text-muted-foreground/60 mt-1">{scenario.signals.length} signals to analyze</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
    </button>
  );
}