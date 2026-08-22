import React from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const OpeningSoonPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto shadow-inner border border-indigo-100">
          <Clock className="w-10 h-10 text-indigo-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Opening Soon!</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            We are actively working behind the scenes to bring you an incredible experience. 
            This feature is currently locked and will be available to all users very soon.
          </p>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Feed
        </button>
      </div>
    </div>
  );
};
