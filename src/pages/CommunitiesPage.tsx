import React, { useState } from 'react';
import {
  Users,
  Search,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Plus,
  ArrowRight,
  ShieldCheck,
  Hash
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';

export const CommunitiesPage: React.FC = () => {
  const { communities, toggleJoinCommunity } = useApp();
  const { navigate } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.trendingTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Users className="w-3.5 h-3.5" />
            <span>Special Interest Student Hubs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Engineering Communities
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Collaborative tech channels dedicated to model training, hackathon prep, peer code reviews, and project matching.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
          <span className="text-2xl font-black text-indigo-400">{communities.length}</span>
          <span className="text-[10px] text-slate-300 block font-medium">Active Circles</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search communities by topic, domain, or framework..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden"
          />
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCommunities.map((c) => (
          <div
            key={c.id}
            id={`community-card-${c.id}`}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  {c.icon || '🚀'}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {c.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 truncate mt-0.5">{c.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{c.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {c.trendingTopics.map(t => (
                  <span key={t} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-md flex items-center gap-0.5">
                    <Hash className="w-3 h-3 text-slate-400" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                <span className="font-semibold text-slate-700">{c.memberCount} active student engineers</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Hub
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                id={`btn-join-community-${c.id}`}
                onClick={() => toggleJoinCommunity(c.id)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  c.isJoined
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-rose-50 hover:text-rose-700'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                }`}
              >
                {c.isJoined ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Joined (Member)</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Join Community</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/home')}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discussions</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
