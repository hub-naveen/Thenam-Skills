import React, { useState } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Course } from '../types';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';

interface AssessmentModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({ course, isOpen, onClose }) => {
  const { triggerCourseCompletionAutomation } = useApp();
  const { navigate } = useRouter();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleCalculateScore = (e: React.FormEvent) => {
    e.preventDefault();
    let correctCount = 0;
    course.assessmentQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const calculated = Math.round((correctCount / course.assessmentQuestions.length) * 100);
    setScorePercentage(calculated);
    setIsSubmitted(true);

    // If passed (score >= 70%), trigger the automated pipeline!
    if (calculated >= 70) {
      setTimeout(async () => {
        const cert = await triggerCourseCompletionAutomation(course.id);
        onClose();
        if (cert) {
          navigate(`/certificate/${cert.id}`);
        }
      }, 1400);
    }
  };

  const allAnswered = course.assessmentQuestions.every(q => selectedAnswers[q.id] !== undefined);
  const isPassed = isSubmitted && scorePercentage >= 70;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Final Proctored Assessment: {course.title}
              </h3>
              <p className="text-xs text-slate-500">Passing criteria: 70% or higher to earn verified certificate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Banner if submitted */}
        {isSubmitted && (
          <div className={`mt-4 p-4 rounded-2xl border ${
            isPassed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-center gap-3">
              {isPassed ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="text-sm font-bold">
                  {isPassed ? '🎉 Assessment Passed with Distinction!' : 'Score below 70% passing threshold'}
                </h4>
                <p className="text-xs mt-0.5">
                  Your final score: <strong className="font-extrabold text-base">{scorePercentage}%</strong>.
                  {isPassed ? ' Generating your official tamper-proof certificate & adding skills...' : ' Please review module notes and retry.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <form onSubmit={handleCalculateScore} className="mt-5 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {course.assessmentQuestions.map((q, idx) => {
            const isSelected = selectedAnswers[q.id] !== undefined;
            const chosenAnswer = selectedAnswers[q.id];
            const isCorrect = isSubmitted && chosenAnswer === q.correctAnswer;
            const isWrong = isSubmitted && chosenAnswer !== q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : isWrong
                    ? 'bg-rose-50/50 border-rose-300'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {q.question}
                    </p>

                    {/* Options */}
                    <div className="mt-3 space-y-2">
                      {q.options.map((option, optIdx) => {
                        const isThisChosen = chosenAnswer === optIdx;
                        const isThisCorrect = isSubmitted && optIdx === q.correctAnswer;

                        return (
                          <button
                            type="button"
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                              isThisCorrect
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold'
                                : isThisChosen
                                ? isSubmitted
                                  ? 'bg-rose-100 border-rose-400 text-rose-900 font-bold'
                                  : 'bg-indigo-50 border-indigo-400 text-indigo-900 ring-1 ring-indigo-300'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{option}</span>
                            {isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {isSubmitted && isThisChosen && !isThisCorrect && (
                              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <p className="text-[11px] text-slate-600 mt-2.5 bg-white p-2 rounded-lg border border-slate-200">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Action Button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Proctored Session • 3 Questions</span>
            </div>

            {!isSubmitted ? (
              <button
                id="btn-submit-assessment"
                type="submit"
                disabled={!allAnswered}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>
            ) : !isPassed ? (
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedAnswers({});
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
              >
                Try Again
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Certificate Pipeline executing...
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
