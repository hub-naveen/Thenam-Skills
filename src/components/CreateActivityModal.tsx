import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Rocket,
  MessageSquare,
  Award,
  Calendar,
  Send,
  Image,
  Link,
  Code
} from 'lucide-react';
import { ActivityType } from '../types';
import { useApp } from '../context/AppContext';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateActivityModal: React.FC<CreateActivityModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, createActivity } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activityType, setActivityType] = useState<ActivityType>('student_post');
  const [imageUrl, setImageUrl] = useState('');
  const [skillTag, setSkillTag] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    let badgeText = '💭 Student Post';
    let badgeTheme: 'blue' | 'indigo' | 'emerald' | 'amber' | 'purple' | 'rose' = 'blue';

    if (activityType === 'project_milestone') {
      badgeText = '🚀 Project Milestone';
      badgeTheme = 'indigo';
    } else if (activityType === 'skill_unlocked') {
      badgeText = '✨ Skill Unlocked';
      badgeTheme = 'emerald';
    } else if (activityType === 'achievement') {
      badgeText = '🏅 Achievement';
      badgeTheme = 'rose';
    }

    createActivity({
      type: activityType,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        headline: currentUser.headline,
        avatar: currentUser.avatar,
        college: currentUser.college
      },
      title: title.trim(),
      description: description.trim(),
      badgeText,
      badgeTheme,
      metadata: {
        imageUrl: imageUrl.trim() || undefined,
        skillName: skillTag.trim() || undefined
      }
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setImageUrl('');
    setSkillTag('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900">{currentUser.name}</h4>
              <p className="text-xs text-slate-500">Share a learning update with THENAM network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Activity Type Selector */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Activity Category</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActivityType('student_post')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold border transition-all ${
                  activityType === 'student_post'
                    ? 'bg-blue-50 border-blue-400 text-blue-800 ring-1 ring-blue-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Study Note</span>
              </button>

              <button
                type="button"
                onClick={() => setActivityType('project_milestone')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold border transition-all ${
                  activityType === 'project_milestone'
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-800 ring-1 ring-indigo-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Project</span>
              </button>

              <button
                type="button"
                onClick={() => setActivityType('skill_unlocked')}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold border transition-all ${
                  activityType === 'skill_unlocked'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-1 ring-emerald-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Skill Mastery</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Headline / Milestone Title *</label>
            <input
              id="input-create-activity-title"
              type="text"
              required
              placeholder="e.g. Built a custom neural network tokenizer in PyTorch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Learning Summary & Insights *</label>
            <textarea
              id="input-create-activity-desc"
              rows={4}
              required
              placeholder="Describe what you built, algorithmic breakthroughs, lessons learned, or questions for mentors..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Image URL (Optional)</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Skill Tag (Optional)</label>
              <input
                type="text"
                placeholder="e.g. PyTorch, CUDA, FastAPI"
                value={skillTag}
                onChange={(e) => setSkillTag(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-hidden"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              id="btn-submit-create-activity"
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Activity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
