import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LESSONS, LEVEL_ORDER, LEVEL_META } from '@/lib/lessons';
import { useLearnProgress } from '@/lib/useLearnProgress';
import LearnHeader from '@/components/learn/LearnHeader';
import LessonCard from '@/components/learn/LessonCard';
import LessonPlayer from '@/components/learn/LessonPlayer';
import LessonComplete from '@/components/learn/LessonComplete';

export default function Learn() {
  const { progress, level, xpInLevel, completeLesson, loseHeart, isCompleted } = useLearnProgress();
  const [activeLesson, setActiveLesson] = useState(null);
  const [showComplete, setShowComplete] = useState(false);

  const handleComplete = () => {
    completeLesson(activeLesson.id, activeLesson.xp);
    setActiveLesson(null);
    setShowComplete(activeLesson);
  };

  const handleCloseComplete = () => setShowComplete(false);

  // A lesson is locked if the previous lesson in the same level isn't done
  const isLocked = (lesson) => {
    const sameLevelLessons = LESSONS.filter(l => l.level === lesson.level);
    const idx = sameLevelLessons.findIndex(l => l.id === lesson.id);
    if (idx === 0) return false; // first lesson always unlocked
    return !isCompleted(sameLevelLessons[idx - 1].id);
  };

  const totalXp = LESSONS.reduce((sum, l) => sum + l.xp, 0);
  const earnedXp = LESSONS.filter(l => isCompleted(l.id)).reduce((sum, l) => sum + l.xp, 0);
  const overallPercent = Math.round((earnedXp / totalXp) * 100);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground noise">
        <LearnHeader
          level={level}
          xpInLevel={xpInLevel}
          xp={progress.xp}
          hearts={progress.hearts}
          streak={progress.streak}
        />

        <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
          {/* Back link */}
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>

          {/* Page title */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-semibold tracking-tight">
              Learn to trade <span className="font-serif italic text-primary">memecoins</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {progress.completedLessons.length}/{LESSONS.length} lessons · {overallPercent}% complete
            </p>
            {/* Overall progress bar */}
            <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${overallPercent}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* Levels */}
          {LEVEL_ORDER.map((lvl, li) => {
            const meta = LEVEL_META[lvl];
            const lvlLessons = LESSONS.filter(l => l.level === lvl);
            const done = lvlLessons.filter(l => isCompleted(l.id)).length;
            return (
              <motion.section
                key={lvl}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: li * 0.1 }}
              >
                <div className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-xl ${meta.bg} border ${meta.border}`}>
                  <span>{meta.emoji}</span>
                  <span className={`font-semibold text-sm ${meta.color}`}>{meta.label}</span>
                  <span className="ml-auto text-xs font-mono text-muted-foreground">{done}/{lvlLessons.length} done</span>
                </div>
                <div className="space-y-2.5">
                  {lvlLessons.map(lesson => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={isCompleted(lesson.id)}
                      isLocked={isLocked(lesson)}
                      onStart={setActiveLesson}
                    />
                  ))}
                </div>
              </motion.section>
            );
          })}

          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 text-center pb-8">
            Not financial advice · DYOR
          </p>
        </main>
      </div>

      {/* Lesson player overlay */}
      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          hearts={progress.hearts}
          onComplete={handleComplete}
          onLoseHeart={loseHeart}
          onClose={() => setActiveLesson(null)}
        />
      )}

      {/* Completion overlay */}
      {showComplete && (
        <LessonComplete
          lesson={showComplete}
          onContinue={handleCloseComplete}
        />
      )}
    </>
  );
}