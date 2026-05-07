import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Heart } from 'lucide-react';

export default function LessonPlayer({ lesson, hearts, onComplete, onLoseHeart, onClose }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const slide = lesson.slides[slideIndex];
  const isLast = slideIndex === lesson.slides.length - 1;
  const progress = ((slideIndex) / lesson.slides.length) * 100;

  const handleNext = () => {
    setSelected(null);
    setRevealed(false);
    if (isLast) {
      onComplete();
    } else {
      setSlideIndex(i => i + 1);
    }
  };

  const handleAnswer = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx !== slide.correct) {
      onLoseHeart();
    }
  };

  const canContinue = slide.type === 'info' || (slide.type === 'quiz' && revealed);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Progress bar + close */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center gap-0.5 text-destructive">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart key={i} className="w-3.5 h-3.5" fill={i < hearts ? 'currentColor' : 'none'} opacity={i < hearts ? 1 : 0.3} />
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="max-w-lg mx-auto"
          >
            {slide.type === 'info' ? (
              <div className="space-y-4">
                <div className="text-4xl text-center py-4">{lesson.emoji}</div>
                <h2 className="text-xl font-semibold leading-snug text-center">{slide.heading}</h2>
                <p className="text-muted-foreground leading-relaxed text-center">{slide.body}</p>
              </div>
            ) : (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold leading-snug">{slide.question}</h2>
                <div className="space-y-2.5">
                  {slide.options.map((opt, i) => {
                    let style = 'border-border bg-secondary/30 hover:border-primary/60';
                    if (revealed) {
                      if (i === slide.correct) style = 'border-primary bg-primary/10 text-primary';
                      else if (i === selected && i !== slide.correct) style = 'border-destructive bg-destructive/10 text-destructive';
                      else style = 'border-border bg-secondary/20 opacity-50';
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={revealed}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl p-4 text-sm ${selected === slide.correct ? 'bg-primary/10 border border-primary/30 text-primary' : 'bg-destructive/10 border border-destructive/30 text-destructive'}`}
                  >
                    <p className="font-semibold mb-1">{selected === slide.correct ? '✓ Correct!' : '✗ Not quite'}</p>
                    <p className="opacity-90">{slide.explanation}</p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="px-5 pb-6 pt-2 max-w-lg mx-auto w-full">
        {canContinue && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold tracking-tight hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            {isLast ? '🎉 Complete lesson' : <>Continue <ChevronRight className="w-4 h-4" /></>}
          </motion.button>
        )}
        {slide.type === 'info' && !canContinue && (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold tracking-tight hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}