import { systemPrompt, scriptedReply } from '../../../lib/bot';

export const runtime = 'nodejs';

const hits = new Map(); // simple per-instance rate limit: 12 requests per minute per IP
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 12;
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: 'Invalid request' }, { status: 400 }); }

  let messages = (Array.isArray(body.messages) ? body.messages : []).slice(-10)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 500) }))
    .filter((m) => m.content.trim());
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== 'user')
    return Response.json({ error: 'Send a question first.' }, { status: 400 });

  const ip = (req.headers.get('x-forwarded-for') || 'local').split(',')[0].trim();
  if (limited(ip)) return Response.json({ reply: 'You are sending messages quickly. Please wait a moment and try again.', demo: false }, { status: 429 });

  const last = messages[messages.length - 1].content;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ reply: scriptedReply(last), demo: true });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001', max_tokens: 300, system: systemPrompt, messages }),
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const data = await res.json();
    const reply = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
    if (!reply) throw new Error('Empty reply');
    return Response.json({ reply, demo: false });
  } catch {
    return Response.json({ reply: scriptedReply(last), demo: true });
  }
}
