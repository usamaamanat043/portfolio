import { about, experience, skills, projects, services, contact } from './data';

export function buildContext() {
  return [
    'ABOUT: ' + about.join(' '),
    'SERVICES:\n' + services.map((s) => `- ${s.title}: ${s.text} (${s.tags})`).join('\n'),
    'EXPERIENCE:\n' + experience.map((e) => `- ${e.title}, ${e.org} (${e.when}): ${e.points.join(' ')}`).join('\n'),
    'SKILLS:\n' + skills.map(([h, t]) => `- ${h}: ${t}`).join('\n'),
    'PROJECTS:\n' + projects.map((p) => `- ${p.name} (${p.tech}): ${p.points.join(' ')}`).join('\n'),
    `CONTACT: email ${contact.email}, phone ${contact.phone}, LinkedIn ${contact.linkedin}`,
    'BASED IN: Lahore, Pakistan. Languages: Urdu (native), English (professional). Education: BS Computer Science, COMSATS University Islamabad, Lahore Campus.',
  ].join('\n\n');
}

export const systemPrompt = `You are the assistant on Usama Amanat's portfolio website. Answer visitors' questions about Usama using only the information below.
Rules: keep answers under 90 words, in plain text with no markdown. If the answer is not in the information, say you do not know and suggest emailing Usama. Never invent prices, availability, clients, or results. Be friendly and direct.

${buildContext()}`;

// Used when no API key is configured, so the demo still works out of the box.
export function scriptedReply(question) {
  const t = question.toLowerCase();
  const has = (...w) => w.some((x) => t.includes(x));
  if (has('service', 'offer', 'hire', 'work with', 'chatbot', 'agent development', 'custom app'))
    return `Usama offers three services: ${services.map((s) => s.title).join(', ')}. ${services[0].text}`;
  if (has('agent', 'ai project', 'built', 'project'))
    return `Recent projects include ${projects.slice(0, 3).map((p) => p.name).join(', ')}. For example, the marketing and sales agents ${projects[1].points[0].charAt(0).toLowerCase() + projects[1].points[0].slice(1)}`;
  if (has('stack', 'tech', 'skill', 'language', 'tool', 'python', 'react'))
    return `Core stack: ${skills[0][1]} for languages; ${skills[2][1]} on the backend; ${skills[3][1]} on the frontend.`;
  if (has('experience', 'work', 'job', 'company', 'career'))
    return `Usama is a Software Engineer at Digital Optimizer (since Jun 2026), was at Data Intuitions (May 2025 – Jun 2026), and before that Devnbeans Solutions (Dec 2021 – Apr 2025).`;
  if (has('contact', 'email', 'reach', 'phone', 'linkedin', 'available'))
    return `You can email Usama at ${contact.email} or call ${contact.phone}. He is also on LinkedIn.`;
  if (has('education', 'degree', 'study', 'university'))
    return 'Usama has a BS in Computer Science from COMSATS University Islamabad, Lahore Campus (2016–2020).';
  if (has('where', 'location', 'based', 'lahore'))
    return 'Usama is based in Lahore, Pakistan, and works remotely.';
  return `I can answer questions about Usama's services, projects, skills, and experience. For anything else, email ${contact.email}.`;
}
