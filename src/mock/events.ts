import { EventItem } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event_ws_01',
    title: 'Hands-on Generative AI & RAG Architectures with Gemini 2.5',
    type: 'workshop',
    domain: 'AI & Machine Learning',
    date: 'Saturday, Aug 22, 2026',
    time: '10:00 AM - 02:00 PM IST',
    duration: '4 Hours',
    speaker: {
      name: 'Sundararajan V.',
      role: 'Google Developer Expert (AI/ML)',
      company: 'Google Cloud Ecosystem',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    description: 'Build enterprise-ready Retrieval Augmented Generation systems from scratch. Learn chunking strategies, multimodal embedding spaces, hybrid lexical-dense reranking, and deploying production evaluation loops with automated unit tests.',
    registeredCount: 342,
    maxCapacity: 400,
    isRegistered: true,
    recordingAvailable: true,
    certificateOffered: true,
    meetLink: 'https://meet.thenamskills.edu/ws-genai-2026',
    agenda: [
      { time: '10:00 AM - 10:45 AM', topic: 'Vector Embeddings Math & Cosine Similarity Intuition' },
      { time: '10:45 AM - 12:00 PM', topic: 'Hands-on Lab: Indexing Unstructured Documents with LangChain' },
      { time: '12:00 PM - 01:00 PM', topic: 'Reranking with Cohere & Context Compression' },
      { time: '01:00 PM - 02:00 PM', topic: 'Building Guardrails, Eval Metrics & Live Q&A' }
    ]
  },
  {
    id: 'event_web_02',
    title: 'AI Career Pathways & Global Industry Standards in 2026',
    type: 'webinar',
    domain: 'Career & Industry',
    date: 'Wednesday, Aug 26, 2026',
    time: '06:30 PM - 08:00 PM IST',
    duration: '1.5 Hours',
    speaker: {
      name: 'Dr. Jennifer Martinez',
      role: 'VP of AI Research & Engineering',
      company: 'Synthetix Global Labs (San Francisco)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    description: 'An executive breakdown on what top tech firms and AI unicorn startups seek in junior engineers. Topics include building verified GitHub portfolios, technical interviews, open-source contributions, and navigating AI shifts.',
    registeredCount: 520,
    maxCapacity: 600,
    isRegistered: false,
    recordingAvailable: true,
    certificateOffered: true,
    agenda: [
      { time: '06:30 PM - 07:15 PM', topic: 'Keynote: The 2026 Engineering Skill Matrix' },
      { time: '07:15 PM - 07:45 PM', topic: 'Portfolio Reviews & Live Candidate Teardowns' },
      { time: '07:45 PM - 08:00 PM', topic: 'Interactive Q&A Session' }
    ]
  },
  {
    id: 'event_hack_03',
    title: 'THENAM National Student Hackathon: Autonomous AI Agents',
    type: 'hackathon',
    domain: 'Hackathon & Build Challenge',
    date: 'Sep 05 - Sep 07, 2026',
    time: '48 Hours Continuous',
    duration: '3 Days',
    speaker: {
      name: 'Kavitha Ramachandran',
      role: 'Hackathon Director & Faculty Sponsor',
      company: 'THENAM Academy',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    description: 'Compete with over 1,000 student developers across India to build autonomous multi-agent software systems for climate tech, healthcare triage, smart cities, and education access. ₹3,00,000 Prize Pool + Fast-track Interviews.',
    registeredCount: 890,
    maxCapacity: 1200,
    isRegistered: true,
    recordingAvailable: false,
    certificateOffered: true,
    agenda: [
      { time: 'Day 1 (06:00 PM)', topic: 'Opening Ceremony & Track Problem Statements Release' },
      { time: 'Day 2 (All Day)', topic: 'Mentorship Rounds & Midnight Checkpoint' },
      { time: 'Day 3 (04:00 PM)', topic: 'Final Demos, Jury Evaluation & Award Ceremony' }
    ]
  },
  {
    id: 'event_master_04',
    title: 'Masterclass: Zero-Trust Security for Cloud Native Clusters',
    type: 'masterclass',
    domain: 'Cybersecurity & Cloud',
    date: 'Sunday, Sep 13, 2026',
    time: '04:00 PM - 07:00 PM IST',
    duration: '3 Hours',
    speaker: {
      name: 'Aditya Krishnan',
      role: 'Lead Security Architect',
      company: 'CyberShield Labs',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    description: 'Deep dive into mTLS service mesh encryption with Istio, eBPF runtime threat detection using Cilium, and immutable secrets management with HashiCorp Vault.',
    registeredCount: 210,
    maxCapacity: 300,
    isRegistered: false,
    recordingAvailable: true,
    certificateOffered: true,
    agenda: [
      { time: '04:00 PM - 05:00 PM', topic: 'Zero Trust Principles & Threat Vectors in Kubernetes' },
      { time: '05:00 PM - 06:15 PM', topic: 'Hands-on Lab: eBPF Network Policies with Cilium' },
      { time: '06:15 PM - 07:00 PM', topic: 'Automated Attestation & Certificate Rotation' }
    ]
  }
];
