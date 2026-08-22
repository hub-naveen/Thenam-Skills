import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Plus,
  BarChart3,
  TrendingUp,
  FileCheck,
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';

export const AdminPage: React.FC = () => {
  const { courses, certificates, currentUser, triggerCourseCompletionAutomation, showToast } = useApp();
  const { navigate } = useRouter();

  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [recipientName, setRecipientName] = useState('Naveen K');
  const [gradeInput, setGradeInput] = useState('Distinction (98.5%)');

  const handleIssueCustomCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;
    const cert = await triggerCourseCompletionAutomation(selectedCourseId);
    if (cert) {
      showToast(`Credential issued successfully to ${recipientName}!`);
      navigate(`/certificate/${cert.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>THENAM Faculty & Academic Board Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Academic Credentialing Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Verify coursework milestones, issue cryptographically signed student certificates, and inspect competency analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-2xl font-black text-indigo-400">{certificates.length + 128}</span>
            <span className="text-[10px] text-slate-300 block font-medium">Issued Certs</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-2xl font-black text-emerald-400">99.4%</span>
            <span className="text-[10px] text-slate-300 block font-medium">Pass Rate</span>
          </div>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">1,248</p>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18% this month
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Active Courses</span>
            <BookOpen className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{courses.length}</p>
          <span className="text-[10px] text-indigo-600 font-bold">8 Engineering Domains</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Verified Credentials</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{certificates.length}</p>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Cryptographically anchored
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Industry Partners</span>
            <GraduationCap className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">42</p>
          <span className="text-[10px] text-slate-500 font-medium">Hiring & Reviewing</span>
        </div>
      </div>

      {/* Manual Issue Credential Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileCheck className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">Issue / Audit Verified Student Credential</h3>
            <p className="text-xs text-slate-500">
              Directly execute the end-to-end automation pipeline: generate verified certificate, update student portfolio, add skills, and notify peer network.
            </p>
          </div>
        </div>

        <form onSubmit={handleIssueCustomCredential} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Student Candidate</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Course Masterclass</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden cursor-pointer"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Assessment Evaluation Grade</label>
            <input
              type="text"
              value={gradeInput}
              onChange={(e) => setGradeInput(e.target.value)}
              className="w-full p-2.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden"
            />
          </div>

          <div className="md:col-span-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Issue Official Certificate & Trigger Automated Experience</span>
            </button>
          </div>
        </form>
      </div>

      {/* Recent Issued Certificates Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recent Programmatic Issuances</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Credential ID</th>
                <th className="p-3">Student</th>
                <th className="p-3">Course</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Issue Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {certificates.map(cert => (
                <tr key={cert.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-700">{cert.credentialId}</td>
                  <td className="p-3 font-semibold text-slate-900">{cert.recipientName}</td>
                  <td className="p-3 text-slate-600">{cert.courseName}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      {cert.grade}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{cert.issueDate}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => navigate(`/certificate/${cert.id}`)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
