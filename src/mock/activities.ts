import { ActivityItem } from '../types';

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act_00',
    type: 'achievement',
    author: {
      id: 'usr_francis_01',
      name: 'Francis Jaison',
      headline: 'Team Red Dragon',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      college: 'Sri Sairam Engineering College'
    },
    timestamp: 'Just now',
    title: 'Won Best Team Award at OneYes Hackathon 2026',
    description: 'Proud moment for our team Red Dragon 🔥We are excited to share that we secured the "Best Team" award at the OneYes Hackathon 2026, conducted by Thozhil and OneYes InfoTech at Sri Sairam Engineering College, Chennai.Out of 120+ participating teams, we successfully made it to the Top 10 and emerged as the Best Team 🏆Our project, "ZARA – The Pilot", focuses on building an AI-powered autonomous drone intelligence system, aiming to reduce dependency on manual drone pilots and move towards smarter aerial automation.This achievement is the result of teamwork, continuous learning, and pushing our limits under pressure.A big thanks to my amazing teammates [Francis Jaison](https://www.linkedin.com/in/francis-jaison-920a30290/) and [DINESH S](https://www.linkedin.com/in/dinesh-xo/) for their dedication and collaboration 🤝Grateful for this opportunity and looking forward to building more innovative solutions ahead 🚀',
    badgeText: '🏅 Achievement',
    badgeTheme: 'rose',
    metadata: {
      imageUrls: ['/feed1.jpg']
    },
    likesCount: 128,
    isLiked: false,
    commentsCount: 12,
    sharesCount: 8,
    isSaved: false,
    comments: []
  },
  {
    id: 'act_01',
    type: 'certificate_earned',
    author: {
      id: 'usr_naveen_01',
      name: 'Naveen K',
      headline: 'AI & Data Science Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'DMI College of Engineering'
    },
    timestamp: '2 hours ago',
    title: 'Earned Official Certificate in Machine Learning & Computer Vision',
    description: 'Completed 14 weeks of intensive algorithms, PyTorch architecture modeling, and custom YOLOv9 training with a 98.4% capstone score. Huge thanks to Dr. Arvind and THENAM mentors for the guidance!',
    badgeText: '🏆 Certificate Earned',
    badgeTheme: 'amber',
    metadata: {
      certificateId: 'cert_ml_2026',
      courseTitle: 'Deep Neural Networks & Computer Vision Architecture',
      grade: 'A+ (98.4%)',
      verificationHash: 'THNM-2026-ML-9842',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80'
    },
    likesCount: 38,
    isLiked: true,
    commentsCount: 6,
    sharesCount: 5,
    isSaved: true,
    comments: [
      {
        id: 'c1',
        author: {
          name: 'Ananya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
          headline: 'Full-Stack Developer @ CEG'
        },
        text: 'Huge congratulations Naveen! That YOLOv9 capstone architecture was top tier 🔥',
        timestamp: '1 hour ago',
        likes: 4
      },
      {
        id: 'c2',
        author: {
          name: 'Dr. R. Arvind',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          headline: 'Head of AI Research @ THENAM'
        },
        text: 'Well deserved! Exceptional optimization on the edge inference pipeline.',
        timestamp: '45 mins ago',
        likes: 8
      }
    ]
  },
  {
    id: 'act_02',
    type: 'project_milestone',
    author: {
      id: 'usr_naveen_01',
      name: 'Naveen K',
      headline: 'AI & Data Science Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'DMI College of Engineering'
    },
    timestamp: '1 day ago',
    title: 'Shipped Smart City Edge Traffic Vision v2.0',
    description: 'Released open-source AI traffic surveillance software. Deployed on NVIDIA Jetson Nano with real-time multi-lane vehicle tracking, violation detection, and automated congestion alerts.',
    badgeText: '🚀 Project Milestone',
    badgeTheme: 'indigo',
    metadata: {
      projectId: 'proj_smart_traffic',
      projectTitle: 'Smart City Edge Traffic Vision',
      imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
      metrics: '45 FPS • 99.1% Detection Accuracy • 120 GitHub Stars'
    },
    likesCount: 54,
    isLiked: false,
    commentsCount: 9,
    sharesCount: 12,
    comments: [
      {
        id: 'c3',
        author: {
          name: 'Rohit Varma',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
          headline: 'Cybersecurity Analyst @ SSN'
        },
        text: 'The edge throughput optimization is crazy smooth. Starred the repo!',
        timestamp: '18 hours ago',
        likes: 2
      }
    ]
  },
  {
    id: 'act_03',
    type: 'skill_unlocked',
    author: {
      id: 'usr_ananya_02',
      name: 'Ananya Sharma',
      headline: 'Full-Stack Developer & Cloud Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      college: 'Anna University, CEG'
    },
    timestamp: '1 day ago',
    title: 'Unlocked Skill: Distributed System Microservices & gRPC',
    description: 'Mastered high-performance binary RPC protocol communications, proto3 serialization, and load balancing across Docker clusters with 100% quiz accuracy.',
    badgeText: '✨ Skill Unlocked',
    badgeTheme: 'emerald',
    metadata: {
      skillName: 'gRPC & Microservices',
      courseTitle: 'Distributed Systems Architecture'
    },
    likesCount: 29,
    isLiked: false,
    commentsCount: 3,
    sharesCount: 1,
    comments: []
  },
  {
    id: 'act_04',
    type: 'workshop_attended',
    author: {
      id: 'usr_naveen_01',
      name: 'Naveen K',
      headline: 'AI & Data Science Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'DMI College of Engineering'
    },
    timestamp: '3 days ago',
    title: 'Attended Workshop: Hands-on Generative AI & RAG Architectures',
    description: 'Participated in a 4-hour live code-along with Google Developer Experts building hybrid vector databases, embedding rerankers, and contextual memory agents.',
    badgeText: '🎓 Workshop Attended',
    badgeTheme: 'purple',
    metadata: {
      eventId: 'event_ws_01',
      eventTitle: 'Hands-on Generative AI & RAG Architectures',
      verificationHash: 'THNM-2026-WS-8192'
    },
    likesCount: 42,
    isLiked: true,
    commentsCount: 4,
    sharesCount: 7,
    comments: []
  },
  {
    id: 'act_05',
    type: 'webinar_attended',
    author: {
      id: 'usr_priya_04',
      name: 'Priya Sundaram',
      headline: 'UI/UX Designer & Design Systems Lead',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      college: 'NIFT Chennai'
    },
    timestamp: '4 days ago',
    title: 'Attended Global Webinar: Scaling Multi-Brand Design Systems',
    description: 'Learned token-based design systems with Figma variables and automated styling pipelines for enterprise products. Keynotes by Senior Design Director at Stripe.',
    badgeText: '🎙 Webinar Attended',
    badgeTheme: 'cyan',
    metadata: {
      eventId: 'event_web_02',
      eventTitle: 'Scaling Multi-Brand Design Systems in 2026'
    },
    likesCount: 31,
    isLiked: false,
    commentsCount: 2,
    sharesCount: 3,
    comments: []
  },
  {
    id: 'act_06',
    type: 'achievement',
    author: {
      id: 'usr_rohit_03',
      name: 'Rohit Varma',
      headline: 'Cybersecurity Analyst & Ethical Hacker',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      college: 'SSN College of Engineering'
    },
    timestamp: '5 days ago',
    title: 'Secured 1st Place at National Cyber Defense Hackathon 2026',
    description: 'Defended cloud infrastructure against simulated APT red teams for 18 continuous hours. Awarded ₹50,000 cash prize & industry internship offer.',
    badgeText: '🏅 Achievement',
    badgeTheme: 'rose',
    metadata: {
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      metrics: 'Rank #1 of 84 Teams • 18hr Live CTF'
    },
    likesCount: 92,
    isLiked: true,
    commentsCount: 14,
    sharesCount: 19,
    comments: []
  },
  {
    id: 'act_07',
    type: 'student_post',
    author: {
      id: 'usr_naveen_01',
      name: 'Naveen K',
      headline: 'AI & Data Science Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'DMI College of Engineering'
    },
    timestamp: '6 days ago',
    title: 'Demystifying FlashAttention vs Standard Softmax Attention in LLMs',
    description: 'Wrote a quick breakdown on why IO-awareness and SRAM tiling makes transformer attention 3x faster without changing mathematical accuracy. Check out my notes in the THENAM Deep Learning community!',
    badgeText: '💭 Student Post',
    badgeTheme: 'blue',
    metadata: {
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
    },
    likesCount: 46,
    isLiked: false,
    commentsCount: 8,
    sharesCount: 4,
    comments: []
  }
];
