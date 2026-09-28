import { contact, services } from '../../../lib/data';

export const runtime = 'nodejs';

const hits = new Map(); // per-instance limit: 3 messages per 10 minutes per IP
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 3;
}
const line = (s) => String(s || '').replace(/[\r\n]+/g, ' ').trim();

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }); }

  if (b.website) return Response.json({ ok: true }); // honeypot: bots fill this in

  const name = line(b.name).slice(0, 80);
  const email = line(b.email).slice(0, 120);
  const service = line(b.service).slice(0, 60);
  const message = String(b.message || '').trim().slice(0, 1500);

  if (name.length < 2) return Response.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  if (message.length < 10) return Response.json({ error: 'Please write a message of at least 10 characters.' }, { status: 400 });

  const ip = (req.headers.get('x-forwarded-for') || 'local').split(',')[0].trim();
  if (limited(ip)) return Response.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: 'not_configured' }, { status: 503 });

  const topic = [...services.map((s) => s.title), 'Something else'].includes(service) ? service : 'Something else';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO || contact.email],
        reply_to: email,
        subject: `Portfolio enquiry: ${topic} (${name})`,
        text: `Name: ${name}\nEmail: ${email}\nInterested in: ${topic}\n\n${message}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'send_failed' }, { status: 502 });
  }
}
