import React from 'react';
import {
  Sliders,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  Bell,
  Eye,
  Briefcase,
  CheckCircle2,
  Lock,
  User,
  Database
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, currentUser, updateCurrentUser, showToast } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Settings & Automated Experience</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Control the automatic issuance pipeline, feed publication triggers, and privacy controls.
            </p>
          </div>
        </div>
      </div>

      {/* Automated Learning Experience Configuration */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-900">Automated Learning Activity Triggers</h2>
        </div>

        <div className="space-y-4 divide-y divide-slate-100">
          
          {/* Auto-Add Course Completion */}
          <div className="flex items-start justify-between gap-4 pt-2">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Auto-Issue Verified Certificate on 100% Course Completion</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                When you finish all video modules and score ≥80% in the assessment, automatically generate an official cryptographic certificate.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.autoAddCompletedCourses}
                onChange={(e) => updateSettings({ autoAddCompletedCourses: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Auto-Create Activity Card */}
          <div className="flex items-start justify-between gap-4 pt-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Auto-Publish Milestone to THENAM Community Feed</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Automatically create a rich activity card on the public network feed whenever you earn a new certificate or finish a milestone.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.autoCreateAchievementActivity}
                onChange={(e) => updateSettings({ autoCreateAchievementActivity: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Auto-Add Skills to Profile */}
          <div className="flex items-start justify-between gap-4 pt-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Auto-Sync Course Skills into Profile Competencies</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Appends the course skills (e.g. Python, TensorFlow) directly to your verified skills showcase on your public portfolio.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.showAchievementsInFeed}
                onChange={(e) => updateSettings({ showAchievementsInFeed: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Auto-Add Workshop Attendance */}
          <div className="flex items-start justify-between gap-4 pt-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Auto-Log Workshop & Webinar Attendance</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                When you attend live Google or THENAM speaker events, automatically append verified attendance credits to your learning timeline.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.autoAddWorkshopAttendance}
                onChange={(e) => updateSettings({ autoAddWorkshopAttendance: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Talent & Privacy Discovery */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900">Recruiter & Talent Hub Visibility</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Showcase Profile in THENAM Talent Discovery Hub</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Allows verified hiring partners and campus recruiters to view your skill credentials and send interview invitations.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.talentSearchDiscoverable}
                onChange={(e) => updateSettings({ talentSearchDiscoverable: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Database className="w-5 h-5 text-slate-600" />
          <h2 className="text-base font-bold text-slate-900">Local Cache & Reset Options</h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Reset Demo Data</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Clears local cache and restores the pristine default state of courses, certificates, and achievements.
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors"
          >
            Reset All Data to Default
          </button>
        </div>
      </div>
    </div>
  );
};
