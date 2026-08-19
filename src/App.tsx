import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { AutomationCelebrationModal } from './components/AutomationCelebrationModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

// Pages
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { CertificateDetailPage } from './pages/CertificateDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { TalentPage } from './pages/TalentPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NetworkPage } from './pages/NetworkPage';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

import { ShieldCheck, Heart, ExternalLink, Sparkles, BookOpen, Award, Users, Layers } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { user, loading } = useAuth();

  // Route resolver
  const renderRoute = () => {
    const path = currentPath.toLowerCase();

    if (path.startsWith('/learn')) {
      return <LearnPage />;
    }
    if (path.startsWith('/course/')) {
      return <CourseDetailPage />;
    }
    if (path.startsWith('/certificate/') || path.startsWith('/verify/')) {
      return <CertificateDetailPage />;
    }
    if (path.startsWith('/certificates')) {
      return <CertificatesPage />;
    }
    if (path.startsWith('/projects') || path.startsWith('/project/')) {
      return <ProjectsPage />;
    }
    if (path.startsWith('/events')) {
      return <EventsPage />;
    }
    if (path.startsWith('/communities')) {
      return <CommunitiesPage />;
    }
    if (path.startsWith('/talent') || path.startsWith('/search')) {
      return <TalentPage />;
    }
    if (path.startsWith('/achievements')) {
      return <AchievementsPage />;
    }
    if (path.startsWith('/network')) {
      return <NetworkPage />;
    }
    if (path.startsWith('/profile')) {
      return <ProfilePage />;
    }
    if (path.startsWith('/messages')) {
      return <MessagesPage />;
    }
    if (path.startsWith('/notifications')) {
      return <NotificationsPage />;
    }
    if (path.startsWith('/settings')) {
      return <SettingsPage />;
    }
    if (path.startsWith('/admin')) {
      return <AdminPage />;
    }

    // Default route -> Home
    return <HomePage />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100/70 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1 pb-12">
        {renderRoute()}
      </main>

      {/* Global Modals & Notifications */}
      <AutomationCelebrationModal />
      <Toast />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-slate-800">THENAM SKILLS</span>
            <span>•</span>
            <span>Verified Student Credentialing & Talent Network</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <button onClick={() => navigate('/home')} className="hover:text-indigo-600 transition-colors">Feed</button>
            <button onClick={() => navigate('/learn')} className="hover:text-indigo-600 transition-colors">Courses</button>
            <button onClick={() => navigate('/certificates')} className="hover:text-indigo-600 transition-colors">Certificates</button>
            <button onClick={() => navigate('/projects')} className="hover:text-indigo-600 transition-colors">Projects</button>
            <button onClick={() => navigate('/talent')} className="hover:text-indigo-600 transition-colors">Talent Hub</button>
            <button onClick={() => navigate('/admin')} className="hover:text-indigo-600 transition-colors">Faculty Portal</button>
          </div>

          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} THENAM Academic Board. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </RouterProvider>
    </AuthProvider>
  );
}
