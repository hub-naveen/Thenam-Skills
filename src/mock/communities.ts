import { CommunityGroup } from '../types';

export const INITIAL_COMMUNITIES: CommunityGroup[] = [
  {
    id: 'comm_deeplearning',
    name: 'Deep Learning & Vision Pioneers',
    category: 'Artificial Intelligence',
    description: 'A focused community of 1,200+ student researchers and engineers discussing PyTorch tricks, transformer architectures, and paper implementations.',
    memberCount: 1240,
    icon: 'Brain',
    isJoined: true,
    coverColor: 'from-indigo-600 to-purple-700',
    trendingTopics: ['#YOLOv9', '#DiffusionModels', '#EdgeInference', '#PyTorch2']
  },
  {
    id: 'comm_fullstack',
    name: 'Chennai Full-Stack Developers Club',
    category: 'Web & Systems',
    description: 'Peer group building modern web applications, comparing React frameworks, exploring backend architectures, and collaborating on open source.',
    memberCount: 2180,
    icon: 'Code',
    isJoined: true,
    coverColor: 'from-blue-600 to-cyan-700',
    trendingTopics: ['#React19', '#Nextjs', '#TypeScript', '#TailwindCSS']
  },
  {
    id: 'comm_cybersec',
    name: 'CyberDefenders & CTF Squad',
    category: 'Cybersecurity',
    description: 'Weekly capture-the-flag practice, vulnerability research, penetration testing walkthroughs, and defensive system hardening discussions.',
    memberCount: 890,
    icon: 'Shield',
    isJoined: false,
    coverColor: 'from-rose-600 to-amber-700',
    trendingTopics: ['#CTF2026', '#OWASPTop10', '#BugBounty', '#ZeroTrust']
  },
  {
    id: 'comm_cloud',
    name: 'Cloud Native & DevOps India',
    category: 'Cloud & Infrastructure',
    description: 'Hands-on discussions on Kubernetes clusters, Terraform IaC, multi-cloud networking, and CI/CD automation pipelines.',
    memberCount: 1450,
    icon: 'Cloud',
    isJoined: false,
    coverColor: 'from-teal-600 to-emerald-700',
    trendingTopics: ['#Kubernetes', '#Docker', '#Terraform', '#AWS']
  },
  {
    id: 'comm_uiux',
    name: 'Product Design & HCI Lab',
    category: 'Design & UX',
    description: 'Design critiques, design system architectures, accessibility standards, and prototyping animations.',
    memberCount: 780,
    icon: 'Palette',
    isJoined: false,
    coverColor: 'from-purple-600 to-pink-600',
    trendingTopics: ['#DesignSystems', '#FigmaVariables', '#Accessibility']
  }
];
