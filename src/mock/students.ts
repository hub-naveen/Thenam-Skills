import { StudentProfile } from '../types';

export const DEMO_USER: StudentProfile = {
  id: 'usr_naveen_01',
  name: 'Naveen K',
  headline: 'AI & Data Science Student',
  college: 'DMI College of Engineering',
  department: 'Artificial Intelligence & Data Science',
  yearOfStudy: 'Final Year (2023 - 2027)',
  location: 'Chennai, India',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  bio: 'Passionate Artificial Intelligence & Data Science undergraduate at DMI College of Engineering. Focused on building production-ready Machine Learning pipelines, NLP systems, and end-to-end data analytics solutions. Open for AI engineering and research internships.',
  email: 'naveen.k@dmi.edu.in',
  phone: '+91 98765 43210',
  githubUrl: 'https://github.com/hub-naveen',
  linkedinUrl: 'https://linkedin.com/in/1naveen',
  portfolioUrl: 'https://naveenk.dev',
  skills: [
    'Python',
    'Machine Learning',
    'SQL',
    'Data Science',
    'Web Development',
    'TensorFlow',
    'Scikit-Learn',
    'PostgreSQL',
    'React',
    'FastAPI'
  ],
  interests: [
    'Deep Learning',
    'Generative AI & LLMs',
    'Computer Vision',
    'Autonomous Systems',
    'Distributed Data Systems'
  ],
  metrics: {
    coursesCompleted: 6,
    certificatesCount: 4,
    projectsCount: 5,
    networkCount: 184,
    xpPoints: 4850,
    streakDays: 14,
    globalRank: 12
  },
  isAvailableForHire: true,
  preferredRoles: [
    'Machine Learning Engineer Intern',
    'Data Scientist',
    'AI Research Associate',
    'Full-Stack Developer'
  ],
  journey: [
    {
      id: 'mj_01',
      date: 'Aug 12, 2026',
      type: 'certificate_earned',
      title: 'Machine Learning & Predictive Modeling Masterclass',
      subtitle: 'Verified by THENAM Skills & DMI Tech Board',
      description: 'Completed 40 hours of rigorous supervised and unsupervised algorithm labs with 98% capstone score.',
      verified: true,
      certificateId: 'cert_ml_2026'
    },
    {
      id: 'mj_02',
      date: 'Aug 04, 2026',
      type: 'workshop_attended',
      title: 'Hands-on Generative AI & RAG Architectures',
      subtitle: 'Conducted by Google Developer Experts',
      description: 'Constructed vector search pipeline with Gemini 1.5 Pro and ChromaDB in real-time cohort.',
      verified: true
    },
    {
      id: 'mj_03',
      date: 'Jul 28, 2026',
      type: 'webinar_attended',
      title: 'AI Career Pathways & Global Industry Standards',
      subtitle: 'Keynote by Chief Data Officer, Turing Global',
      description: 'Participated in live panel on production deployment of ML systems.',
      verified: true
    },
    {
      id: 'mj_04',
      date: 'Jul 15, 2026',
      type: 'project_milestone',
      title: 'Published Smart City Traffic Vision v2.0',
      subtitle: 'Open-source Edge AI Project',
      description: 'Optimized YOLOv9 model running at 45 FPS on edge devices with real-time congestion heatmaps.',
      projectId: 'proj_smart_traffic'
    },
    {
      id: 'mj_05',
      date: 'Jun 22, 2026',
      type: 'certificate_earned',
      title: 'Advanced Python for Data Science & Analytics',
      subtitle: 'Verified by THENAM Skills',
      description: 'Mastered vectorization, multiprocessing, Pandas optimization, and statistical modeling.',
      verified: true,
      certificateId: 'cert_py_2026'
    },
    {
      id: 'mj_06',
      date: 'May 30, 2026',
      type: 'achievement',
      title: 'Top 5% Performer in National AI Hackathon',
      subtitle: 'Organized by THENAM Skills Community',
      description: 'Built automated triage diagnostic assistant for rural clinics using lightweight edge models.',
      verified: true
    }
  ]
};

export const OTHER_STUDENTS: StudentProfile[] = [
  {
    id: 'usr_ananya_02',
    name: 'Ananya Sharma',
    headline: 'Full-Stack Developer & Cloud Architect',
    college: 'Anna University, CEG Campus',
    department: 'Computer Science and Engineering',
    yearOfStudy: 'Final Year',
    location: 'Chennai, India',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    bio: 'Building resilient cloud-native web applications with React, Go, and AWS. Certified Solutions Architect and open-source enthusiast.',
    email: 'ananya.s@ceg.annauniv.edu',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'Go', 'GraphQL', 'Next.js'],
    interests: ['Serverless', 'Microservices', 'Distributed Databases'],
    metrics: {
      coursesCompleted: 8,
      certificatesCount: 5,
      projectsCount: 6,
      networkCount: 342,
      xpPoints: 6200,
      streakDays: 28,
      globalRank: 4
    },
    journey: []
  },
  {
    id: 'usr_rohit_03',
    name: 'Rohit Varma',
    headline: 'Cybersecurity Analyst & Ethical Hacker',
    college: 'SSN College of Engineering',
    department: 'Information Technology',
    yearOfStudy: 'Third Year',
    location: 'Chennai, India',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    bio: 'CTF Player, Web Security researcher. Enthusiastic about penetration testing, cloud hardening, and defensive security protocols.',
    email: 'rohit.v@ssn.edu.in',
    skills: ['Cybersecurity', 'Penetration Testing', 'Python', 'Linux', 'Network Security', 'Wireshark', 'Burp Suite'],
    interests: ['Zero Trust', 'Threat Intelligence', 'Reverse Engineering'],
    metrics: {
      coursesCompleted: 5,
      certificatesCount: 3,
      projectsCount: 3,
      networkCount: 129,
      xpPoints: 3900,
      streakDays: 9,
      globalRank: 19
    },
    journey: []
  },
  {
    id: 'usr_priya_04',
    name: 'Priya Sundaram',
    headline: 'UI/UX Designer & Design Systems Lead',
    college: 'NIFT Chennai',
    department: 'Digital Design',
    yearOfStudy: 'Final Year',
    location: 'Chennai, India',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    bio: 'Crafting empathetic, human-centered micro-interactions and scalable design systems for modern fintech and edtech products.',
    email: 'priya.s@nift.ac.in',
    skills: ['Figma', 'Design Systems', 'UI/UX Design', 'Prototyping', 'User Research', 'Tailwind CSS', 'Framer'],
    interests: ['Accessibility', 'Motion Design', 'Product Strategy'],
    metrics: {
      coursesCompleted: 7,
      certificatesCount: 4,
      projectsCount: 8,
      networkCount: 290,
      xpPoints: 5400,
      streakDays: 21,
      globalRank: 8
    },
    journey: []
  },
  {
    id: 'usr_karthik_05',
    name: 'Karthik Subramanian',
    headline: 'Data Engineer & Big Data Specialist',
    college: 'SRM Institute of Science and Technology',
    department: 'Computer Science',
    yearOfStudy: 'Final Year',
    location: 'Chennai, India',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    bio: 'Architecting scalable streaming ETL pipelines with Apache Spark, Kafka, and Snowflake. Passionate about real-time analytics.',
    email: 'karthik.s@srmist.edu.in',
    skills: ['SQL', 'Apache Spark', 'Python', 'Kafka', 'PostgreSQL', 'Data Warehousing', 'Snowflake'],
    interests: ['Stream Processing', 'Data Lakehouse', 'dbt'],
    metrics: {
      coursesCompleted: 6,
      certificatesCount: 3,
      projectsCount: 4,
      networkCount: 165,
      xpPoints: 4200,
      streakDays: 11,
      globalRank: 16
    },
    journey: []
  }
];
