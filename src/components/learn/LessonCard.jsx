import React from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import { LEVEL_META } from '@/lib/lessons';

export default function LessonCard({ lesson, isCompleted, isLocked, onStart }) {
  const meta = LEVEL_META[lesson.level];

  return (
    <button
      onClick={() => !isLocked && onStart(lesson)}
      disabled={isLocked}
      className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 
        ${isLocked ? 'opacity-40 cursor-not-allowed border-border bg-card/30' : 
          isCompleted ? `border-primary/40 bg-primary/5 hover:bg-primary/10` :
          'border-border bg-card hover:border-primary/50 hover:bg-card/80'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-0.5">{lesson.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono uppercase tracking-widest ${meta.color}`}>
              {meta.label}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">+{lesson.xp} XP</span>
          </div>
          <p className="font-semibold text-sm leading-tight">{lesson.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{lesson.slides.length} slides</p>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isLocked ? (
            <Lock className="w-4 h-4 text-muted-foreground" />
          ) : isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-primary" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-border" />
          )}
        </div>
      </div>
    </button>
  );
}