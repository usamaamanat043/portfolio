'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact, services } from '../lib/data';

const options = [...services.map((s) => s.title), 'Something else'];

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [fallback, setFallback] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    setStatus('sending');
    setError('');
    setFallback(null);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setStatus('sent'); return; }
      if (data.error === 'not_configured' || data.error === 'send_failed') {
        setError('The form could not send your message right now. You can send it from your email app instead.');
        setFallback(`mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry: ${f.service}`)}&body=${encodeURIComponent(`${f.message}\n\n${f.name}\n${f.email}`)}`);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('error');
    } catch {
      setError('Could not reach the server. Please try again.');
      setStatus('error');
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' ? (
        <motion.div key="sent" className="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} role="status">
          <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" /><motion.path d="M14 25l7 7 13-15" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} /></svg>
          <h3>Message sent</h3>
          <p>Thanks for reaching out. I will reply to your email soon.</p>
        </motion.div>
      ) : (
        <motion.form key="form" className="form" onSubmit={onSubmit} noValidate={false} exit={{ opacity: 0 }}>
          <div className="field"><label htmlFor="cf-name">Name</label><input id="cf-name" name="name" required minLength={2} maxLength={80} autoComplete="name" /></div>
          <div className="field"><label htmlFor="cf-email">Email</label><input id="cf-email" name="email" type="email" required maxLength={120} autoComplete="email" /></div>
          <div className="field"><label htmlFor="cf-service">What do you need?</label>
            <select id="cf-service" name="service" defaultValue={options[0]}>{options.map((o) => <option key={o}>{o}</option>)}</select></div>
          <div className="field"><label htmlFor="cf-message">Message</label><textarea id="cf-message" name="message" required minLength={10} maxLength={1500} rows={5} /></div>
          <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="formrow">
            <button className="btn p" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
          </div>
          {status === 'error' && (
            <p className="err" role="alert">{error} {fallback && <a href={fallback}>Open email app</a>}</p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
