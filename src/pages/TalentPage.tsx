import React, { useState, useMemo, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Award,
  Sparkles,
  Building2,
  MapPin,
  GraduationCap,
  Download,
  Users,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { StudentProfile } from '../types';
import { api } from '../services/api';
import { CandidateCard } from '../components/CandidateCard';

export const TalentPage: React.FC = () => {
  const { currentUser } = useApp();
  const { navigate } = useRouter();

  const [allStudents, setAllStudents] = useState<StudentProfile[]>([]);

  useEffect(() => {
    api.get('/talent')
      .then((res) => {
        // Enforce student types structure
        setAllStudents(res.data);
      })
      .catch((err) => console.error('Failed to load talent candidates from Express backend:', err));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedCollege, setSelectedCollege] = useState<string>('all');
  const [minCertificates, setMinCertificates] = useState<number>(0);

  const availableSkills = useMemo(() => {
    const skills = new Set<string>();
    allStudents.forEach((student) => {
      student.skills.forEach((skill) => {
        if (skill) skills.add(skill);
      });
    });
    return ['All Skills', ...Array.from(skills)];
  }, [allStudents]);

  const availableColleges = useMemo(() => {
    const colleges = new Set<string>();
    allStudents.forEach((student) => {
      if (student.college) colleges.add(student.college);
    });
    return ['All Colleges', ...Array.from(colleges)];
  }, [allStudents]);

  const filteredStudents = allStudents.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      student.college.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkill =
      selectedSkill === 'all' ||
      selectedSkill === 'All Skills' ||
      student.skills.some(s => s.toLowerCase() === selectedSkill.toLowerCase());

    const matchesCollege =
      selectedCollege === 'all' ||
      selectedCollege === 'All Colleges' ||
      student.college.toLowerCase() === selectedCollege.toLowerCase();

    const matchesCertificates = student.metrics.certificatesCount >= minCertificates;

    return matchesSearch && matchesSkill && matchesCollege && matchesCertificates;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>THENAM Verified Talent Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Hire Verified Student Engineers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover student developers, data scientists, and designers with verifiable course credentials, real-world GitHub projects, and institution-endorsed performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-2xl font-black text-emerald-400">100%</span>
            <span className="text-[10px] text-slate-300 block font-medium">Verified Credentials</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-2xl font-black text-indigo-400">{allStudents.length}</span>
            <span className="text-[10px] text-slate-300 block font-medium">Active Profiles</span>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, role, technology, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden"
            />
          </div>

          {/* Skill Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[150px]">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden cursor-pointer"
              >
                {availableSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* College Filter */}
            <div className="relative min-w-[180px]">
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden cursor-pointer"
              >
                {availableColleges.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Reset Filters */}
            {(selectedSkill !== 'all' || selectedCollege !== 'all' || searchQuery || minCertificates > 0) && (
              <button
                onClick={() => {
                  setSelectedSkill('all');
                  setSelectedCollege('all');
                  setSearchQuery('');
                  setMinCertificates(0);
                }}
                className="px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Quick Skill Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Popular:</span>
          {['Python', 'Machine Learning', 'React', 'Cybersecurity', 'SQL', 'UI/UX Design'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedSkill(tag === selectedSkill ? 'all' : tag)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                selectedSkill === tag
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong className="text-slate-900">{filteredStudents.length}</strong> matching student profiles</span>
        <span className="flex items-center gap-1 font-medium text-emerald-600">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Real-time verified data
        </span>
      </div>

      {/* Candidates Grid */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No candidates match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, removing college constraints, or selecting a broader skill tag.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <CandidateCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};
