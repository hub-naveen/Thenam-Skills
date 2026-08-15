import { Conversation } from '../types';

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_arvind',
    participant: {
      id: 'usr_mentor_arvind',
      name: 'Dr. R. Arvind',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      headline: 'Head of AI Research @ THENAM',
      college: 'THENAM Institute of Technology',
      isOnline: true,
      lastSeen: 'Online'
    },
    lastMessage: 'Naveen, check the TensorRT FP16 quantization benchmarks for your edge model.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'usr_mentor_arvind',
        text: 'Hello Naveen! Excellent work on the YOLOv9 capstone project.',
        timestamp: 'Yesterday 04:30 PM',
        isRead: true
      },
      {
        id: 'm2',
        senderId: 'usr_naveen_01',
        text: 'Thank you so much, Dr. Arvind! I optimized the non-maximum suppression step.',
        timestamp: 'Yesterday 04:35 PM',
        isRead: true
      },
      {
        id: 'm3',
        senderId: 'usr_mentor_arvind',
        text: 'Naveen, check the TensorRT FP16 quantization benchmarks for your edge model. It will get you to 60 FPS easily.',
        timestamp: '10:45 AM',
        isRead: false
      }
    ]
  },
  {
    id: 'conv_ananya',
    participant: {
      id: 'usr_ananya_02',
      name: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      headline: 'Full-Stack Developer @ CEG',
      college: 'Anna University',
      isOnline: true,
      lastSeen: 'Online'
    },
    lastMessage: 'Let’s sync up on the hackathon submission tonight!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'usr_ananya_02',
        text: 'Hey Naveen! Are you free to review our team architecture for the THENAM AI Hackathon?',
        timestamp: 'Yesterday 02:10 PM',
        isRead: true
      },
      {
        id: 'm5',
        senderId: 'usr_naveen_01',
        text: 'Yes! I just finished setting up the FastAPI backend container.',
        timestamp: 'Yesterday 02:15 PM',
        isRead: true
      },
      {
        id: 'm6',
        senderId: 'usr_ananya_02',
        text: 'Let’s sync up on the hackathon submission tonight!',
        timestamp: 'Yesterday 02:20 PM',
        isRead: true
      }
    ]
  },
  {
    id: 'conv_sanjana',
    participant: {
      id: 'usr_recruiter_sanjana',
      name: 'Sanjana Malhotra',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      headline: 'University Talent Acquisition Lead @ Nexus AI',
      college: 'Nexus Tech Global',
      isOnline: false,
      lastSeen: '2 hours ago'
    },
    lastMessage: 'Hi Naveen, we reviewed your THENAM profile and projects. Would you be open for an AI Intern interview?',
    lastMessageTime: 'Aug 14',
    unreadCount: 0,
    messages: [
      {
        id: 'm7',
        senderId: 'usr_recruiter_sanjana',
        text: 'Hi Naveen, we reviewed your THENAM profile and verified certificates. Would you be open for a preliminary conversation regarding our Winter AI Internship cohort?',
        timestamp: 'Aug 14, 11:30 AM',
        isRead: true
      }
    ]
  }
];
