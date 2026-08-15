import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Award,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Filter,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';

export const LearnPage: React.FC = () => {
  const { courses, enrollInCourse, toggleCourseBookmark, triggerCourseCompletionAutomation } = useApp();
  const { navigate } = useRouter();

  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const domains = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'AI & Data Science', label: 'AI & Data Science' },
    { id: 'Web Development', label: 'Web Development' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'Cybersecurity', label: 'Cybersecurity' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesDomain = selectedDomain === 'all' || course.category === selectedDomain;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.skillsGained.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THENAM Industry-Aligned Curriculums</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Explore Verified Engineering Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Hands-on code labs, proctored capstone assessments, and tamper-proof academic credentials certified by DMI & THENAM.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-xl font-black text-amber-400">100%</span>
            <span className="text-[10px] text-slate-300 block font-medium">Verified Credentials</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-xl font-black text-emerald-400">40+</span>
            <span className="text-[10px] text-slate-300 block font-medium">Lab Modules</span>
          </div>
        </div>
      </div>

      {/* Domain Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200">
        {/* Domain Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {domains.map((dom) => (
            <button
              key={dom.id}
              onClick={() => setSelectedDomain(dom.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDomain === dom.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {dom.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isCompleted = course.progress === 100;
          const isInProgress = course.progress > 0 && course.progress < 100;

          return (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-xs">
                    {course.category}
                  </span>

                  {/* Bookmark button */}
                  <button
                    onClick={() => toggleCourseBookmark(course.id)}
                    className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md rounded-lg transition-colors"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${course.isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>

                  {/* Rating & Level */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-semibold">
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-300 font-normal">({course.reviewsCount})</span>
                    </div>
                    <span className="bg-indigo-900/80 px-2 py-0.5 rounded text-[11px] font-bold">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <h3
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="text-base font-bold text-slate-900 leading-snug line-clamp-2 hover:text-indigo-600 cursor-pointer transition-colors"
                  >
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Skills Gained Tags */}
                  <div className="flex flex-wrap gap-1">
                    {course.skillsGained.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                    {course.skillsGained.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-medium">
                        +{course.skillsGained.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-semibold text-slate-700">{course.instructor.name}</span>
                    <span className="text-slate-400">• {course.duration}</span>
                  </div>

                  {/* Progress bar if enrolled */}
                  {course.isEnrolled && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Progress</span>
                        <span className="font-bold text-indigo-600">{course.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                {isCompleted ? (
                  <button
                    onClick={() => navigate(`/course/${course.id}/learn`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Completed • Review Content</span>
                  </button>
                ) : isInProgress ? (
                  <button
                    onClick={() => navigate(`/course/${course.id}/learn`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Continue Learning</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      enrollInCourse(course.id);
                      navigate(`/course/${course.id}/learn`);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    <span>Start Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
