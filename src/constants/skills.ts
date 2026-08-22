export interface SkillItem {
  name: string;
  category: string;
}

export const SKILL_CATEGORIES = [
  'All',
  'AI & Data Science',
  'Programming',
  'Web Development',
  'Database',
  'Cloud & DevOps',
  'Cybersecurity',
  'Design & UI/UX'
] as const;

export const CENTRAL_SKILLS: SkillItem[] = [
  // Artificial Intelligence & Data Science
  { name: 'Machine Learning', category: 'AI & Data Science' },
  { name: 'Deep Learning', category: 'AI & Data Science' },
  { name: 'Computer Vision', category: 'AI & Data Science' },
  { name: 'Natural Language Processing', category: 'AI & Data Science' },
  { name: 'Generative AI', category: 'AI & Data Science' },
  { name: 'Large Language Models', category: 'AI & Data Science' },
  { name: 'PyTorch', category: 'AI & Data Science' },
  { name: 'TensorFlow', category: 'AI & Data Science' },
  { name: 'Neural Networks', category: 'AI & Data Science' },
  { name: 'YOLOv9', category: 'AI & Data Science' },
  { name: 'Pandas', category: 'AI & Data Science' },
  { name: 'NumPy', category: 'AI & Data Science' },
  { name: 'Scikit-Learn', category: 'AI & Data Science' },
  { name: 'Feature Engineering', category: 'AI & Data Science' },
  { name: 'Data Visualization', category: 'AI & Data Science' },
  { name: 'Apache Spark', category: 'AI & Data Science' },
  { name: 'Snowflake', category: 'AI & Data Science' },
  { name: 'Data Warehousing', category: 'AI & Data Science' },
  { name: 'Data Analysis', category: 'AI & Data Science' },

  // Programming
  { name: 'Python', category: 'Programming' },
  { name: 'Java', category: 'Programming' },
  { name: 'C', category: 'Programming' },
  { name: 'C++', category: 'Programming' },
  { name: 'JavaScript', category: 'Programming' },
  { name: 'TypeScript', category: 'Programming' },
  { name: 'Go', category: 'Programming' },
  { name: 'SQL', category: 'Programming' },

  // Web Development
  { name: 'HTML', category: 'Web Development' },
  { name: 'CSS', category: 'Web Development' },
  { name: 'React', category: 'Web Development' },
  { name: 'Node.js', category: 'Web Development' },
  { name: 'Express', category: 'Web Development' },
  { name: 'REST APIs', category: 'Web Development' },
  { name: 'Tailwind CSS', category: 'Web Development' },
  { name: 'FastAPI', category: 'Web Development' },
  { name: 'GraphQL', category: 'Web Development' },
  { name: 'Next.js', category: 'Web Development' },
  { name: 'Web Development', category: 'Web Development' },

  // Database
  { name: 'MongoDB', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  { name: 'Database Design', category: 'Database' },
  { name: 'Query Optimization', category: 'Database' },
  { name: 'Indexing', category: 'Database' },

  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps' },
  { name: 'Docker', category: 'Cloud & DevOps' },
  { name: 'Kubernetes', category: 'Cloud & DevOps' },
  { name: 'GitHub Actions', category: 'Cloud & DevOps' },
  { name: 'CI/CD', category: 'Cloud & DevOps' },
  { name: 'DevOps', category: 'Cloud & DevOps' },
  { name: 'Cloud Computing', category: 'Cloud & DevOps' },

  // Cybersecurity
  { name: 'Cybersecurity', category: 'Cybersecurity' },
  { name: 'Network Security', category: 'Cybersecurity' },
  { name: 'Ethical Hacking', category: 'Cybersecurity' },
  { name: 'OWASP', category: 'Cybersecurity' },
  { name: 'Cryptography', category: 'Cybersecurity' },
  { name: 'Linux', category: 'Cybersecurity' },
  { name: 'Wireshark', category: 'Cybersecurity' },
  { name: 'Burp Suite', category: 'Cybersecurity' },

  // Design & UI/UX
  { name: 'Figma', category: 'Design & UI/UX' },
  { name: 'Design Systems', category: 'Design & UI/UX' },
  { name: 'UI/UX Design', category: 'Design & UI/UX' },
  { name: 'Prototyping', category: 'Design & UI/UX' },
  { name: 'User Research', category: 'Design & UI/UX' },
  { name: 'Framer', category: 'Design & UI/UX' }
];
