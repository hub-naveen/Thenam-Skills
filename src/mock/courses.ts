import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course_ai_01',
    title: 'Deep Neural Networks & Computer Vision Architecture',
    domain: 'ai-data-science',
    category: 'AI & Data Science',
    description: 'Master convolutional architectures, residual networks, transformer vision backbones, and real-time object detection using PyTorch and OpenCV.',
    instructor: {
      name: 'Dr. R. Arvind',
      role: 'Head of AI Research',
      organization: 'THENAM Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    level: 'Advanced',
    duration: '14 Weeks (48 Hours)',
    rating: 4.9,
    reviewsCount: 384,
    enrolledCount: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Deep Learning', 'PyTorch', 'Computer Vision', 'YOLOv9', 'Neural Networks'],
    progress: 80,
    isEnrolled: true,
    isBookmarked: true,
    completedModules: 4,
    totalModules: 5,
    certificateTemplateId: 'cert_template_ai_mastery',
    prerequisites: ['Python Fundamentals', 'Linear Algebra & Calculus Basics', 'NumPy & Matrix Operations'],
    modules: [
      {
        id: 'mod_1',
        title: '01. Foundations of Tensors & Computational Graphs in PyTorch',
        duration: '45 mins',
        type: 'video',
        isCompleted: true,
        summary: 'Understanding automatic differentiation, backward passes, GPU memory allocation, and custom autograd functions.'
      },
      {
        id: 'mod_2',
        title: '02. Convolutional Feature Extractors & Modern ResNets',
        duration: '60 mins',
        type: 'video',
        isCompleted: true,
        summary: 'Kernels, receptive fields, stride, dilation, residual skip connections, and vanishing gradients mitigation.'
      },
      {
        id: 'mod_3',
        title: '03. Hands-On Lab: Custom Object Detector Pipeline',
        duration: '90 mins',
        type: 'lab',
        isCompleted: true,
        summary: 'Annotating custom datasets, data augmentation pipelines, anchor boxes, and loss function tuning.'
      },
      {
        id: 'mod_4',
        title: '04. Vision Transformers (ViT) & Attention Mechanisms',
        duration: '75 mins',
        type: 'video',
        isCompleted: true,
        summary: 'Patch embeddings, multi-head self-attention for visual tokens, and hybrid CNN-Transformer backbones.'
      },
      {
        id: 'mod_5',
        title: '05. Capstone Project & Model Optimization for Edge AI',
        duration: '120 mins',
        type: 'quiz',
        isCompleted: false,
        summary: 'Quantization with TensorRT, ONNX runtime export, and deploying to low-power edge nodes.'
      }
    ],
    assessmentQuestions: [
      {
        id: 'q1',
        question: 'What is the primary benefit of residual skip connections in deep ResNet architectures?',
        options: [
          'They compress the number of model weights to save RAM',
          'They allow gradient signals to flow directly backward without vanishing',
          'They eliminate the need for non-linear activation functions',
          'They force convolution filters to always remain sparse'
        ],
        correctAnswer: 1,
        explanation: 'Residual connections solve the vanishing gradient problem in deep networks by providing shortcut paths for gradient flow during backpropagation.'
      },
      {
        id: 'q2',
        question: 'In Vision Transformers (ViT), how are 2D images converted into input tokens for self-attention?',
        options: [
          'By flattening the entire image into a 1D vector',
          'By splitting the image into non-overlapping patches and linearly projecting them',
          'By running an edge detection filter and recording corner coordinates',
          'By passing the image through an audio spectrogram encoder'
        ],
        correctAnswer: 1,
        explanation: 'ViT divides an image into a grid of fixed-size patches (e.g. 16x16 pixels), flattens each patch, and linearly projects them into token embeddings with positional encodings.'
      },
      {
        id: 'q3',
        question: 'Which metric is standard for evaluating the localization and classification accuracy of object detection models?',
        options: [
          'Mean Squared Error (MSE)',
          'Mean Average Precision (mAP@0.5:0.95)',
          'Cosine Similarity Index',
          'Word Error Rate (WER)'
        ],
        correctAnswer: 1,
        explanation: 'mAP (Mean Average Precision) calculated across multiple Intersection over Union (IoU) thresholds is the standard benchmark for object detectors.'
      }
    ]
  },
  {
    id: 'course_ds_02',
    title: 'Python for Data Science & Predictive Analytics',
    domain: 'ai-data-science',
    category: 'AI & Data Science',
    description: 'Practical data science from scratch: Exploratory data analysis, statistical inference, feature engineering, Scikit-Learn pipelines, and model evaluation.',
    instructor: {
      name: 'Dr. Meenakshi S.',
      role: 'Chief Data Scientist',
      organization: 'VentureScale Analytics',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    },
    level: 'Intermediate',
    duration: '10 Weeks (36 Hours)',
    rating: 4.8,
    reviewsCount: 512,
    enrolledCount: 2190,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Python', 'Pandas', 'Scikit-Learn', 'Feature Engineering', 'Data Visualization'],
    progress: 100,
    isEnrolled: true,
    isBookmarked: false,
    completedModules: 4,
    totalModules: 4,
    certificateTemplateId: 'cert_py_2026',
    prerequisites: ['Basic Python Syntax', 'High School Statistics'],
    modules: [
      { id: 'ds_m1', title: '01. Advanced Pandas & Vectorized Data Wrangling', duration: '50 mins', type: 'video', isCompleted: true, summary: 'Method chaining, multi-index aggregation, and vector operations.' },
      { id: 'ds_m2', title: '02. Exploratory Data Analysis & Statistical Tests', duration: '65 mins', type: 'video', isCompleted: true, summary: 'Hypothesis testing, distribution analysis, and correlation matrices.' },
      { id: 'ds_m3', title: '03. Scikit-Learn Pipelines & Feature Transformers', duration: '75 mins', type: 'lab', isCompleted: true, summary: 'Building leakage-free pipelines with ColumnTransformer and cross-validation.' },
      { id: 'ds_m4', title: '04. Predictive Modeling & Ensemble Methods (XGBoost)', duration: '90 mins', type: 'quiz', isCompleted: true, summary: 'Gradient boosting, hyperparameter tuning with Optuna, and SHAP explainability.' }
    ],
    assessmentQuestions: [
      {
        id: 'ds_q1',
        question: 'Why should feature scaling (e.g. StandardScaler) be fit only on training data and not on the whole dataset?',
        options: [
          'To speed up CPU computation time',
          'To prevent data leakage from the test distribution into model training',
          'Because test data cannot have negative values',
          'It is actually recommended to fit on the entire dataset'
        ],
        correctAnswer: 1,
        explanation: 'Fitting transformers on test data causes data leakage, providing overly optimistic evaluation metrics.'
      }
    ]
  },
  {
    id: 'course_web_03',
    title: 'Modern Full-Stack Engineering with React, TypeScript & Node',
    domain: 'web-development',
    category: 'Web Development',
    description: 'Build production-grade full-stack web applications with React 19, TypeScript, Express, REST APIs, Tailwind CSS, and secure database integrations.',
    instructor: {
      name: 'Vigneshwaran K.',
      role: 'Staff Software Architect',
      organization: 'TechStack Labs',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    },
    level: 'Intermediate',
    duration: '12 Weeks (44 Hours)',
    rating: 4.9,
    reviewsCount: 420,
    enrolledCount: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs'],
    progress: 45,
    isEnrolled: true,
    isBookmarked: true,
    completedModules: 2,
    totalModules: 5,
    certificateTemplateId: 'cert_web_2026',
    prerequisites: ['HTML/CSS Basics', 'JavaScript ES6'],
    modules: [
      { id: 'web_m1', title: '01. React 19 Core: Hooks, State & Component Lifecycle', duration: '60 mins', type: 'video', isCompleted: true, summary: 'Modern state primitives, custom hooks, and memoization.' },
      { id: 'web_m2', title: '02. Strict TypeScript Typing for Components & API Contracts', duration: '55 mins', type: 'video', isCompleted: true, summary: 'Generics, union types, discriminated unions, and runtime validation.' },
      { id: 'web_m3', title: '03. Server Architecture with Node & Express', duration: '70 mins', type: 'lab', isCompleted: false, summary: 'Middleware chains, routing, security headers, and rate limiting.' },
      { id: 'web_m4', title: '04. Database Persistence with PostgreSQL & Drizzle ORM', duration: '80 mins', type: 'video', isCompleted: false, summary: 'Schema design, migrations, relational queries, and connection pools.' },
      { id: 'web_m5', title: '05. Production Deployment & Performance Optimization', duration: '60 mins', type: 'quiz', isCompleted: false, summary: 'Dockerizing apps, CI/CD pipeline automation, and lighthouse audits.' }
    ],
    assessmentQuestions: [
      {
        id: 'web_q1',
        question: 'Which hook should be preferred in React when memoizing an expensive calculation between renders?',
        options: ['useCallback', 'useMemo', 'useRef', 'useEffect'],
        correctAnswer: 1,
        explanation: 'useMemo caches the result of a calculation between re-renders based on dependency changes.'
      }
    ]
  },
  {
    id: 'course_sql_04',
    title: 'SQL Mastery & Relational Database Architecture',
    domain: 'ai-data-science',
    category: 'AI & Data Science',
    description: 'From complex subqueries and window functions to query optimization, indexing strategies, and database schema normal forms.',
    instructor: {
      name: 'Sundar Rajan',
      role: 'Principal Database Architect',
      organization: 'Enterprise Data Corp',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80'
    },
    level: 'Intermediate',
    duration: '8 Weeks (28 Hours)',
    rating: 4.9,
    reviewsCount: 310,
    enrolledCount: 1650,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['SQL', 'PostgreSQL', 'Database Design', 'Query Optimization', 'Indexing'],
    progress: 100,
    isEnrolled: true,
    isBookmarked: false,
    completedModules: 4,
    totalModules: 4,
    certificateTemplateId: 'cert_sql_2026',
    prerequisites: ['Basic computer literacy'],
    modules: [
      { id: 'sql_m1', title: '01. Relational Modeling & Schema Design', duration: '40 mins', type: 'video', isCompleted: true, summary: 'Primary/foreign keys, constraints, and 3NF normalization.' },
      { id: 'sql_m2', title: '02. Advanced JOINs, CTEs and Subqueries', duration: '55 mins', type: 'video', isCompleted: true, summary: 'Common Table Expressions and recursive queries.' },
      { id: 'sql_m3', title: '03. Window Functions (OVER, PARTITION BY, RANK)', duration: '60 mins', type: 'lab', isCompleted: true, summary: 'Analytical queries, rolling averages, and row numbering.' },
      { id: 'sql_m4', title: '04. EXPLAIN ANALYZE, B-Tree Indexes & Tuning', duration: '75 mins', type: 'quiz', isCompleted: true, summary: 'Query execution plans, sequential vs index scans, and vacuuming.' }
    ],
    assessmentQuestions: [
      {
        id: 'sql_q1',
        question: 'Which window function calculates a ranking with no gaps in ranking numbers for ties?',
        options: ['RANK()', 'DENSE_RANK()', 'ROW_NUMBER()', 'NTILE()'],
        correctAnswer: 1,
        explanation: 'DENSE_RANK() returns consecutive rank numbers without skipping values when duplicates occur.'
      }
    ]
  },
  {
    id: 'course_cloud_05',
    title: 'Cloud Infrastructure & Kubernetes for Developers',
    domain: 'cloud-devops',
    category: 'Cloud & DevOps',
    description: 'Learn containerization with Docker, orchestrating microservices with Kubernetes, Terraform Infrastructure as Code, and CI/CD pipelines.',
    instructor: {
      name: 'Pooja Narayanan',
      role: 'Cloud Solutions Architect',
      organization: 'CloudNative India',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
    },
    level: 'Advanced',
    duration: '10 Weeks (38 Hours)',
    rating: 4.85,
    reviewsCount: 290,
    enrolledCount: 980,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Docker', 'Kubernetes', 'Cloud Computing', 'CI/CD', 'DevOps'],
    progress: 0,
    isEnrolled: false,
    isBookmarked: false,
    completedModules: 0,
    totalModules: 5,
    certificateTemplateId: 'cert_cloud_2026',
    prerequisites: ['Linux Command Line Basics', 'Networking Fundamentals'],
    modules: [
      { id: 'cloud_m1', title: '01. Container Internals & Dockerfile Best Practices', duration: '50 mins', type: 'video', isCompleted: false, summary: 'cgroups, namespaces, multi-stage builds, and minimal base images.' },
      { id: 'cloud_m2', title: '02. Kubernetes Architecture: Pods, Deployments & Services', duration: '70 mins', type: 'video', isCompleted: false, summary: 'Control plane, kubelet, replica sets, and cluster networking.' },
      { id: 'cloud_m3', title: '03. ConfigMaps, Secrets, Ingress & Helm Charts', duration: '65 mins', type: 'lab', isCompleted: false, summary: 'Managing stateful configurations and package management.' },
      { id: 'cloud_m4', title: '04. GitHub Actions CI/CD Pipeline Automation', duration: '55 mins', type: 'video', isCompleted: false, summary: 'Automated test runners, docker image pushes, and GitOps deployments.' },
      { id: 'cloud_m5', title: '05. Monitoring & Observability with Prometheus & Grafana', duration: '60 mins', type: 'quiz', isCompleted: false, summary: 'Metrics collection, alerting rules, and service dashboards.' }
    ],
    assessmentQuestions: [
      {
        id: 'cloud_q1',
        question: 'What Kubernetes resource provides HTTP and HTTPS routing to services within the cluster?',
        options: ['ConfigMap', 'Ingress Controller', 'DaemonSet', 'PersistentVolumeClaim'],
        correctAnswer: 1,
        explanation: 'An Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster.'
      }
    ]
  },
  {
    id: 'course_sec_06',
    title: 'Cybersecurity Fundamentals & Threat Modeling',
    domain: 'cybersecurity',
    category: 'Cybersecurity',
    description: 'Practical security protocols, OWASP Top 10 vulnerabilities, cryptographic mechanisms, secure coding, and red team/blue team workflows.',
    instructor: {
      name: 'Aditya Krishnan',
      role: 'Lead Security Consultant',
      organization: 'CyberShield Labs',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    level: 'Beginner',
    duration: '8 Weeks (24 Hours)',
    rating: 4.75,
    reviewsCount: 195,
    enrolledCount: 840,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    skillsGained: ['Cybersecurity', 'Network Security', 'OWASP', 'Cryptography', 'Ethical Hacking'],
    progress: 0,
    isEnrolled: false,
    isBookmarked: false,
    completedModules: 0,
    totalModules: 4,
    certificateTemplateId: 'cert_sec_2026',
    prerequisites: ['Basic Networking'],
    modules: [
      { id: 'sec_m1', title: '01. Threat Modeling & Security Principles (CIA Triad)', duration: '40 mins', type: 'video', isCompleted: false, summary: 'Confidentiality, integrity, availability, and threat surface mapping.' },
      { id: 'sec_m2', title: '02. OWASP Top 10: SQL Injection, XSS, CSRF & SSRF', duration: '65 mins', type: 'lab', isCompleted: false, summary: 'Identifying and patching common web vulnerabilities.' },
      { id: 'sec_m3', title: '03. Cryptography: Symmetric, Asymmetric & JWTs', duration: '50 mins', type: 'video', isCompleted: false, summary: 'RSA, AES-GCM, digital signatures, and token security.' },
      { id: 'sec_m4', title: '04. Network Security & Packet Analysis with Wireshark', duration: '60 mins', type: 'quiz', isCompleted: false, summary: 'Protocol inspection, sniffing prevention, and firewall rules.' }
    ],
    assessmentQuestions: [
      {
        id: 'sec_q1',
        question: 'Which mechanism is best suited for protecting against SQL Injection attacks?',
        options: ['Client-side regex verification only', 'Parameterized queries / Prepared statements', 'Base64 encoding user input', 'Hiding table column names'],
        correctAnswer: 1,
        explanation: 'Parameterized queries separate SQL code from user-supplied data, preventing attacker input from being interpreted as code.'
      }
    ]
  }
];
