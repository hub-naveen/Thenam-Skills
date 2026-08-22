import React, { useState, useEffect } from 'react';
import { Award, ArrowLeft, ShieldCheck, CheckCircle2, FileQuestion } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { CertificateViewer } from '../components/CertificateViewer';
import { api } from '../services/api';

export const CertificateDetailPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  
  // Extract ID / Code from /certificate/:id or /verify/:verificationCode
  const parts = currentPath.split('/');
  const certId = parts[2] || '';

  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!certId) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const isVerification = currentPath.startsWith('/verify/');
    const url = isVerification 
      ? `/certificates/verify/${certId}`
      : `/certificates/${certId}`;

    api.get(url)
      .then(res => {
        const data = res.data;
        if (isVerification) {
          // Public verify return properties
          setCertificate({
            id: certId,
            title: data.certificateTitle,
            recipientName: data.studentName,
            courseName: data.courseName,
            issueDate: new Date(data.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            credentialId: data.certificateNumber,
            verificationHash: data.verificationCode,
            verifiedBy: 'THENAM Academic Certification Board & DMI College of Engineering',
            grade: 'Distinction (98.5% Score)',
            skills: [],
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://thenamskills.web.app/verify/${data.verificationCode}`,
            issuerLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&auto=format&fit=crop&q=80',
            certificateType: 'Course Mastery',
            isVerified: true
          });
        } else {
          // Regular authenticated details return
          setCertificate({
            id: data._id,
            title: data.title,
            recipientName: data.user?.name || 'Student',
            courseName: data.course?.title || data.title,
            issueDate: new Date(data.issuedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            credentialId: data.certificateNumber,
            verificationHash: data.verificationCode,
            verifiedBy: 'THENAM Academic Certification Board & DMI College of Engineering',
            grade: 'Distinction (98.5% Score)',
            skills: (data.course?.skills || []).map((s: any) => s.name || s),
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${data.certificateURL}`,
            issuerLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&auto=format&fit=crop&q=80',
            certificateType: 'Course Mastery',
            isVerified: true
          });
        }
      })
      .catch(err => {
        console.error('Failed to load certificate:', err);
        setCertificate(null);
      })
      .finally(() => setLoading(false));
  }, [currentPath, certId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-bold">Verifying credential from academic board...</p>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 font-sans">
        <FileQuestion className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Certificate Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested credential could not be verified or has not been registered in the database ledger.
        </p>
        <button
          onClick={() => navigate('/certificates')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 cursor-pointer"
        >
          Go to My Certificates
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
      
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/certificates')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Certificates</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Official Public Verification Record</span>
        </div>
      </div>

      {/* Render High-Fidelity Viewer */}
      <CertificateViewer certificate={certificate} />
    </div>
  );
};
export default CertificateDetailPage;
