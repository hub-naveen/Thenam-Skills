import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  QrCode,
  Sparkles,
  Printer,
  Copy,
  Check,
  GraduationCap
} from 'lucide-react';
import { Certificate } from '../types';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';

interface CertificateViewerProps {
  certificate: Certificate;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate }) => {
  const { showToast, createActivity, currentUser } = useApp();
  const { navigate } = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certificate.credentialId);
    setIsCopied(true);
    showToast('Credential ID copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareToFeed = () => {
    createActivity({
      type: 'certificate_earned',
      author: {
        id: currentUser.id,
        name: currentUser.name,
        headline: currentUser.headline,
        avatar: currentUser.avatar,
        college: currentUser.college
      },
      title: `Earned Verified Certificate: ${certificate.title}`,
      description: `Officially certified by THENAM Academic Board with distinction score. Verified Credential ID: ${certificate.credentialId}`,
      badgeText: '🏆 Certificate Earned',
      badgeTheme: 'amber',
      metadata: {
        certificateId: certificate.id,
        courseTitle: certificate.courseName,
        grade: certificate.grade,
        verificationHash: certificate.credentialId
      }
    });
    showToast('Certificate shared to THENAM network feed!');
    navigate('/home');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Verification Bar */}
      <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                Official Tamper-Proof Credential
              </span>
              <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active & Verified
              </span>
            </div>
            <p className="text-xs text-emerald-700 mt-0.5">
              Issued by <strong className="text-emerald-900">{certificate.verifiedBy}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHash}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-100/60 text-emerald-900 border border-emerald-300 text-xs font-semibold rounded-lg transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="font-mono-code">{certificate.credentialId}</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div
        id="printable-certificate"
        className="bg-gradient-to-b from-[#FFFDF9] to-[#FBF8F0] border-8 border-double border-amber-800/40 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Security Guilloche Watermark Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-700/60" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-700/60" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-700/60" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-700/60" />

        {/* Certificate Header */}
        <div className="text-center space-y-3 relative z-10">
          <div className="flex items-center justify-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Thenam Campus Logo" 
              className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-amber-500/40"
            />
            <div className="text-left">
              <h2 className="text-lg font-black tracking-tight text-slate-900 leading-tight">
                Thenam <span className="text-indigo-600">Campus</span>
              </h2>
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                Academic Certification & Competency Board
              </p>
            </div>
          </div>

          <div className="pt-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800/90 block">
              Certificate of Academic & Technical Mastery
            </span>
            <p className="text-xs text-slate-500 italic mt-1">This is to officially certify that</p>
          </div>

          {/* Student Recipient Name */}
          <div className="py-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif italic text-amber-950 underline decoration-amber-400/60 decoration-2 underline-offset-8">
              {certificate.recipientName}
            </h1>
            <p className="text-xs font-semibold text-slate-600 mt-2">
              DMI College of Engineering • Chennai, India
            </p>
          </div>

          {/* Course Details */}
          <div className="max-w-2xl mx-auto space-y-2 py-2">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              has successfully demonstrated advanced practical proficiency, completed all laboratory milestones, and passed the proctored capstone examination for
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-950">
              {certificate.courseName}
            </h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-300">
              <span>Grade Awarded: {certificate.grade}</span>
            </div>
          </div>

          {/* Skills Verified Pills */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Verified Technical Competencies
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xl mx-auto">
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-white border border-amber-200/90 text-amber-900 text-[11px] font-semibold shadow-2xs"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Signatures & Seal Section */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end max-w-2xl mx-auto border-t border-amber-200/80 mt-6">
            
            {/* Faculty Sign */}
            <div className="text-center space-y-1">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-base text-indigo-950 font-bold tracking-wider">
                  Dr. R. Arvind
                </span>
              </div>
              <div className="h-0.5 bg-slate-300 w-32 mx-auto" />
              <p className="text-[10px] font-bold text-slate-700 uppercase">Head of AI Research</p>
              <p className="text-[9px] text-slate-400">THENAM Institute</p>
            </div>

            {/* Gold Seal Emblem */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-500 border-4 border-amber-200 text-amber-950 flex flex-col items-center justify-center shadow-lg shadow-amber-500/30">
                <Award className="w-7 h-7 text-amber-950" />
                <span className="text-[7px] font-black uppercase tracking-tighter">THENAM SEAL</span>
              </div>
              <span className="text-[9px] font-bold text-amber-900 mt-1">OFFICIAL VERIFIED</span>
            </div>

            {/* Academic Board Dean */}
            <div className="text-center space-y-1">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-base text-indigo-950 font-bold tracking-wider">
                  Dr. S. Meenakshi
                </span>
              </div>
              <div className="h-0.5 bg-slate-300 w-32 mx-auto" />
              <p className="text-[10px] font-bold text-slate-700 uppercase">Academic Dean</p>
              <p className="text-[9px] text-slate-400">DMI Tech Board</p>
            </div>
          </div>

          {/* Certificate Metadata & Hash footer */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 border-t border-amber-100 gap-2">
            <div className="flex items-center gap-2">
              <img
                src={certificate.qrCodeUrl}
                alt="Verification QR"
                className="w-10 h-10 rounded border border-amber-300 bg-white p-0.5"
              />
              <div className="text-left">
                <p className="font-bold text-slate-700">Issue Date: {certificate.issueDate}</p>
                <p className="font-mono-code text-[10px] text-slate-400">ID: {certificate.credentialId}</p>
              </div>
            </div>

            <div className="text-right sm:text-right">
              <p className="font-mono-code text-[10px] text-slate-400 truncate max-w-xs">
                Hash: {certificate.verificationHash}
              </p>
              <p className="text-[10px] text-emerald-700 font-semibold flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Recorded on THENAM Decentralized Ledger
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-print-cert"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>

          <button
            onClick={() => {
              showToast('Credential added to your verified LinkedIn licenses & certifications!');
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Add to LinkedIn</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-share-cert-feed"
            onClick={handleShareToFeed}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>Share to THENAM Feed</span>
          </button>

          <button
            onClick={() => navigate(`/verify/${certificate.credentialId}`)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verify Public URL</span>
          </button>
        </div>
      </div>
    </div>
  );
};
