import React from 'react';
import { Heart, Zap, Flame } from 'lucide-react';

export default function LearnHeader({ level, xpInLevel, xp, hearts, streak }) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-4">
      <div className="flex items-center gap-1.5 min-w-0">
        <div className="w-6 h-6 rounded-md bg-primary grid place-items-center flex-shrink-0">
          <span className="text-primary-foreground font-black text-xs">Λ</span>
        </div>
        <span className="font-semibold text-sm truncate hidden sm:block">axiom.learn</span>
      </div>

      <div className="flex-1 flex items-center gap-1 min-w-0">
        <span className="text-[10px] font-mono text-muted-foreground mr-1 hidden sm:block">LVL {level}</span>
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden max-w-[120px]">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${xpInLevel}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground ml-1">{xp} XP</span>
      </div>

      <div className="flex items-center gap-3">
        {streak > 0 && (
          <div className="flex items-center gap-1 text-orange-400">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-semibold">{streak}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-destructive">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className="w-4 h-4"
              fill={i < hearts ? 'currentColor' : 'none'}
              opacity={i < hearts ? 1 : 0.3}
            />
          ))}
        </div>
      </div>
    </header>
  );
}