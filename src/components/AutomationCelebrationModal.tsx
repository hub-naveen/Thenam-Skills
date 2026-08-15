import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
  Flame,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';

export const AutomationCelebrationModal: React.FC = () => {
  const { activeAutomationModal, closeAutomationModal, currentUser } = useApp();
  const { navigate } = useRouter();

  if (!activeAutomationModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          id="automation-celebration-modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={closeAutomationModal}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-amber-500 via-amber-600 to-orange-500 text-white shadow-xl shadow-amber-500/25 mb-2">
              <Award className="w-9 h-9" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Automated Achievement Engine Triggered</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Congratulations, {currentUser.name}!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              You have completed <strong className="text-slate-900">{activeAutomationModal.courseName}</strong> and passed the proctored assessment.
            </p>
          </div>

          {/* 5-Step Automation Pipeline Visualizer */}
          <div className="mt-6 bg-slate-50 rounded-2xl p-4.5 border border-slate-200/80 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Automated Pipeline Execution
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800 flex-1">1. Course Progress updated to 100%</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Completed</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800 flex-1">2. Verifiable Digital Certificate Generated</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Issued</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800 flex-1">
                  3. Skills added to student profile: <span className="text-indigo-600 font-bold">{activeAutomationModal.skillsAdded.join(', ')}</span>
                </span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">+Verified</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800 flex-1">4. Student Metrics incremented (+{activeAutomationModal.xpGained} XP, +1 Streak)</span>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Level Up</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800 flex-1">5. Achievement Activity Card published to Network Feed</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Live</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="btn-celebration-view-certificate"
              onClick={() => {
                closeAutomationModal();
                navigate(`/certificate/${activeAutomationModal.certificateId}`);
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/20 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>View Official Certificate</span>
            </button>

            <button
              id="btn-celebration-go-feed"
              onClick={() => {
                closeAutomationModal();
                navigate('/home');
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all"
            >
              <span>See in Home Feed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
