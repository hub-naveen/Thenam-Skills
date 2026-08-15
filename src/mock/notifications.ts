import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    type: 'certificate',
    title: 'Certificate Ready: Machine Learning & CV Masterclass',
    message: 'Your official verified certificate has been issued and linked to your immutable credential ID THNM-2026-ML-9842.',
    timestamp: '2 hours ago',
    isRead: false,
    link: '/certificate/cert_ml_2026',
    actionText: 'View Certificate',
    actionUrl: '/certificate/cert_ml_2026'
  },
  {
    id: 'notif_02',
    type: 'achievement',
    title: 'New Skill Badge Unlocked: YOLOv9 Edge Vision',
    message: 'You have completed all prerequisite labs and added YOLOv9 to your public talent profile.',
    timestamp: '2 hours ago',
    isRead: false,
    link: '/achievements',
    actionText: 'View Badge',
    actionUrl: '/achievements'
  },
  {
    id: 'notif_03',
    type: 'event',
    title: 'Reminder: Hands-on Generative AI Workshop starts this Saturday',
    message: 'The live cohort link is ready. Pre-install Python 3.11 and the required lab packages.',
    timestamp: '1 day ago',
    isRead: true,
    link: '/events/event_ws_01',
    actionText: 'Open Workshop',
    actionUrl: '/events/event_ws_01'
  },
  {
    id: 'notif_04',
    type: 'connection',
    title: 'Priya Sundaram sent you a connection invitation',
    message: 'UI/UX Designer & Design Systems Lead at NIFT Chennai wants to connect.',
    timestamp: '2 days ago',
    isRead: true,
    link: '/network',
    actionText: 'Accept Connection',
    actionUrl: '/network'
  },
  {
    id: 'notif_05',
    type: 'message',
    title: 'New message from Dr. R. Arvind',
    message: '“Naveen, take a look at the TensorRT benchmark script I sent over.”',
    timestamp: '3 days ago',
    isRead: true,
    link: '/messages',
    actionText: 'Reply',
    actionUrl: '/messages'
  }
];
