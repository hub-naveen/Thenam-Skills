import React, { useState, useEffect } from 'react';
import { X, Linkedin, Github, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'linkedin' | 'github';
  initialValue: string;
  onSave: (url: string) => Promise<void>;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  type,
  initialValue,
  onSave,
}) => {
  const [url, setUrl] = useState(initialValue);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setUrl(initialValue);
    setError('');
    setSuccess(false);
  }, [initialValue, isOpen]);

  if (!isOpen) return null;

  const validateUrl = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Profile URL cannot be empty');
      return false;
    }

    if (type === 'linkedin') {
      const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;
      if (!linkedinRegex.test(trimmed) && !trimmed.includes('linkedin.com/in/')) {
        setError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)');
        return false;
      }
    } else {
      const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;
      if (!githubRegex.test(trimmed) && !trimmed.includes('github.com/')) {
        setError('Please enter a valid GitHub profile URL (e.g., https://github.com/username)');
        return false;
      }
    }

    return true;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmedUrl = url.trim();

    if (!validateUrl(trimmedUrl)) return;

    // Add protocol if missing
    let formattedUrl = trimmedUrl;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setLoading(true);
    try {
      await onSave(formattedUrl);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the URL.');
    } finally {
      setLoading(false);
    }
  };

  const isLinkedIn = type === 'linkedin';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md shadow-2xl relative z-10 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95">
        
        {/* Header Banner */}
        <div className={`p-6 text-white ${isLinkedIn ? 'bg-indigo-700' : 'bg-slate-900'} relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all focus:outline-hidden"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center`}>
              {isLinkedIn ? <Linkedin className="w-5 h-5 text-white" /> : <Github className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight">
                {isLinkedIn ? 'Connect LinkedIn Profile' : 'Connect GitHub Profile'}
              </h3>
              <p className="text-[10px] text-white/70 font-semibold uppercase tracking-wider mt-0.5">
                Verify Identity Link
              </p>
            </div>
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border-l-4 border-rose-500 p-3.5 rounded-r-xl flex gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-xs text-rose-800 leading-normal">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3.5 rounded-r-xl flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-800 leading-normal">Profile connected successfully!</p>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              {isLinkedIn ? 'LinkedIn Profile URL' : 'GitHub Profile URL'}
            </label>
            <div className="relative rounded-xl shadow-2xs">
              <input
                type="text"
                placeholder={isLinkedIn ? 'https://linkedin.com/in/username' : 'https://github.com/username'}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading || success}
                className="w-full px-4 py-2.5 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Example: {isLinkedIn ? 'linkedin.com/in/naveen-k' : 'github.com/hub-naveen'}
            </p>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading || success}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className={`px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 ${
                isLinkedIn ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-900 hover:bg-slate-850'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <span>Save Profile Link</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
