import React from 'react';
import {
  Trophy,
  Flame,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Star,
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';

export const AchievementsPage: React.FC = () => {
  const { currentUser } = useApp();
  const { navigate } = useRouter();

  const milestones = [
    {
      id: 'm1',
      title: 'Deep Learning Pioneer',
      desc: 'Completed Proctored PyTorch & CNN Mastery Capstone',
      xp: 500,
      unlocked: true,
      icon: Sparkles,
      date: 'Earned 2 days ago'
    },
    {
      id: 'm2',
      title: '14-Day Velocity Streak',
      desc: 'Maintained uninterrupted daily technical code sessions',
      xp: 300,
      unlocked: true,
      icon: Flame,
      date: 'Active'
    },
    {
      id: 'm3',
      title: 'Database Architect',
      desc: 'Passed relational database normalization and index optimization labs',
      xp: 400,
      unlocked: true,
      icon: Award,
      date: 'Earned 1 week ago'
    },
    {
      id: 'm4',
      title: 'Open Source Contributor',
      desc: 'Published 3+ verified public repositories on THENAM Showcase',
      xp: 600,
      unlocked: true,
      icon: Trophy,
      date: 'Earned 2 weeks ago'
    },
    {
      id: 'm5',
      title: 'Transformer Visionary',
      desc: 'Implement Attention mechanism from scratch and deploy quantized model',
      xp: 800,
      unlocked: false,
      icon: Lock,
      progress: '70%'
    },
    {
      id: 'm6',
      title: 'Campus Hackathon Finalist',
      desc: 'Qualify in the top 3 teams for THENAM 2026 Inter-College AI Summit',
      xp: 1000,
      unlocked: false,
      icon: Lock,
      progress: 'Upcoming (Oct 2026)'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>Student Gamification & Mastery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Achievements & Skill Mastery
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
            Real-time XP, daily consistency streaks, and verified technical badges calculated directly from course completions.
          </p>
        </div>

        {/* Global Rank & XP pill */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-2xl font-black text-amber-400">#{currentUser.metrics.globalRank}</span>
            <span className="text-[10px] text-slate-300 block font-medium">Tamil Nadu Rank</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-2xl font-black text-emerald-400">{currentUser.metrics.xpPoints}</span>
            <span className="text-[10px] text-slate-300 block font-medium">Total Skill XP</span>
          </div>
        </div>
      </div>

      {/* 3 Metric Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Streak</span>
            <h3 className="text-2xl font-black text-slate-900">{currentUser.metrics.streakDays} Days</h3>
            <p className="text-xs text-slate-500">2x XP multiplier active</p>
          </div>
        </div>

        {/* Level Progression */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
            <Zap className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Skill Level 8</span>
            <h3 className="text-xl font-black text-slate-900">AI Engineer Tier</h3>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-indigo-600 w-3/4 rounded-full" />
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">380 XP until Level 9</span>
          </div>
        </div>

        {/* Verified Badges */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Badges</span>
            <h3 className="text-2xl font-black text-slate-900">4 Masteries</h3>
            <p className="text-xs text-emerald-600 font-semibold">100% Proctored Passed</p>
          </div>
        </div>
      </div>

      {/* Badges & Milestones Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Milestones & Competency Badges</h3>
            <p className="text-xs text-slate-500">Unlock official accolades by completing coursework and publishing projects</p>
          </div>

          <button
            onClick={() => navigate('/learn')}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <span>Earn More XP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((m) => {
            const IconComp = m.icon;
            return (
              <div
                key={m.id}
                className={`p-5 rounded-2xl border transition-all ${
                  m.unlocked
                    ? 'bg-slate-50/70 border-slate-200 shadow-2xs hover:shadow-xs'
                    : 'bg-slate-50/30 border-dashed border-slate-300 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    m.unlocked ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                    m.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    +{m.xp} XP
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">{m.date || `Progress: ${m.progress}`}</span>
                  {m.unlocked ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
