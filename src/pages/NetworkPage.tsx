import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  UserCheck,
  CheckCircle2,
  Building2,
  MapPin,
  MessageSquare,
  Sparkles,
  Award,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';

export const NetworkPage: React.FC = () => {
  const { connections, toggleConnectionStatus, currentUser, showToast } = useApp();
  const { currentPath, navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'all' | 'connected' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConnections = connections.filter((c) => {
    const matchesTab = activeTab === 'all' || c.status === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const connectedCount = connections.filter(c => c.status === 'connected').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Users className="w-3.5 h-3.5" />
            <span>THENAM Academic & Peer Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Connect with Students & Mentors
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Collaborate on AI projects, discuss lab milestones, and expand your technical network across top Tamil Nadu colleges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-2xl font-black text-indigo-400">{connectedCount}</span>
            <span className="text-[10px] text-slate-300 block font-medium">My Connections</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-2xl font-black text-amber-400">12+</span>
            <span className="text-[10px] text-slate-300 block font-medium">Colleges Represented</span>
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Discover All Peers ({connections.length})
          </button>
          <button
            onClick={() => setActiveTab('connected')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'connected' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            My Connections ({connectedCount})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pending' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending Requests ({connections.filter(c => c.status === 'pending').length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, college, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden"
          />
        </div>
      </div>

      {/* Network Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections.map((person) => {
          const isConnected = person.status === 'connected';
          const isPending = person.status === 'pending';

          return (
            <div
              key={person.id}
              id={`connection-card-${person.id}`}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-2xs shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3
                        onClick={() => navigate(`/profile/${person.id}`)}
                        className="text-base font-bold text-slate-900 truncate hover:text-indigo-600 cursor-pointer"
                      >
                        {person.name}
                      </h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    </div>
                    <p className="text-xs text-indigo-600 font-semibold truncate">{person.headline}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{person.college}</p>
                  </div>
                </div>

                {/* Mutual Connections */}
                <p className="text-[11px] text-slate-400 font-medium mt-3">
                  {person.mutualConnections} mutual student connections
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  id={`btn-connect-${person.id}`}
                  onClick={() => toggleConnectionStatus(person.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                      : isPending
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Connected</span>
                    </>
                  ) : isPending ? (
                    <>
                      <span>Pending</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    showToast(`Chat channel opened with ${person.name}`);
                    navigate('/messages');
                  }}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  title="Direct Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
