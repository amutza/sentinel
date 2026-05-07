import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Zap, Target, Medal } from 'lucide-react';
import { useLearnProgress } from '@/lib/useLearnProgress';

const TABS = ['XP Rankings', 'Sandbox Accuracy'];

export default function Leaderboard() {
  const [tab, setTab] = useState(0);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const { progress } = useLearnProgress();

  useEffect(() => {
    loadData();
  }, []);

  // Sync current user's XP to leaderboard on mount
  useEffect(() => {
    syncUserXP();
  }, [progress.xp]);

  const syncUserXP = async () => {
    const user = await base44.auth.me();
    if (!user) return;
    setCurrentUser(user);
    const existing = await base44.entities.LeaderboardEntry.filter({ user_email: user.email });
    if (existing.length > 0) {
      await base44.entities.LeaderboardEntry.update(existing[0].id, {
        total_xp: progress.xp,
        display_name: user.full_name || user.email.split('@')[0],
      });
    } else {
      await base44.entities.LeaderboardEntry.create({
        user_email: user.email,
        display_name: user.full_name || user.email.split('@')[0],
        total_xp: progress.xp,
        sandbox_attempts: 0,
        sandbox_correct: 0,
        success_rate: 0,
      });
    }
  };

  const loadData = async () => {
    setLoading(true);
    const data = await base44.entities.LeaderboardEntry.list('-total_xp', 50);
    setEntries(data);
    setLoading(false);
  };

  const xpRanked = [...entries].sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0));
  const accuracyRanked = [...entries]
    .filter(e => (e.sandbox_attempts || 0) >= 3)
    .sort((a, b) => (b.success_rate || 0) - (a.success_rate || 0));

  const ranked = tab === 0 ? xpRanked : accuracyRanked;

  const rankIcon = (i) => {
    if (i === 0) return '🥇';
    if (i === 1) return '🥈';
    if (i === 2) return '🥉';
    return `#${i + 1}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative noise flex flex-col">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)] pointer-events-none" />

      <header className="relative px-6 pt-6 pb-4 flex items-center gap-3 border-b border-border">
        <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-6 h-6 rounded-md bg-primary grid place-items-center">
          <Trophy className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-semibold tracking-tight text-sm">Leaderboard</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">community rankings</p>
        </div>
      </header>

      <main className="relative flex-1 px-6 py-6 max-w-lg mx-auto w-full space-y-5">

        {/* Current user stats */}
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-primary/30 bg-primary/5 p-4"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">Your Stats</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary mb-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <p className="font-bold text-lg">{progress.xp}</p>
                <p className="text-[10px] text-muted-foreground">Total XP</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-0.5">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <p className="font-bold text-lg">{entries.find(e => e.user_email === currentUser.email)?.sandbox_attempts || 0}</p>
                <p className="text-[10px] text-muted-foreground">Sandbox runs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-400 mb-0.5">
                  <Medal className="w-3.5 h-3.5" />
                </div>
                <p className="font-bold text-lg">{entries.find(e => e.user_email === currentUser.email)?.success_rate?.toFixed(0) || 0}%</p>
                <p className="text-[10px] text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex rounded-xl border border-border overflow-hidden">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                tab === i ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
          </div>
        ) : ranked.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">{tab === 1 ? '🎯' : '🏆'}</div>
            <p className="text-sm">
              {tab === 1 ? 'Complete at least 3 sandbox scenarios to appear here.' : 'No rankings yet — be the first!'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {ranked.map((entry, i) => {
              const isMe = currentUser && entry.user_email === currentUser.email;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-3 rounded-2xl border p-3.5 ${
                    isMe ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'
                  }`}
                >
                  <div className="w-8 text-center font-mono text-sm font-semibold text-muted-foreground">
                    {rankIcon(i)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${isMe ? 'text-primary' : ''}`}>
                      {entry.display_name || 'Anonymous'} {isMe && <span className="text-xs font-normal">(you)</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    {tab === 0 ? (
                      <div className="flex items-center gap-1 text-primary">
                        <Zap className="w-3.5 h-3.5" />
                        <span className="font-bold text-sm">{entry.total_xp || 0}</span>
                        <span className="text-xs text-muted-foreground">XP</span>
                      </div>
                    ) : (
                      <div className="text-right">
                        <p className="font-bold text-sm text-yellow-400">{(entry.success_rate || 0).toFixed(0)}%</p>
                        <p className="text-[10px] text-muted-foreground">{entry.sandbox_correct}/{entry.sandbox_attempts} correct</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}