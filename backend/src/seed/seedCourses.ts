import { admin } from '../config/firebaseAdmin';

export const COURSE_ITEMS = [
  {
    title: 'Deep Neural Networks & Computer Vision Architecture',
    category: 'AI & Data Science',
    description: 'Master convolutional architectures, residual networks, transformer vision backbones, and real-time object detection using PyTorch and OpenCV.',
    instructor: 'Dr. R. Arvind',
    level: 'Advanced',
    duration: '14 Weeks (48 Hours)',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Deep Learning', 'PyTorch', 'Computer Vision', 'YOLOv9', 'Neural Networks']
  },
  {
    title: 'Python for Data Science & Predictive Analytics',
    category: 'AI & Data Science',
    description: 'Practical data science from scratch: Exploratory data analysis, statistical inference, feature engineering, Scikit-Learn pipelines, and model evaluation.',
    instructor: 'Dr. Meenakshi S.',
    level: 'Intermediate',
    duration: '10 Weeks (36 Hours)',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Python', 'Pandas', 'Scikit-Learn', 'Feature Engineering', 'Data Visualization']
  },
  {
    title: 'Modern Full-Stack Engineering with React, TypeScript & Node',
    category: 'Web Development',
    description: 'Build production-grade full-stack web applications with React 19, TypeScript, Express, REST APIs, Tailwind CSS, and secure database integrations.',
    instructor: 'Vigneshwaran K.',
    level: 'Intermediate',
    duration: '12 Weeks (44 Hours)',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs']
  },
  {
    title: 'SQL Mastery & Relational Database Architecture',
    category: 'AI & Data Science',
    description: 'From complex subqueries and window functions to query optimization, indexing strategies, and database schema normal forms.',
    instructor: 'Sundar Rajan',
    level: 'Intermediate',
    duration: '8 Weeks (28 Hours)',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['SQL', 'PostgreSQL', 'Database Design', 'Query Optimization', 'Indexing']
  },
  {
    title: 'Cloud Infrastructure & Kubernetes for Developers',
    category: 'Cloud & DevOps',
    description: 'Learn containerization with Docker, orchestrating microservices with Kubernetes, Terraform Infrastructure as Code, and CI/CD pipelines.',
    instructor: 'Pooja Narayanan',
    level: 'Advanced',
    duration: '10 Weeks (36 Hours)',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Cloud Computing', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'DevOps']
  },
  {
    title: 'Ethical Hacking & Network Vulnerability Scanning',
    category: 'Cybersecurity',
    description: 'Understand defensive security: Reconnaissance, packet analysis, OWASP Top 10 vulnerabilities, firewall configurations, and penetration testing.',
    instructor: 'Lt. Col. Suresh K.',
    level: 'Intermediate',
    duration: '8 Weeks (30 Hours)',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Cybersecurity', 'Network Security', 'Ethical Hacking', 'OWASP', 'Linux', 'Wireshark']
  },
  {
    title: 'Visual Identity & Interaction Design Systems',
    category: 'Design & UI/UX',
    description: 'Deep dive into user-centered design: Wireframing, typography hierarchies, component libraries in Figma, cognitive usability, and Framer prototypes.',
    instructor: 'Priyanka Sen',
    level: 'Beginner',
    duration: '6 Weeks (24 Hours)',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Figma', 'Design Systems', 'UI/UX Design', 'Prototyping', 'User Research']
  }
];

export const seedCourses = async (skillIdMap: Map<string, string>): Promise<void> => {
  console.log('[Seeder] Starting courses synchronization to Firestore...');
  const db = admin.firestore();

  for (const item of COURSE_ITEMS) {
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Lookup Skill IDs
    const skillIds: string[] = [];
    for (const skillName of item.skillsGained) {
      const id = skillIdMap.get(skillName.toLowerCase());
      if (id) {
        skillIds.push(id);
      } else {
        console.warn(`[Seeder] Warning: skill "${skillName}" not found in Map cache.`);
      }
    }

    const docRef = db.collection('courses').doc(slug);
    const courseData = {
      title: item.title,
      description: item.description,
      category: item.category,
      skills: skillIds,
      level: item.level,
      duration: item.duration,
      thumbnail: item.thumbnail,
      instructor: {
        name: item.instructor,
        role: 'Lead Instructor',
        organization: 'DMI College of Engineering & THENAM Academy',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
      },
      isPublished: true,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    };

    await docRef.set(courseData);
  }

  console.log(`[Seeder] Loaded ${COURSE_ITEMS.length} courses into Firestore.`);
};
