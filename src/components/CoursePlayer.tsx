import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Circle,
  FileText,
  Clock,
  Award,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Share2,
  Sparkles,
  Download,
  Flame,
  ArrowLeft
} from 'lucide-react';
import { Course, CourseModule } from '../types';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { AssessmentModal } from './AssessmentModal';

interface CoursePlayerProps {
  course: Course;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ course }) => {
  const { completeCourseModule, triggerCourseCompletionAutomation, showToast } = useApp();
  const { navigate, goBack } = useRouter();

  const [activeModuleId, setActiveModuleId] = useState<string>(course.modules[0]?.id || '');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');

  const currentModule = course.modules.find(m => m.id === activeModuleId) || course.modules[0];

  const handleCompleteCurrentModule = () => {
    if (currentModule) {
      completeCourseModule(course.id, currentModule.id);
      showToast(`Module "${currentModule.title}" marked as completed!`);
      
      // Auto move to next module if available
      const currentIndex = course.modules.findIndex(m => m.id === currentModule.id);
      if (currentIndex < course.modules.length - 1) {
        setActiveModuleId(course.modules[currentIndex + 1].id);
      }
    }
  };

  const isAllModulesCompleted = course.completedModules === course.totalModules || course.progress === 100;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          {isAllModulesCompleted ? (
            <button
              id="btn-view-course-cert"
              onClick={async () => {
                const cert = await triggerCourseCompletionAutomation(course.id);
                if (cert) navigate(`/certificate/${cert.id}`);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              <Award className="w-4 h-4" />
              <span>View Official Certificate</span>
            </button>
          ) : (
            <button
              id="btn-take-assessment"
              onClick={() => setIsAssessmentOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Take Final Capstone Assessment</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Learning Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Video / Interactive Simulator Stage */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 rounded-3xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-800 shadow-xl group">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

            <div className="relative z-10 text-center p-6 max-w-md space-y-3">
              <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center mx-auto shadow-2xl ring-4 ring-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              </div>
              <p className="text-white font-bold text-base sm:text-lg drop-shadow-md">
                {currentModule?.title}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-indigo-300 font-semibold bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-700/50">
                <Clock className="w-3.5 h-3.5" /> {currentModule?.duration} • Interactive Module
              </span>
            </div>

            {/* Bottom player controls simulation */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/80 z-20">
              <span className="font-mono-code text-[11px]">1080p HD • THENAM Player</span>
              <button
                onClick={handleCompleteCurrentModule}
                className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-bold text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark Module Completed</span>
              </button>
            </div>
          </div>

          {/* Module Content & Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`text-xs font-bold pb-2 border-b-2 transition-colors ${
                    activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Lesson Overview & Code
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`text-xs font-bold pb-2 border-b-2 transition-colors ${
                    activeTab === 'notes' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  My Study Notes
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`text-xs font-bold pb-2 border-b-2 transition-colors ${
                    activeTab === 'resources' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Lab Resources & Datasets
                </button>
              </div>

              <span className="text-xs text-slate-400 font-medium">Instructor: {course.instructor.name}</span>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <h4 className="text-base font-bold text-slate-900">{currentModule?.title}</h4>
                <p>{currentModule?.summary}</p>

                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono-code text-xs space-y-1">
                  <p className="text-slate-400">// Module Example: Tensor and Graph execution</p>
                  <p className="text-indigo-300">import torch</p>
                  <p className="text-indigo-300">import torch.nn as nn</p>
                  <p className="text-emerald-300">class ModelBackbone(nn.Module):</p>
                  <p className="pl-4">def __init__(self):</p>
                  <p className="pl-8">super().__init__()</p>
                  <p className="pl-8">self.conv = nn.Conv2d(3, 64, kernel_size=3, padding=1)</p>
                  <p className="pl-4">def forward(self, x): return torch.relu(self.conv(x))</p>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Add personal annotations synced to your student profile.</p>
                <textarea
                  rows={4}
                  placeholder="Key takeaway from this module: In deep residual architectures, identity skip connections ensure gradients do not saturate..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-hidden focus:bg-white focus:border-indigo-500"
                />
                <button
                  onClick={() => showToast('Study note saved!')}
                  className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg"
                >
                  Save Note
                </button>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-slate-900">Lab_Notebook_01_PyTorch_Tensors.ipynb</span>
                  </div>
                  <button onClick={() => showToast('Downloading lab notebook...')} className="text-indigo-600 font-bold hover:underline">Download</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-slate-900">VOC_Benchmark_Dataset_Subset.zip (140 MB)</span>
                  </div>
                  <button onClick={() => showToast('Downloading dataset...')} className="text-indigo-600 font-bold hover:underline">Download</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Course Syllabus & Module Checklist */}
        <div className="space-y-4">
          
          {/* Progress Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Course Progress</span>
              <span className="text-sm font-extrabold text-indigo-600">{course.progress}%</span>
            </div>
            
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <p className="text-xs text-slate-500">
              {course.completedModules} of {course.totalModules} modules completed
            </p>

            <button
              id="btn-sidebar-take-assessment"
              onClick={() => setIsAssessmentOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Launch Capstone Assessment</span>
            </button>
          </div>

          {/* Modules List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Curriculum & Modules</h4>
            
            <div className="space-y-2">
              {course.modules.map((mod, idx) => {
                const isActive = mod.id === activeModuleId;
                return (
                  <div
                    key={mod.id}
                    onClick={() => setActiveModuleId(mod.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isActive
                        ? 'bg-indigo-50/80 border-indigo-300 ring-1 ring-indigo-200'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          completeCourseModule(course.id, mod.id);
                        }}
                        className="mt-0.5"
                      >
                        {mod.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 hover:text-indigo-600" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold leading-tight ${isActive ? 'text-indigo-950' : 'text-slate-800'}`}>
                          {mod.title}
                        </p>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">{mod.duration} • {mod.type}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      <AssessmentModal
        course={course}
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </div>
  );
};
