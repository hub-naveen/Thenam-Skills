import { admin } from '../config/firebaseAdmin';

export const SKILL_ITEMS = [
  // AI & Data Science
  { name: 'Machine Learning', category: 'AI & Data Science', description: 'Predictive modeling, regression, and classification algorithms.' },
  { name: 'Deep Learning', category: 'AI & Data Science', description: 'Multi-layer neural networks, backpropagation, and optimization.' },
  { name: 'Computer Vision', category: 'AI & Data Science', description: 'Image classification, object detection, and feature extraction.' },
  { name: 'Natural Language Processing', category: 'AI & Data Science', description: 'Tokenization, syntax trees, sentiment analysis, and translation.' },
  { name: 'Generative AI', category: 'AI & Data Science', description: 'Transformer backbones, diffusion engines, and variational encoders.' },
  { name: 'Large Language Models', category: 'AI & Data Science', description: 'Context window tuning, prompt templates, and direct alignment.' },
  { name: 'PyTorch', category: 'AI & Data Science', description: 'Tensors, computational graphs, and training backpropagation loops.' },
  { name: 'TensorFlow', category: 'AI & Data Science', description: 'Keras layouts, static graphs, and model edge checkpoints.' },
  { name: 'Neural Networks', category: 'AI & Data Science', description: 'Feedforward nodes, activations, weights, and bias adjustments.' },
  { name: 'YOLOv9', category: 'AI & Data Science', description: 'Real-time object localization and boundary coordinates.' },
  { name: 'Pandas', category: 'AI & Data Science', description: 'DataFrames, multi-indices, and aggregate filtering operations.' },
  { name: 'NumPy', category: 'AI & Data Science', description: 'Vector matrices, linear algebra, and multi-dimensional grids.' },
  { name: 'Scikit-Learn', category: 'AI & Data Science', description: 'Pipeline transformers, cross-validation, and metrics.' },
  { name: 'Feature Engineering', category: 'AI & Data Science', description: 'One-hot encodings, scaling, imputation, and column selectors.' },
  { name: 'Data Visualization', category: 'AI & Data Science', description: 'Plotting, charts, statistical distributions, and dashboard displays.' },
  { name: 'Apache Spark', category: 'AI & Data Science', description: 'Large-scale distributed cluster stream data processing.' },
  { name: 'Snowflake', category: 'AI & Data Science', description: 'Enterprise data warehousing and data sharing pipelines.' },
  { name: 'Data Warehousing', category: 'AI & Data Science', description: 'ETL frameworks, schema models, and data analytics.' },
  { name: 'Data Analysis', category: 'AI & Data Science', description: 'Exploratory data analysis and statistical hypotheses testing.' },

  // Programming
  { name: 'Python', category: 'Programming', description: 'High-level readable backend script compiler.' },
  { name: 'Java', category: 'Programming', description: 'Object-oriented class structures and JVM runtimes.' },
  { name: 'C', category: 'Programming', description: 'Memory management, pointers, and CPU-level computations.' },
  { name: 'C++', category: 'Programming', description: 'System programming, templates, and low-level resource management.' },
  { name: 'JavaScript', category: 'Programming', description: 'Event loops, async calls, callbacks, and DOM interactions.' },
  { name: 'TypeScript', category: 'Programming', description: 'Discriminated unions, generics, and strict types compile guards.' },
  { name: 'Go', category: 'Programming', description: 'Concurrency routines, static compiled binaries, and system routines.' },
  { name: 'SQL', category: 'Programming', description: 'JOIN operations, indexing optimizations, and query scripts.' },

  // Web Development
  { name: 'HTML', category: 'Web Development', description: 'Semantic document nodes and web layouts.' },
  { name: 'CSS', category: 'Web Development', description: 'Flexbox, grids, media rules, responsive layouts, and transitions.' },
  { name: 'React', category: 'Web Development', description: 'Virtual DOM, components state, hooks, and lifecycle reconciliations.' },
  { name: 'Node.js', category: 'Web Development', description: 'Event-driven server runtimes.' },
  { name: 'Express', category: 'Web Development', description: 'Middleware chains, routing networks, and API controllers.' },
  { name: 'REST APIs', category: 'Web Development', description: 'HTTP endpoints, payload contracts, and HTTP status codes.' },
  { name: 'Tailwind CSS', category: 'Web Development', description: 'Utility-first layout stylings.' },
  { name: 'FastAPI', category: 'Web Development', description: 'Auto-documented Python API framework.' },
  { name: 'GraphQL', category: 'Web Development', description: 'Query resolvers and single endpoint data fetches.' },
  { name: 'Next.js', category: 'Web Development', description: 'Server components, dynamic routes, and static site generations.' },
  { name: 'Web Development', category: 'Web Development', description: 'Building modern and premium web applications.' },

  // Database
  { name: 'MongoDB', category: 'Database', description: 'Document databases, BSON models, and aggregation framework pipelines.' },
  { name: 'PostgreSQL', category: 'Database', description: 'Acid transactions, table indices, and relational schemas.' },
  { name: 'MySQL', category: 'Database', description: 'Relational data tables, normalization, and query scripts.' },
  { name: 'Firebase', category: 'Database', description: 'NoSQL databases and client integrations.' },
  { name: 'Database Design', category: 'Database', description: 'ER modeling, normalization patterns, and constraints.' },
  { name: 'Query Optimization', category: 'Database', description: 'Scan metrics, execution plans, and index checks.' },
  { name: 'Indexing', category: 'Database', description: 'B-Trees, partial indexes, compound index keys, and fast seeks.' },

  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps', description: 'Cloud servers, networks, load balancers, and bucket resources.' },
  { name: 'Docker', category: 'Cloud & DevOps', description: 'App containerizations and isolated microservice running.' },
  { name: 'Kubernetes', category: 'Cloud & DevOps', description: 'Pods clustering, replication controllers, and YAML configs.' },
  { name: 'GitHub Actions', category: 'Cloud & DevOps', description: 'Workflows, triggers, test runners, and automation pipelines.' },
  { name: 'CI/CD', category: 'Cloud & DevOps', description: 'Automated test integrations, build audits, and deployments.' },
  { name: 'DevOps', category: 'Cloud & DevOps', description: 'System automations and developer velocity workflows.' },
  { name: 'Cloud Computing', category: 'Cloud & DevOps', description: 'Remote resource provisionings and infrastructure management.' },

  // Cybersecurity
  { name: 'Cybersecurity', category: 'Cybersecurity', description: 'Securing computer systems, networks, and data from attacks.' },
  { name: 'Network Security', category: 'Cybersecurity', description: 'Firewalls, VPN routers, and network intrusion blocks.' },
  { name: 'Ethical Hacking', category: 'Cybersecurity', description: 'Simulated vulnerability scans and penetration logs.' },
  { name: 'OWASP', category: 'Cybersecurity', description: 'Top vulnerabilities auditing and code mitigations.' },
  { name: 'Cryptography', category: 'Cybersecurity', description: 'Public/private key verification and signature hashes.' },
  { name: 'Linux', category: 'Cybersecurity', description: 'Shell prompts, file permissions, and directory structures.' },
  { name: 'Wireshark', category: 'Cybersecurity', description: 'Network packet captures and protocol decodes.' },
  { name: 'Burp Suite', category: 'Cybersecurity', description: 'Web application request intercepts and vulnerability tests.' },

  // Design & UI/UX
  { name: 'Figma', category: 'Design & UI/UX', description: 'Vector canvases, components, auto-layouts, and design system templates.' },
  { name: 'Design Systems', category: 'Design & UI/UX', description: 'Predefined tokens, components layouts, and stylings.' },
  { name: 'UI/UX Design', category: 'Design & UI/UX', description: 'Creating clean and premium user interfaces and experiences.' },
  { name: 'Prototyping', category: 'Design & UI/UX', description: 'Interactive links, page flows, and animations.' },
  { name: 'User Research', category: 'Design & UI/UX', description: 'Target interviews, surveys, usability audits, and feedback reviews.' },
  { name: 'Framer', category: 'Design & UI/UX', description: 'Web layouts, responsive grids, and page transitions.' }
];

export const seedSkills = async (): Promise<Map<string, string>> => {
  const skillIdMap = new Map<string, string>();
  console.log('[Seeder] Starting skills synchronization to Firestore...');
  const db = admin.firestore();

  for (const item of SKILL_ITEMS) {
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Save to Firestore using slug as doc ID
    const docRef = db.collection('skills').doc(slug);
    const skillData = {
      name: item.name,
      slug,
      category: item.category,
      description: item.description,
      isActive: true,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    };

    await docRef.set(skillData);
    skillIdMap.set(item.name.toLowerCase(), slug);
  }

  console.log(`[Seeder] Loaded ${SKILL_ITEMS.length} skills into Firestore.`);
  return skillIdMap;
};
