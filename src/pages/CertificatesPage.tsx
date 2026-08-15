import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Search,
  ExternalLink,
  Download,
  Share2,
  CheckCircle2,
  Sparkles,
  QrCode,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../context/RouterContext';
import { CertificateViewer } from '../components/CertificateViewer';

export const CertificatesPage: React.FC = () => {
  const { certificates, getCertificateById } = useApp();
  const { currentPath, navigate } = useRouter();

  // Extract certificateId if in sub-path e.g. /certificate/:certificateId or /verify/:certificateId
  const segments = currentPath.split('/').filter(Boolean);
  const isDetailOrVerify = segments[0] === 'certificate' || segments[0] === 'verify';
  const targetId = isDetailOrVerify ? segments[1] : null;

  const activeCert = targetId ? getCertificateById(targetId) : null;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = certificates.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.credentialId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // If viewing a specific certificate or verifying
  if (targetId) {
    if (!activeCert) {
      return (
        <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Certificate not found in registry</h2>
          <p className="text-xs text-slate-500">Credential ID "{targetId}" could not be matched against current cryptographic logs.</p>
          <button
            onClick={() => navigate('/certificates')}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            View All Verified Certificates
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <button
          onClick={() => navigate('/certificates')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Certificates</span>
        </button>

        <CertificateViewer certificate={activeCert} />
      </div>
    );
  }

  // All Certificates List View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Award className="w-3.5 h-3.5" />
            <span>Cryptographic Digital Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My Verified Certificates ({certificates.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All credentials issued by THENAM Academic Board and accredited university partners with SHA-256 verifiable signatures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-xl font-black text-amber-400">{certificates.length}</span>
            <span className="text-[10px] text-slate-300 block font-medium">Issued Certs</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
            <span className="text-xl font-black text-emerald-400">100%</span>
            <span className="text-[10px] text-slate-300 block font-medium">On-Chain Verified</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search certificate title, skill, or credential ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs text-slate-800 rounded-xl border border-slate-200 focus:bg-white focus:border-indigo-500 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Showing {filteredCerts.length} certificates</span>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            id={`certificate-item-${cert.id}`}
            className="bg-white rounded-3xl border border-amber-200/90 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

            <div>
              {/* Header Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 block">
                      {cert.certificateType}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                </span>
              </div>

              {/* Certificate Metadata */}
              <div className="mt-4 space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-2xl border border-slate-150">
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Recipient:</span>
                  <span className="font-bold text-slate-800">{cert.recipientName}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Grade:</span>
                  <span className="font-bold text-amber-900">{cert.grade}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Issue Date:</span>
                  <span className="font-medium text-slate-700">{cert.issueDate}</span>
                </p>
                <p className="flex items-center justify-between font-mono-code text-[11px]">
                  <span className="text-slate-400 font-sans">Credential ID:</span>
                  <span className="text-indigo-600 font-bold">{cert.credentialId}</span>
                </p>
              </div>

              {/* Skills Tags */}
              <div className="mt-3.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Verified Competencies
                </span>
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 text-[11px] font-semibold border border-amber-200/80"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => navigate(`/certificate/${cert.id}`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                <span>View Full Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate(`/verify/${cert.credentialId}`)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                title="Verify Credential Hash"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
