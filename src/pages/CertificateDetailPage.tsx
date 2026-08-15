import React from 'react';
import { Award, ArrowLeft, ShieldCheck, CheckCircle2, FileQuestion } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { CertificateViewer } from '../components/CertificateViewer';

export const CertificateDetailPage: React.FC = () => {
  const { certificates, getCertificateById } = useApp();
  const { currentPath, navigate, goBack } = useRouter();

  // Extract ID from /certificate/:id or /verify/:id
  const parts = currentPath.split('/');
  const certId = parts[2] || certificates[0]?.id;

  const certificate = getCertificateById(certId) || certificates[0];

  if (!certificate) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <FileQuestion className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Certificate Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested credential could not be found or has not been issued yet.
        </p>
        <button
          onClick={() => navigate('/certificates')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700"
        >
          Go to My Certificates
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/certificates')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Certificates</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Official Public Verification Record</span>
        </div>
      </div>

      {/* Render High-Fidelity Viewer */}
      <CertificateViewer certificate={certificate} />
    </div>
  );
};
