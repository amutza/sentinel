import { useState, useEffect } from 'react';

const STORAGE_KEY = 'axiom_learn_progress';

const defaults = {
  xp: 0,
  streak: 0,
  hearts: 5,
  lastActiveDate: null,
  completedLessons: [],
};

export function useLearnProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch {
      return defaults;
    }
  });

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Update streak on load
  useEffect(() => {
    const today = new Date().toDateString();
    const last = progress.lastActiveDate;
    if (last === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    setProgress(p => ({
      ...p,
      streak: last === yesterday ? p.streak + 1 : last ? 0 : p.streak,
      lastActiveDate: today,
      // Refill hearts daily
      hearts: last !== yesterday ? 5 : p.hearts,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completeLesson = (lessonId, earnedXp) => {
    setProgress(p => ({
      ...p,
      xp: p.xp + earnedXp,
      completedLessons: p.completedLessons.includes(lessonId)
        ? p.completedLessons
        : [...p.completedLessons, lessonId],
      lastActiveDate: new Date().toDateString(),
    }));
  };

  const loseHeart = () => {
    setProgress(p => ({ ...p, hearts: Math.max(0, p.hearts - 1) }));
  };

  const isCompleted = (lessonId) => progress.completedLessons.includes(lessonId);

  const level = Math.floor(progress.xp / 100) + 1;
  const xpInLevel = progress.xp % 100;

  return { progress, level, xpInLevel, completeLesson, loseHeart, isCompleted };
}