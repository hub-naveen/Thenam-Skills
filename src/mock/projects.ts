import { Project } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_smart_traffic',
    title: 'Smart City Edge Traffic Vision',
    tagline: 'Real-time vehicle trajectory analysis and violation detection with YOLOv9 on edge accelerators.',
    description: 'An end-to-end intelligent traffic monitoring system that processes RTSP camera streams at 45 FPS on edge hardware. Employs deep SORT tracking algorithms to estimate lane congestion, measure average vehicular velocity, and trigger immediate emergency vehicle priority routes.',
    domain: 'AI & Computer Vision',
    author: {
      uid: 'usr_naveen_01',
      name: 'Naveen K',
      headline: 'AI & Data Science Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'DMI College of Engineering'
    },
    contributors: ['Ananya Sharma', 'Rohit Varma'],
    techStack: ['Python', 'PyTorch', 'YOLOv9', 'OpenCV', 'FastAPI', 'Docker', 'React'],
    demoUrl: 'https://smart-traffic-vision.demo.thenam.ai',
    githubUrl: 'https://github.com/naveenk-ai/edge-traffic-vision',
    coverImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    likesCount: 78,
    isLiked: true,
    viewsCount: 1420,
    createdAt: 'July 15, 2026',
    featured: true
  },
  {
    id: 'proj_med_rag',
    title: 'MedAssist AI: Clinical RAG Assistant',
    tagline: 'Grounded medical literature retrieval with vector embeddings and hallucinatory safety guards.',
    description: 'A clinical decision support prototype developed for rural primary health centers. Indexes PubMed and pharmacology handbooks with hybrid sparse-dense retrieval and uses Gemini 1.5 Pro to explain diagnostic differentials with citations.',
    domain: 'Natural Language Processing',
    author: {
      uid: 'usr_naveen_01',
      name: 'Naveen K',
      headline: 'AI & Data Science Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'DMI College of Engineering'
    },
    techStack: ['Python', 'Gemini API', 'LangChain', 'ChromaDB', 'Streamlit', 'FastAPI'],
    demoUrl: 'https://medassist-rag.demo.thenam.ai',
    githubUrl: 'https://github.com/naveenk-ai/medassist-rag',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    likesCount: 64,
    isLiked: false,
    viewsCount: 1180,
    createdAt: 'June 28, 2026',
    featured: true
  },
  {
    id: 'proj_cloud_mesh',
    title: 'CloudMesh: Microservice Observability Mesh',
    tagline: 'Lightweight distributed tracing and latency telemetry dashboard for containerized microservices.',
    description: 'Interactive real-time visualization of distributed service dependencies, gRPC RPC error rates, and OpenTelemetry trace propagation across Kubernetes nodes.',
    domain: 'Cloud & Distributed Systems',
    author: {
      uid: 'usr_ananya_02',
      name: 'Ananya Sharma',
      headline: 'Full-Stack Developer & Cloud Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      college: 'Anna University, CEG'
    },
    techStack: ['Go', 'TypeScript', 'React', 'OpenTelemetry', 'Kubernetes', 'gRPC'],
    demoUrl: 'https://cloudmesh.demo.thenam.dev',
    githubUrl: 'https://github.com/ananya-dev/cloudmesh',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    likesCount: 89,
    isLiked: false,
    viewsCount: 1940,
    createdAt: 'June 10, 2026',
    featured: true
  },
  {
    id: 'proj_vuln_scanner',
    title: 'SentinelGuard: Automated API Vulnerability Scanner',
    tagline: 'Static and dynamic security testing engine for GraphQL and REST endpoints.',
    description: 'CLI tool and automated GitHub Action workflow that fuzzes API endpoints for BOLA/IDOR vulnerabilities, broken authentication schemas, and rate-limiting bypasses.',
    domain: 'Cybersecurity',
    author: {
      uid: 'usr_rohit_03',
      name: 'Rohit Varma',
      headline: 'Cybersecurity Analyst & Ethical Hacker',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      college: 'SSN College of Engineering'
    },
    techStack: ['Python', 'Go', 'Docker', 'OWASP ZAP', 'GraphQL'],
    demoUrl: 'https://sentinelguard.io',
    githubUrl: 'https://github.com/rohit-sec/sentinelguard',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    likesCount: 52,
    isLiked: false,
    viewsCount: 960,
    createdAt: 'May 19, 2026',
    featured: false
  }
];
