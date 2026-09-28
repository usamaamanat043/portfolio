'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatSuggestions } from '../lib/data';

const greeting = { role: 'assistant', content: 'Hi, I am the assistant on this site. Ask me about Usama\u2019s services, projects, skills, or experience.' };

export default function ChatDemo() {
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (box.current) box.current.scrollTo({ top: box.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text) {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next }) });
      const data = await res.json();
      setDemo(Boolean(data.demo));
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || data.error || 'Something went wrong. Please try again.' }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'I could not reach the server. Please try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat">
      <div className="chathead"><i /><b>Portfolio assistant</b><small>{demo ? 'Scripted demo' : 'AI chatbot'}</small></div>
      <div className="msgs" ref={box} role="log" aria-label="Chat conversation">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div key={i} className={`bubble ${m.role}`} initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}>
              {m.content}
            </motion.div>
          ))}
          {loading && (
            <motion.div key="typing" className="bubble assistant typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Assistant is typing">
              {[0, 1, 2].map((d) => <motion.span key={d} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {messages.length === 1 && (
        <div className="chips">{chatSuggestions.map((s) => <button key={s} type="button" onClick={() => send(s)}>{s}</button>)}</div>
      )}
      <form className="chatform" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <label htmlFor="chat-input" className="sr">Ask a question</label>
        <input id="chat-input" value={input} onChange={(e) => setInput(e.target.value)} maxLength={300} placeholder="Ask about my work" autoComplete="off" />
        <button type="submit" disabled={loading || !input.trim()}>Send</button>
      </form>
    </div>
  );
}
