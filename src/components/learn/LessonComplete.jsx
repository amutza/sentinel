import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Star } from 'lucide-react';

export default function LessonComplete({ lesson, onContinue }) {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-6xl mb-6"
      >
        {lesson.emoji}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2 mb-8"
      >
        <h2 className="text-2xl font-semibold">Lesson complete!</h2>
        <p className="text-muted-foreground">{lesson.title}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-2xl px-8 py-5 mb-8"
      >
        <Zap className="w-6 h-6 text-primary" />
        <span className="text-3xl font-bold text-primary">+{lesson.xp} XP</span>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onContinue}
        className="w-full max-w-sm py-4 rounded-xl bg-primary text-primary-foreground font-semibold tracking-tight hover:brightness-110 transition-all"
      >
        Keep going →
      </motion.button>
    </div>
  );
}