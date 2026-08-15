import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  Course,
  Certificate,
  Project,
  EventItem,
  ActivityItem,
  NetworkConnection,
  NotificationItem,
  Conversation,
  CommunityGroup,
  AppSettings,
  ActivityType
} from '../types';
import { DEMO_USER } from '../mock/students';
import { INITIAL_COURSES } from '../mock/courses';
import { INITIAL_CERTIFICATES } from '../mock/certificates';
import { INITIAL_ACTIVITIES } from '../mock/activities';
import { INITIAL_PROJECTS } from '../mock/projects';
import { INITIAL_EVENTS } from '../mock/events';
import { INITIAL_CONNECTIONS } from '../mock/connections';
import { INITIAL_NOTIFICATIONS } from '../mock/notifications';
import { INITIAL_CONVERSATIONS } from '../mock/messages';
import { INITIAL_COMMUNITIES } from '../mock/communities';

interface AutomationPayload {
  title: string;
  courseName: string;
  certificateId: string;
  skillsAdded: string[];
  xpGained: number;
}

interface AppContextType {
  currentUser: StudentProfile;
  updateCurrentUser: (updated: Partial<StudentProfile>) => void;
  addSkillToProfile: (skill: string) => void;
  removeSkillFromProfile: (skill: string) => void;
  
  // Courses
  courses: Course[];
  enrollInCourse: (courseId: string) => void;
  toggleCourseBookmark: (courseId: string) => void;
  completeCourseModule: (courseId: string, moduleId: string) => void;
  
  // Automated Experience Pipeline
  triggerCourseCompletionAutomation: (courseId: string) => Certificate | null;
  activeAutomationModal: AutomationPayload | null;
  closeAutomationModal: () => void;
  
  // Activities / Feed
  activities: ActivityItem[];
  createActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp' | 'likesCount' | 'isLiked' | 'commentsCount' | 'comments' | 'sharesCount'>) => void;
  toggleLikeActivity: (activityId: string) => void;
  addCommentToActivity: (activityId: string, text: string) => void;
  toggleSaveActivity: (activityId: string) => void;
  deleteActivity: (activityId: string) => void;
  
  // Certificates
  certificates: Certificate[];
  getCertificateById: (id: string) => Certificate | undefined;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'likesCount' | 'viewsCount' | 'createdAt'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleLikeProject: (id: string) => void;
  
  // Events
  events: EventItem[];
  toggleEventRegistration: (eventId: string) => void;
  
  // Network Connections
  connections: NetworkConnection[];
  toggleConnectionStatus: (connectionId: string) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
  
  // Conversations
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  
  // Communities
  communities: CommunityGroup[];
  toggleJoinCommunity: (communityId: string) => void;
  
  // Settings
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  
  // Global Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  autoAddCompletedCourses: true,
  autoCreateAchievementActivity: true,
  showAchievementsInFeed: true,
  autoAddWorkshopAttendance: true,
  autoAddWebinarActivity: true,
  askBeforePublishing: false,
  emailNotifications: true,
  networkVisibility: 'public',
  talentSearchDiscoverable: true,
  theme: 'light'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('thenam_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('thenam_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('thenam_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('thenam_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('thenam_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('thenam_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [connections, setConnections] = useState<NetworkConnection[]>(() => {
    const saved = localStorage.getItem('thenam_connections');
    return saved ? JSON.parse(saved) : INITIAL_CONNECTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('thenam_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('thenam_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [communities, setCommunities] = useState<CommunityGroup[]>(() => {
    const saved = localStorage.getItem('thenam_communities');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITIES;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('thenam_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_arvind');
  const [activeAutomationModal, setActiveAutomationModal] = useState<AutomationPayload | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('thenam_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('thenam_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('thenam_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('thenam_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('thenam_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('thenam_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('thenam_connections', JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem('thenam_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('thenam_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('thenam_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('thenam_settings', JSON.stringify(settings));
  }, [settings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const updateCurrentUser = (updated: Partial<StudentProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updated }));
    showToast('Profile updated successfully');
  };

  const addSkillToProfile = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (!currentUser.skills.includes(trimmed)) {
      setCurrentUser(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
      showToast(`Skill "${trimmed}" added to your profile`);
    }
  };

  const removeSkillFromProfile = (skill: string) => {
    setCurrentUser(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  // Course actions
  const enrollInCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, isEnrolled: true, progress: c.progress || 10 };
      }
      return c;
    }));
    showToast('Enrolled in course! Happy learning.');
  };

  const toggleCourseBookmark = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const nextState = !c.isBookmarked;
        showToast(nextState ? 'Course bookmarked' : 'Course removed from bookmarks');
        return { ...c, isBookmarked: nextState };
      }
      return c;
    }));
  };

  const completeCourseModule = (courseId: string, moduleId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const updatedModules = c.modules.map(m => m.id === moduleId ? { ...m, isCompleted: true } : m);
        const completedCount = updatedModules.filter(m => m.isCompleted).length;
        const newProgress = Math.round((completedCount / updatedModules.length) * 100);
        return {
          ...c,
          modules: updatedModules,
          completedModules: completedCount,
          progress: newProgress
        };
      }
      return c;
    }));
  };

  // THE AUTOMATED EXPERIENCE PIPELINE
  const triggerCourseCompletionAutomation = (courseId: string): Certificate | null => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    // 1. Mark course 100% complete
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          progress: 100,
          completedModules: c.totalModules,
          isEnrolled: true,
          modules: c.modules.map(m => ({ ...m, isCompleted: true }))
        };
      }
      return c;
    }));

    // 2. Generate new Verified Certificate
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
    const hash = `0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase()}`;
    const certId = `cert_${course.domain}_${Date.now().toString().slice(-4)}`;
    const credId = `THNM-2026-${course.category.slice(0, 2).toUpperCase()}-${randomHex}`;

    const newCertificate: Certificate = {
      id: certId,
      title: `${course.title} Mastery Certificate`,
      recipientName: currentUser.name,
      recipientUid: currentUser.id,
      courseId: course.id,
      courseName: course.title,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      credentialId: credId,
      verificationHash: hash,
      verifiedBy: 'THENAM Academic Certification Board & DMI College of Engineering',
      grade: 'Distinction (98.5% Score)',
      skills: course.skillsGained,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://thenamskills.edu/verify/${credId}`,
      issuerLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&auto=format&fit=crop&q=80',
      certificateType: 'Course Mastery',
      isVerified: true
    };

    setCertificates(prev => [newCertificate, ...prev]);

    // 3. Add new skills to student profile
    const newlyAddedSkills = course.skillsGained.filter(s => !currentUser.skills.includes(s));
    
    // 4. Update student metrics and journey
    const newMilestone = {
      id: `mj_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'certificate_earned' as ActivityType,
      title: `${course.title} Masterclass`,
      subtitle: `Verified by THENAM Skills (${credId})`,
      description: `Completed all modules and passed final capstone assessment with distinction score.`,
      verified: true,
      certificateId: newCertificate.id,
      courseId: course.id
    };

    setCurrentUser(prev => ({
      ...prev,
      skills: Array.from(new Set([...prev.skills, ...course.skillsGained])),
      metrics: {
        ...prev.metrics,
        coursesCompleted: prev.metrics.coursesCompleted + 1,
        certificatesCount: prev.metrics.certificatesCount + 1,
        xpPoints: prev.metrics.xpPoints + 450,
        streakDays: prev.metrics.streakDays + 1
      },
      journey: [newMilestone, ...prev.journey]
    }));

    // 5. Automated Learning Activity Card in Feed (if enabled in settings)
    if (settings.autoCreateAchievementActivity) {
      const automatedActivity: ActivityItem = {
        id: `act_${Date.now()}`,
        type: 'certificate_earned',
        author: {
          id: currentUser.id,
          name: currentUser.name,
          headline: currentUser.headline,
          avatar: currentUser.avatar,
          college: currentUser.college
        },
        timestamp: 'Just now',
        title: `Completed & Earned Verified Certificate in ${course.title}`,
        description: `Successfully finished all modules and scored 98.5% on the final comprehensive assessment. Added ${course.skillsGained.join(', ')} to verified skill portfolio.`,
        badgeText: '🏆 Certificate Earned',
        badgeTheme: 'amber',
        metadata: {
          certificateId: newCertificate.id,
          courseId: course.id,
          courseTitle: course.title,
          grade: 'Distinction (98.5%)',
          verificationHash: credId,
          imageUrl: course.thumbnail
        },
        likesCount: 1,
        isLiked: false,
        commentsCount: 0,
        comments: [],
        sharesCount: 0,
        isSaved: false
      };

      setActivities(prev => [automatedActivity, ...prev]);
    }

    // 6. Push Achievement Notification
    const newNotification: NotificationItem = {
      id: `notif_${Date.now()}`,
      type: 'certificate',
      title: `Certificate Issued: ${course.title}`,
      message: `Your verified certificate (${credId}) is now available in your portfolio.`,
      timestamp: 'Just now',
      isRead: false,
      link: `/certificate/${newCertificate.id}`,
      actionText: 'View Certificate',
      actionUrl: `/certificate/${newCertificate.id}`
    };

    setNotifications(prev => [newNotification, ...prev]);

    // 7. Fire celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    // 8. Open Automation Celebration Modal
    setActiveAutomationModal({
      title: 'Course Completed & Certificate Awarded!',
      courseName: course.title,
      certificateId: newCertificate.id,
      skillsAdded: course.skillsGained,
      xpGained: 450
    });

    return newCertificate;
  };

  const closeAutomationModal = () => {
    setActiveAutomationModal(null);
  };

  // Activity Feed interactions
  const createActivity = (activityData: Omit<ActivityItem, 'id' | 'timestamp' | 'likesCount' | 'isLiked' | 'commentsCount' | 'comments' | 'sharesCount'>) => {
    const newActivity: ActivityItem = {
      ...activityData,
      id: `act_${Date.now()}`,
      timestamp: 'Just now',
      likesCount: 0,
      isLiked: false,
      commentsCount: 0,
      comments: [],
      sharesCount: 0
    };
    setActivities(prev => [newActivity, ...prev]);
    showToast('Activity shared with your THENAM network!');
  };

  const toggleLikeActivity = (activityId: string) => {
    setActivities(prev => prev.map(act => {
      if (act.id === activityId) {
        const isLiked = !act.isLiked;
        return {
          ...act,
          isLiked,
          likesCount: isLiked ? act.likesCount + 1 : Math.max(0, act.likesCount - 1)
        };
      }
      return act;
    }));
  };

  const addCommentToActivity = (activityId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        headline: currentUser.headline
      },
      text: text.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setActivities(prev => prev.map(act => {
      if (act.id === activityId) {
        return {
          ...act,
          commentsCount: act.commentsCount + 1,
          comments: [...act.comments, newComment]
        };
      }
      return act;
    }));
  };

  const toggleSaveActivity = (activityId: string) => {
    setActivities(prev => prev.map(act => {
      if (act.id === activityId) {
        const isSaved = !act.isSaved;
        showToast(isSaved ? 'Activity saved to your bookmarks' : 'Activity removed from bookmarks');
        return { ...act, isSaved };
      }
      return act;
    }));
  };

  const deleteActivity = (activityId: string) => {
    setActivities(prev => prev.filter(act => act.id !== activityId));
    showToast('Activity removed');
  };

  const getCertificateById = (id: string) => {
    return certificates.find(c => c.id === id || c.credentialId === id);
  };

  // Projects
  const addProject = (proj: Omit<Project, 'id' | 'likesCount' | 'viewsCount' | 'createdAt'>) => {
    const newProject: Project = {
      ...proj,
      id: `proj_${Date.now()}`,
      likesCount: 0,
      isLiked: false,
      viewsCount: 1,
      createdAt: 'Just now'
    };
    setProjects(prev => [newProject, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      metrics: { ...prev.metrics, projectsCount: prev.metrics.projectsCount + 1, xpPoints: prev.metrics.xpPoints + 200 }
    }));
    showToast('Project published to your portfolio!');
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('Project updated successfully');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setCurrentUser(prev => ({
      ...prev,
      metrics: { ...prev.metrics, projectsCount: Math.max(0, prev.metrics.projectsCount - 1) }
    }));
    showToast('Project deleted');
  };

  const toggleLikeProject = (id: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
  };

  // Events
  const toggleEventRegistration = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const isRegistered = !ev.isRegistered;
        showToast(isRegistered ? `Registered for ${ev.title}! Calendar invite generated.` : `Cancelled registration for ${ev.title}`);
        return {
          ...ev,
          isRegistered,
          registeredCount: isRegistered ? ev.registeredCount + 1 : Math.max(0, ev.registeredCount - 1)
        };
      }
      return ev;
    }));
  };

  // Network
  const toggleConnectionStatus = (connectionId: string) => {
    setConnections(prev => prev.map(conn => {
      if (conn.id === connectionId) {
        let newStatus: 'none' | 'pending' | 'connected' | 'received' = 'none';
        if (conn.status === 'none') {
          newStatus = 'pending';
          showToast(`Connection request sent to ${conn.name}`);
        } else if (conn.status === 'pending') {
          newStatus = 'none';
          showToast(`Cancelled request to ${conn.name}`);
        } else if (conn.status === 'received') {
          newStatus = 'connected';
          showToast(`You are now connected with ${conn.name}`);
        } else if (conn.status === 'connected') {
          newStatus = 'none';
          showToast(`Removed connection with ${conn.name}`);
        }
        return { ...conn, status: newStatus };
      }
      return conn;
    }));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  // Conversations
  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: text.trim(),
          lastMessageTime: 'Just now',
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));
  };

  // Communities
  const toggleJoinCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(comm => {
      if (comm.id === communityId) {
        const isJoined = !comm.isJoined;
        showToast(isJoined ? `Joined the ${comm.name} community!` : `Left ${comm.name}`);
        return {
          ...comm,
          isJoined,
          memberCount: isJoined ? comm.memberCount + 1 : Math.max(0, comm.memberCount - 1)
        };
      }
      return comm;
    }));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Preferences updated');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        addSkillToProfile,
        removeSkillFromProfile,
        courses,
        enrollInCourse,
        toggleCourseBookmark,
        completeCourseModule,
        triggerCourseCompletionAutomation,
        activeAutomationModal,
        closeAutomationModal,
        activities,
        createActivity,
        toggleLikeActivity,
        addCommentToActivity,
        toggleSaveActivity,
        deleteActivity,
        certificates,
        getCertificateById,
        projects,
        addProject,
        updateProject,
        deleteProject,
        toggleLikeProject,
        events,
        toggleEventRegistration,
        connections,
        toggleConnectionStatus,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        communities,
        toggleJoinCommunity,
        settings,
        updateSettings,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
