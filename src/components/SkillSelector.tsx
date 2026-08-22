import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Check, Plus, AlertCircle } from 'lucide-react';
import { CENTRAL_SKILLS, SKILL_CATEGORIES } from '../constants/skills';
import { api } from '../services/api';

interface SkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  maxSkills?: number;
}

export const SkillSelector: React.FC<SkillSelectorProps> = ({
  selectedSkills,
  onChange,
  maxSkills = 20,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [dbSkills, setDbSkills] = useState<any[]>([]);

  useEffect(() => {
    api.get('/skills')
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setDbSkills(res.data);
        } else {
          setDbSkills(CENTRAL_SKILLS);
        }
      })
      .catch(err => {
        console.warn('Failed to load active skills from Firestore, using default catalog fallback:', err);
        setDbSkills(CENTRAL_SKILLS);
      });
  }, []);

  // Filter skills based on category and search query
  const filteredSkills = useMemo(() => {
    const list = dbSkills.length > 0 ? dbSkills : CENTRAL_SKILLS;
    return list.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' || skill.category === activeCategory;
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dbSkills, activeCategory, searchQuery]);

  const handleToggleSkill = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      onChange(selectedSkills.filter((s) => s !== skillName));
    } else {
      if (selectedSkills.length >= maxSkills) {
        return; // Exceeded limit
      }
      onChange([...selectedSkills, skillName]);
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-4">
      {/* Search and Category Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills (e.g. PyTorch, React)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Clear selection link */}
        {selectedSkills.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="self-end sm:self-center px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
          >
            Clear Selected ({selectedSkills.length})
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar border-b border-slate-100">
        {SKILL_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              activeCategory === category
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Selected Skill Chips Showcase */}
      {selectedSkills.length > 0 ? (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Selected Skills:</span>
          <div className="flex flex-wrap gap-1.5">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100 shadow-3xs"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleToggleSkill(skill)}
                  className="hover:text-indigo-900 focus:outline-hidden p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>No skills selected yet. Select from the catalog below.</span>
        </div>
      )}

      {/* Available Skills Grid */}
      <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 border border-slate-200/60 rounded-2xl bg-slate-50/30 p-2">
        {filteredSkills.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No skills found matching search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkills.includes(skill.name);
              return (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => handleToggleSkill(skill.name)}
                  className={`w-full flex items-center justify-between p-2.5 text-left rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-200 text-indigo-700 shadow-2xs font-bold'
                      : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isSelected ? 'bg-indigo-600' : 'bg-slate-300'
                    }`} />
                    <span className="text-xs truncate">{skill.name}</span>
                  </div>
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Limit indicator */}
      <div className="text-[10px] text-slate-400 font-medium text-right">
        {selectedSkills.length} / {maxSkills} maximum skills selected.
      </div>
    </div>
  );
};
