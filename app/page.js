import { contact, about, facts, services, experience, skills, projects } from '../lib/data';
import ChatDemo from '../components/chat';
import ContactForm from '../components/contact-form';
import { ScrollProgress, Reveal, Stagger, Item, SplitTitle, MotionLink, Flow, Timeline, TimelineItem, ProjectCard, ServiceItem, AgentAnimation } from '../components/motion';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <header className="nav"><div className="wrap"><b>Usama Amanat</b>
        <nav aria-label="Sections"><a href="#about">About</a><a href="#services">Services</a><a href="#demo">Demo</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
      </div></header>

      <main className="wrap">
        <div className="hero">
          <Stagger>
            <SplitTitle text="Usama Amanat" />
            <Item className="role">Full-stack software engineer building AI and data products</Item>
            <Item><p>I connect data, models, and interfaces: Python and .NET backends, React frontends, and AI agents that automate real business work. Based in Lahore, working remotely.</p></Item>
            <Item className="btns">
              <MotionLink className="btn p" href="#projects">See my projects</MotionLink>
              <MotionLink className="btn" href={`mailto:${contact.email}`}>Email me</MotionLink>
            </Item>
          </Stagger>
          <Flow />
        </div>

        <section id="about">
          <Reveal><h2>About</h2></Reveal>
          <div className="about">
            <Reveal>{about.map((t) => <p key={t}>{t}</p>)}</Reveal>
            <Reveal delay={0.15}><ul className="facts">{facts.map(([k, v]) => <li key={k}>{k}<span>{v}</span></li>)}</ul></Reveal>
          </div>
        </section>

        <section id="services">
          <Reveal><h2>Services</h2></Reveal>
          <div className="svcgrid">
            <div className="svclist">{services.map((s, i) => <ServiceItem key={s.title} s={s} i={i} />)}</div>
            <Reveal delay={0.15}><AgentAnimation /></Reveal>
          </div>
        </section>

        <section id="demo">
          <Reveal><h2>Chatbot demo</h2></Reveal>
          <div className="chatgrid">
            <Reveal>
              <p>This is a working example of the chatbot integration I build. Ask it about my services, projects, or experience.</p>
              <ul className="how">
                <li>A chat interface built with React and Framer Motion</li>
                <li>A Next.js API route that keeps the model key on the server</li>
                <li>An LLM that answers only from the information on this site</li>
              </ul>
            </Reveal>
            <Reveal delay={0.15}><ChatDemo /></Reveal>
          </div>
        </section>

        <section id="experience">
          <Reveal><h2>Experience</h2></Reveal>
          <Timeline>
            {experience.map((e) => (
              <TimelineItem key={e.org}>
                <div className="when">{e.when}</div><h3>{e.title}</h3><div className="org">{e.org}</div>
                <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </TimelineItem>
            ))}
          </Timeline>
        </section>

        <section id="skills">
          <Reveal><h2>Skills</h2></Reveal>
          <div className="skills">
            {skills.map(([h, t], i) => <Reveal key={h} delay={(i % 2) * 0.1}><h3>{h}</h3><p>{t}</p></Reveal>)}
          </div>
        </section>

        <section id="projects">
          <Reveal><h2>Projects</h2></Reveal>
          <div className="pgrid">{projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}</div>
        </section>

        <section id="contact" className="contact">
          <Reveal><h2>Contact</h2></Reveal>
          <div className="contactgrid">
            <Reveal delay={0.1}>
              <p>Open to conversations about full-stack, AI, and automation work. Send a message with the form, or reach me directly.</p>
              <a className="big" href={`mailto:${contact.email}`}>{contact.email}</a>
              <div className="btns"><MotionLink className="btn p" href={contact.linkedin}>LinkedIn</MotionLink><MotionLink className="btn" href={contact.phoneHref}>{contact.phone}</MotionLink></div>
            </Reveal>
            <Reveal delay={0.2}><ContactForm /></Reveal>
          </div>
        </section>
      </main>
      <footer><div className="wrap">Usama Amanat · Lahore, Pakistan</div></footer>
    </>
  );
}
