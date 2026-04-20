import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ThumbsUp, ThumbsDown, Users } from 'lucide-react';

export default function CommunityVerdicts({ ca }) {
  const [votes, setVotes] = useState({ agree: 0, disagree: 0 });
  const [myVote, setMyVote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVotes();
  }, [ca]);

  const loadVotes = async () => {
    const all = await base44.entities.CommunityVerdict.filter({ contract_address: ca });
    const agree = all.filter(v => v.vote === 'agree').length;
    const disagree = all.filter(v => v.vote === 'disagree').length;
    setVotes({ agree, disagree });
  };

  const castVote = async (vote) => {
    if (myVote || loading) return;
    setLoading(true);
    await base44.entities.CommunityVerdict.create({ contract_address: ca, vote });
    setMyVote(vote);
    setVotes(prev => ({ ...prev, [vote]: prev[vote] + 1 }));
    setLoading(false);
  };

  const total = votes.agree + votes.disagree;
  const agreePercent = total > 0 ? Math.round((votes.agree / total) * 100) : 50;

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
        <Users className="w-3 h-3" /> Community verdict
        {total > 0 && <span className="ml-auto">{total} vote{total !== 1 ? 's' : ''}</span>}
      </p>

      {total > 0 && (
        <div className="mb-3">
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${agreePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
            <span className="text-primary">{agreePercent}% agree with AI</span>
            <span>{100 - agreePercent}% disagree</span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => castVote('agree')}
          disabled={!!myVote || loading}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors
            ${myVote === 'agree'
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border bg-secondary/30 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          Agree {votes.agree > 0 && `(${votes.agree})`}
        </button>
        <button
          onClick={() => castVote('disagree')}
          disabled={!!myVote || loading}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors
            ${myVote === 'disagree'
              ? 'border-destructive text-destructive bg-destructive/10'
              : 'border-border bg-secondary/30 hover:border-destructive hover:text-destructive disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          Disagree {votes.disagree > 0 && `(${votes.disagree})`}
        </button>
      </div>

      {!myVote && (
        <p className="mt-2 text-[10px] text-center text-muted-foreground/60 font-mono">
          Do you agree with the AI verdict?
        </p>
      )}
      {myVote && (
        <p className="mt-2 text-[10px] text-center text-muted-foreground font-mono">
          Thanks for your vote!
        </p>
      )}
    </div>
  );
}