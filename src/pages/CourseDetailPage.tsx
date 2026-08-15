import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Play,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { CoursePlayer } from '../components/CoursePlayer';
import { AssessmentModal } from '../components/AssessmentModal';

export const CourseDetailPage: React.FC = () => {
  const { courses, enrollInCourse, toggleCourseBookmark, triggerCourseCompletionAutomation } = useApp();
  const { currentPath, navigate } = useRouter();

  // Extract courseId from path (e.g. /course/course_ai_01, /course/course_ai_01/learn, /course/course_ai_01/assessment)
  const segments = currentPath.split('/').filter(Boolean);
  const courseId = segments[1] || 'course_ai_01';
  const subRoute = segments[2] || '';

  const course = courses.find(c => c.id === courseId) || courses[0];
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(subRoute === 'assessment');

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <h2 className="text-xl font-bold text-slate-800">Course not found</h2>
        <button onClick={() => navigate('/learn')} className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">
          Return to Courses
        </button>
      </div>
    );
  }

  // If subRoute is 'learn' or course is enrolled and user wants interactive mode:
  if (subRoute === 'learn' || subRoute === 'assessment') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CoursePlayer course={course} />
      </div>
    );
  }

  // Standard Course Overview & Syllabus Page
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/learn')}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Catalog</span>
      </button>

      {/* Hero Overview */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full text-xs font-bold">
              {course.category}
            </span>
            <span className="px-3 py-1 bg-white/10 text-slate-200 rounded-full text-xs font-bold">
              {course.level} Level
            </span>
            <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating} ({course.reviewsCount} reviews)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-10 h-10 rounded-full object-cover border border-white/20"
            />
            <div>
              <p className="text-xs font-bold text-white">{course.instructor.name}</p>
              <p className="text-[11px] text-slate-400">{course.instructor.role} • {course.instructor.organization}</p>
            </div>
          </div>
        </div>

        {/* Enrollment Card */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Accredited Program</span>
            <div className="text-2xl font-black text-white">Verified Certificate Included</div>
            <p className="text-xs text-slate-300">
              Pass the final proctored assessment to automatically issue cryptographic certificate & update your profile.
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-200 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{course.duration} ({course.totalModules} modules)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>{course.enrolledCount} students currently enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Official DMI & THENAM Certification</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {course.isEnrolled ? (
              <button
                id="btn-goto-learning-room"
                onClick={() => navigate(`/course/${course.id}/learn`)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Go to Learning Room ({course.progress}%)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  enrollInCourse(course.id);
                  navigate(`/course/${course.id}/learn`);
                }}
                className="w-full py-3 bg-white hover:bg-indigo-50 text-indigo-900 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Enroll in Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="w-full py-2.5 bg-white/15 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Take Assessment Directly</span>
            </button>
          </div>
        </div>
      </div>

      {/* Curriculum & Prerequisites */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Modules List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Curriculum Syllabus ({course.modules.length} Modules)</h3>
          
          <div className="space-y-3">
            {course.modules.map((mod, index) => (
              <div
                key={mod.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs"
              >
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{mod.title}</h5>
                    <span className="text-[11px] text-slate-400 font-medium">{mod.duration}</span>
                  </div>
                  <p className="text-slate-600 mt-1">{mod.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Prerequisites */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Skills You Will Earn</h4>
            <div className="flex flex-wrap gap-1.5">
              {course.skillsGained.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Prerequisites</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {course.prerequisites.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AssessmentModal
        course={course}
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </div>
  );
};
