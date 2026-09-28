export const contact = {
  email: 'usamaamanat043@gmail.com',
  phone: '+92 339 4070105',
  phoneHref: 'tel:+923394070105',
  linkedin: 'https://linkedin.com/in/usama-amanat-043ali',
};

export const about = [
  'I am a software engineer with over four years of experience building web applications, APIs, and data pipelines. For the last year I have focused on AI: document intelligence, LLM-powered workflows, and automation.',
  'I like owning a feature from the first requirements call to production support, and I am comfortable working across the frontend, backend, database, and AI layers.',
];

export const facts = [
  ['Location', 'Lahore, Pakistan'],
  ['Languages', 'Urdu (native), English (professional)'],
  ['Education', 'BS Computer Science, COMSATS'],
  ['Now', 'Digital Optimizer (remote)'],
];

export const experience = [
  { when: 'Jun 2026 – Present · Remote', title: 'Software Engineer', org: 'Digital Optimizer', points: [
    'Build AI agents and chatbots for customer interaction, information retrieval, and task automation.',
    'Automate business workflows with n8n, Zapier, webhooks, and third-party APIs.',
    'Design LLM-powered workflows and Python/Pandas/SQL data pipelines, owned from design to deployment and support.' ] },
  { when: 'May 2025 – Jun 2026 · On-site', title: 'Software Engineer', org: 'Data Intuitions', points: [
    'Built enterprise applications with ASP.NET MVC, C#, and SQL Server, including stored procedures and integrations.',
    'Developed Python document intelligence that extracts structured data from PDFs and images.',
    'Shipped REST APIs and secure authentication, and handled production troubleshooting.' ] },
  { when: 'Dec 2021 – Apr 2025 · Lahore, Pakistan', title: 'Associate Software Engineer', org: 'Devnbeans Solutions', points: [
    'Built MERN and React.js applications: real estate, rank tracker, book store, chat, multi-vendor e-commerce, and quiz apps.',
    'Turned Figma designs into reusable, responsive React components.',
    'Integrated REST and GraphQL APIs, dashboards, and real-time messaging.' ] },
];

export const skills = [
  ['Languages', 'Python, C#, JavaScript, TypeScript, SQL, R'],
  ['AI and machine learning', 'LLMs, AI agents, NLP, deep learning, computer vision, OCR, Scikit-learn, PyTorch, TensorFlow, XGBoost, Pandas, NumPy'],
  ['Backend', 'Django, Flask, FastAPI, Node.js, Express, ASP.NET Core/MVC, REST, GraphQL'],
  ['Frontend', 'React.js, Next.js, Tailwind CSS, Material UI, Bootstrap, SCSS'],
  ['Data', 'SQL Server, PostgreSQL, MySQL, MongoDB, ETL pipelines, data analytics'],
  ['Automation and tools', 'n8n, Zapier, webhooks, Git, GitHub, Docker, Postman, Figma'],
];

export const projects = [
  { name: 'AI Data Analytics Assistant', image: '/projects/analytics-assistant.svg', tech: 'Python, React.js, SQL', points: [
    'Answers natural-language questions by translating them into SQL and returning automated insights.',
    'Generates charts and reports in a React.js interface backed by Python services.' ] },
  { name: 'AI Marketing and Sales Agents', image: '/projects/marketing-sales-agents.svg', tech: 'Python, LLMs, APIs', points: [
    'Agents handle lead engagement, content generation, and follow-up actions through external APIs and automation triggers.',
    'LLMs write personalized marketing and sales messages from lead context.' ] },
  { name: 'AI Career Recommendation System', image: '/projects/career-recommender.svg', tech: 'Python, Scikit-learn, NLP, Django, React.js', points: [
    'Recommends careers, skills, and learning resources by combining content-based and collaborative filtering.',
    'Django REST backend serves results to a React.js frontend.' ] },
  { name: 'AI Healthcare Platform', image: '/projects/healthcare-platform.svg', tech: 'Python, AI/ML, Next.js, APIs', points: [
    'Concept platform split into data ingestion, AI/ML processing, and reporting layers.',
    'Next.js interface presents analytics and insights from Python APIs.' ] },
  { name: 'Sound Recognition System', image: '/projects/sound-recognition.svg', tech: 'TensorFlow, CNN, RNN, Librosa', points: [
    'Classifies environmental sounds from Mel-spectrogram features.',
    'Compared CNN and RNN models to find the better architecture.' ] },
  { name: 'Predictive Modeling for Auctions', image: '/projects/auction-prediction.svg', tech: 'Scikit-learn, XGBoost, Pandas', points: [
    'Predicts auction bidding prices with regression and ensemble models, including XGBoost.',
    'Uses feature engineering and time-series analysis to surface bidding patterns.' ] },
];

export const flowNodes = [
  { x: 40, y: 26, label: 'Documents', sub: 'PDFs, images, raw data' },
  { x: 260, y: 96, label: 'Python + ML', sub: 'extract, clean, predict' },
  { x: 60, y: 186, label: 'LLM agent', sub: 'decide and act' },
  { x: 260, y: 266, label: 'API', sub: 'Django, FastAPI, .NET' },
  { x: 80, y: 361, label: 'React app', sub: 'what people see' },
];
export const flowPath = 'M120 50 C230 50 230 120 340 120 C340 170 140 160 140 210 C240 210 240 290 340 290 C340 340 160 330 160 385';

export const services = [
  { icon: 'agent', title: 'AI Agent Development', text: 'Agents that handle lead engagement, customer replies, and follow-up actions, connected to your APIs, data, and automation triggers.', tags: 'LLMs, Python, n8n, Zapier' },
  { icon: 'chat', title: 'Chatbot Integration', text: 'AI chatbots added to your website or business app for customer questions, information retrieval, and task execution.', tags: 'LLMs, REST APIs, webhooks' },
  { icon: 'app', title: 'Custom App Development', text: 'Full-stack web apps built around your workflow, from requirements to deployment and support.', tags: 'React, Next.js, Django, .NET, SQL' },
];

export const chatSuggestions = ['What services do you offer?', 'What have you built with AI agents?', 'Which tech stack do you use?', 'How can I contact you?'];
