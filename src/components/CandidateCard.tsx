import React from 'react';
import {
  Award,
  FolderGit2,
  BookOpen,
  CheckCircle2,
  MapPin,
  Building2,
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { StudentProfile } from '../types';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';

interface CandidateCardProps {
  student: StudentProfile;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ student }) => {
  const { navigate } = useRouter();
  const { showToast } = useApp();

  return (
    <div
      id={`candidate-card-${student.id}`}
      className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start gap-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-xs shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-slate-900 truncate">{student.name}</h3>
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            </div>
            <p className="text-xs font-semibold text-indigo-600 truncate">{student.headline}</p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
              <span className="flex items-center gap-1 truncate">
                <Building2 className="w-3 h-3 text-slate-400" />
                {student.college}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 shrink-0">
                <MapPin className="w-3 h-3 text-slate-400" />
                {student.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 mt-3.5 line-clamp-2 leading-relaxed">
          {student.bio}
        </p>

        {/* Skills Pills */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {student.skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200/60"
              >
                {skill}
              </span>
            ))}
            {student.skills.length > 5 && (
              <span className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold">
                +{student.skills.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Verified Metrics Counter */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-2 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold text-slate-900">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{student.metrics.certificatesCount}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Certificates</span>
          </div>

          <div className="bg-slate-50 p-2 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold text-slate-900">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>{student.metrics.projectsCount}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Projects</span>
          </div>

          <div className="bg-slate-50 p-2 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold text-slate-900">
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>{student.metrics.coursesCompleted}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Courses</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => navigate(`/profile/${student.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          <span>View Profile</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => {
            showToast(`Invitation / message dispatched to ${student.name}`);
            navigate('/messages');
          }}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
          title="Send Message or Interview Invite"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
