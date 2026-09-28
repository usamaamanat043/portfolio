'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import ServiceIcon from './icons';
import { flowNodes, flowPath } from '../lib/data';

const ease = [0.22, 1, 0.36, 1];
const once = { once: true, margin: '-70px' };

export function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}

export function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={once} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </motion.div>
  );
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

export function Stagger({ children, className }) {
  return <motion.div className={className} variants={container} initial="hidden" animate="show">{children}</motion.div>;
}
export function Item({ children, className }) {
  return <motion.div className={className} variants={item}>{children}</motion.div>;
}

export function SplitTitle({ text }) {
  const letter = { hidden: { opacity: 0, y: '55%', rotate: 4 }, show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease } } };
  return (
    <motion.h1 aria-label={text} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}>
      {text.split(' ').map((w, wi) => (
        <Fragment key={wi}>
          <span aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {[...w].map((c, i) => <motion.span key={i} style={{ display: 'inline-block' }} variants={letter}>{c}</motion.span>)}
          </span>{' '}
        </Fragment>
      ))}
    </motion.h1>
  );
}

export function MotionLink({ className, href, children }) {
  return <motion.a className={className} href={href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>{children}</motion.a>;
}

export function Flow() {
  return (
    <svg className="flow" viewBox="0 0 480 430" role="img" aria-label="Pipeline diagram: documents, Python and machine learning, LLM agent, API, React app">
      <defs><path id="route" d={flowPath} /></defs>
      <path className="edge" d={flowPath} />
      <motion.path className="draw" d={flowPath} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, delay: 0.3, ease: [0.6, 0.1, 0.3, 1] }} />
      {flowNodes.map((n, i) => (
        <motion.g className="node" key={n.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.6 }} whileHover={{ scale: 1.06 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <rect x={n.x} y={n.y} width="160" height="48" rx="10" />
          <text x={n.x + 20} y={n.y + 22} fontSize="15" fontWeight="700">{n.label}</text>
          <text className="sub" x={n.x + 20} y={n.y + 38}>{n.sub}</text>
        </motion.g>
      ))}
      <circle className="pulse" r="7" opacity="0">
        <animateMotion dur="6s" begin="3.2s" repeatCount="indefinite"><mpath href="#route" /></animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.05;.95;1" dur="6s" begin="3.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function Timeline({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.3 });
  return (
    <ol className="tl" ref={ref}>
      <motion.span className="line" style={{ scaleY }} aria-hidden="true" />
      {children}
    </ol>
  );
}
export function TimelineItem({ children }) {
  return (
    <motion.li initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease }}>{children}</motion.li>
  );
}

export function ProjectCard({ p, i }) {
  return (
    <motion.article className="card" initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={once}
      transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease }} whileHover={{ y: -6 }}>
      <div className="shot"><Image src={p.image} alt={`${p.name} illustration`} width={800} height={500} unoptimized /></div>
      <div className="cb">
        <h3>{p.name}</h3><small>{p.tech}</small>
        <ul>{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </motion.article>
  );
}

export function ServiceItem({ s, i }) {
  return (
    <motion.div className="svc" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={once}
      transition={{ duration: 0.6, delay: i * 0.12, ease }}>
      <motion.div className="icon" whileHover={{ rotate: -8, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }}>
        <ServiceIcon name={s.icon} />
      </motion.div>
      <div><h3>{s.title}</h3><p>{s.text}</p><small>{s.tags}</small></div>
    </motion.div>
  );
}

const tools = [{ x: 70, y: 60, label: 'Email' }, { x: 410, y: 60, label: 'Database' }, { x: 70, y: 340, label: 'API' }, { x: 410, y: 340, label: 'Calendar' }];
const steps = ['Reading a new lead', 'Searching the CRM', 'Drafting a reply', 'Sending the email', 'Task done'];
const blink = { scaleY: [1, 1, 0.1, 1], transition: { duration: 4, times: [0, 0.9, 0.95, 1], repeat: Infinity } };

export function AgentAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, [reduce]);
  const eye = { transformBox: 'fill-box', transformOrigin: 'center' };
  return (
    <div className="agentwrap">
      <svg className="agent" viewBox="0 0 480 400" role="img" aria-label="An AI agent connected to email, database, API, and calendar tools">
        {tools.map((t) => <line key={t.label} className="link" x1={t.x} y1={t.y} x2="240" y2="200" />)}
        {!reduce && [0, 1, 2].map((i) => (
          <motion.circle key={i} className="ring" cx="240" cy="200" initial={{ r: 52, opacity: 0.7 }} animate={{ r: 150, opacity: 0 }}
            transition={{ duration: 3.6, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }} />
        ))}
        {!reduce && tools.map((t, i) => (
          <motion.circle key={t.label} className="packet" r="6" initial={{ cx: t.x, cy: t.y, opacity: 0 }}
            animate={{ cx: [t.x, 240], cy: [t.y, 200], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8, delay: i * 0.7, ease: 'easeInOut' }} />
        ))}
        {tools.map((t) => (
          <g className="chip" key={t.label}>
            <rect x={t.x - 55} y={t.y - 22} width="110" height="44" rx="12" />
            <text x={t.x} y={t.y + 5} textAnchor="middle">{t.label}</text>
          </g>
        ))}
        <g transform="translate(240 200)">
          <motion.g animate={reduce ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <line className="antenna" x1="0" y1="-36" x2="0" y2="-56" />
            <motion.circle className="bulb" cy="-62" r="6" animate={reduce ? undefined : { r: [6, 9, 6] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <rect className="head" x="-44" y="-36" width="88" height="72" rx="22" />
            <motion.rect className="eye" x="-25" y="-12" width="14" height="18" rx="5" style={eye} animate={reduce ? undefined : blink} />
            <motion.rect className="eye" x="11" y="-12" width="14" height="18" rx="5" style={eye} animate={reduce ? undefined : blink} />
            <path className="antenna" d="M-14 18 Q0 28 14 18" fill="none" />
          </motion.g>
        </g>
      </svg>
      <div className="agentlog"><i />
        <AnimatePresence mode="wait">
          <motion.span key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>{steps[step]}</motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
