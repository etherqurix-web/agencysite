'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { blogPosts } from '../lib/blog';
import WorkGallery3D from '../components/WorkGallery3D';
import ServicesCoinCarousel from '../components/ServicesCoinCarousel';
import BlogCarousel3D from '../components/BlogCarousel3D';
import AetherMenuOverlay from '../components/AetherMenuOverlay';
import HeroField from '../components/HeroField';
import CountUp from '../components/CountUp';

const CONTACT_EMAIL = 'aetherquorix0@gmail.com';
const MARK = '/assets/aetherquorix-mark-light.png';

type IconName = 'arrow-right' | 'arrow-up' | 'x' | 'instagram' | 'facebook';

function Icon({ name }: { name: IconName }) {
  const common = { className: 'icon', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true } as const;
  if (name === 'arrow-right') return <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  if (name === 'arrow-up') return <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17 17 7M8 7h9v9" /></svg>;
  if (name === 'x') return <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l16 16M20 4 4 20" /></svg>;
  if (name === 'instagram') return <svg {...common} fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7.837c-3.403 0-6.162 2.759-6.162 6.163 0 3.403 2.759 6.162 6.162 6.162s6.162-2.759 6.162-6.162c0-3.404-2.759-6.163-6.162-6.163zm0 10.163c-2.209 0-4-1.791-4-4 0-2.21 1.791-4 4-4s4 1.79 4 4c0 2.209-1.791 4-4 4zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>;
  return <svg {...common} fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
}

function Brand({ onClick }: { onClick?: () => void }) {
  const inner = (
    <>
      <img className="brand-mark" src={MARK} alt="" aria-hidden="true" />
      <span className="brand-word">Aetherquorix</span>
    </>
  );
  return onClick
    ? <button className="brand" onClick={onClick} aria-label="Aetherquorix — back to top">{inner}</button>
    : <div className="brand">{inner}</div>;
}

const SOCIALS = [
  ['Instagram', 'https://www.instagram.com/aetherquorix/', 'instagram'],
  ['Facebook', 'https://www.facebook.com/profile.php?id=61594644663028', 'facebook'],
] as const;

const partners = ['Startups', 'SMEs', 'Enterprises', 'Developers', 'Architects', 'Agencies', 'Founders'];

const cards = [
  { caption: 'AI product engineering', title: 'Intelligent products. Real business impact.' },
  { caption: 'AI automation & agents', title: 'Workflows that think, connect & scale.' },
  { caption: '3D architecture & visualization', title: 'Interiors & exteriors before they exist.' },
  { caption: 'Graphic & brand design', title: 'Identities that carry across every touchpoint.' },
];

const works = [
  { title: 'Document Intelligence Platform', meta: 'AI · Documents', text: 'Reads contracts and reports, then answers questions with the source shown.', tags: ['AI', 'Documents', 'RAG'], result: 'Faster review, fewer missed clauses' },
  { title: 'Workflow Automation Suite', meta: 'Automation · Operations', text: 'Connects existing tools so approvals, reports and hand-offs run on their own.', tags: ['Automation', 'Integrations', 'Ops'], result: 'Hours of manual work removed weekly' },
  { title: 'Ground+4 Commercial Building — Zamzama, DHA', meta: 'Exterior · Construction · 3D & 2D', text: 'A full-scope project — 3D and 2D visualization plus the construction itself — for a ground-plus-four commercial building.', tags: ['Commercial', 'Construction', '3D & 2D'], result: 'Design and build, delivered as one project' },
];

const stats = [
  [25, '+', 'AI & digital concepts shipped'],
  [6, '', 'Core service disciplines'],
  [24, '/7', 'Automation-ready mindset'],
  [360, '°', 'From code to visual experience'],
] as const;

const marquee = ['AI Products', 'Automation', 'Agents', 'Software', 'Brand Design', '3D Visualization', 'Computer Vision', 'Integrations'];

const capabilities = ['ai.products', 'automation.agents', 'software.platforms', 'design.brand', 'visualization.3d'];

const navItems = [['Home', 'home'], ['Work', 'works'], ['Services', 'services'], ['Blog', 'blog'], ['About', 'about'], ['Contact', 'contact']] as const;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [clock, setClock] = useState<{ time: string; date: string } | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const locked = loading || navOpen || modalOpen;

  const scrollToId = useCallback((id: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -64, duration: 1.2 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  }, []);
  const openModal = useCallback(() => { setNavOpen(false); setModalOpen(true); }, []);
  const closeModal = useCallback(() => { setModalOpen(false); setSent(false); }, []);

  // Loader progress
  useEffect(() => {
    const start = performance.now(), duration = 1300;
    let raf = 0, timer = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round((t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else timer = window.setTimeout(() => setLoading(false), 600);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(timer); };
  }, []);

  // Hero entrance once loader is gone
  useEffect(() => {
    if (loading) return;
    document.querySelectorAll<HTMLElement>('.hero-ready, .hero-ready .line-reveal').forEach((el) => el.classList.add('in'));
  }, [loading]);

  // Clock (Karachi)
  useEffect(() => {
    const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit', hour12: true });
    const dateFmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', day: 'numeric', month: 'short', year: 'numeric' });
    const update = () => { const now = new Date(); setClock({ time: timeFmt.format(now).replace(' ', '').toLowerCase(), date: dateFmt.format(now) }); };
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);

  // Header state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; };
  }, []);

  // Scroll lock (loader, menu, modal)
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenisRef.current?.stop();
    return () => { document.body.style.overflow = prev; lenisRef.current?.start(); };
  }, [locked]);

  // Escape closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setModalOpen(false); setNavOpen(false); setSent(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { if (modalOpen && !sent) window.setTimeout(() => nameRef.current?.focus(), 120); }, [modalOpen, sent]);

  // Reveal on scroll
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('.reveal, .line-reveal')].filter((el) => !el.closest('.hero-ready') && !el.classList.contains('hero-ready'));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      window.setTimeout(() => el.classList.add('in'), Number(el.dataset.delay || 0));
      io.unobserve(el);
    }), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || ''), email = String(data.get('email') || ''), project = String(data.get('project') || '');
    const subject = encodeURIComponent('New project inquiry — ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject:\n${project}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setSent(true), 400);
  };

  const time = clock?.time ?? '--:--';

  return <>
    <a href="#main" className="skip">Skip to content</a>

    {/* Loader */}
    <div id="loader" className={!loading ? 'exit' : ''} aria-hidden="true">
      <div className={`loader-center ${!loading ? 'fade' : ''}`}>
        <div className="loader-orbit"><i /><img src={MARK} alt="" /></div>
        <div className="loader-brand">Aetherquorix</div>
        <p>AI · Automation · Design · 3D</p>
      </div>
      <div className="loader-progress">
        <div className="track"><div className="fill" style={{ width: `${progress}%` }} /></div>
        <div className="loader-meta"><span>Initializing</span><span>{String(progress).padStart(3, '0')}</span></div>
      </div>
    </div>

    {/* Header */}
    <header id="header" className={`${!loading ? 'ready' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="shell header-inner">
        <Brand onClick={() => scrollToId('home')} />
        <nav className="desktop-nav" aria-label="Primary">
          <ul>{navItems.map(([label, id]) => <li key={id}><button onClick={() => id === 'contact' ? openModal() : scrollToId(id)}>{label}</button></li>)}</ul>
        </nav>
        <div className="header-right">
          <div className="clock-chip"><span className="live-dot" /><span>PKT</span><strong>{time}</strong></div>
          <button className="pill primary header-cta" onClick={openModal}><span>Let&apos;s Talk</span></button>
          <button className="menu-btn" onClick={() => setNavOpen(true)} aria-label="Open menu"><span className="hamburger-lines"><i /><i /><i /></span><span className="menu-word">Menu</span></button>
        </div>
      </div>
    </header>

    <main id="main">
      {/* Hero */}
      <section id="home">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-field" aria-hidden="true"><HeroField /></div>
        <div className="shell hero-grid">
          <div className="hero-left">
            <div className="eyebrow reveal hero-ready">AI-First Technology & Creative Studio</div>
            <h1 className="hero-ready">
              <div className="line-reveal"><span>AI Systems,</span></div>
              <div className="line-reveal"><span>Digital Products &</span></div>
              <div className="line-reveal"><span className="grad">3D Spaces Built to Impress.</span></div>
            </h1>
            <p className="hero-sub reveal hero-ready">AI, design & 3D solutions for modern businesses — engineered end to end, from the first line of code to the final render.</p>
            <div className="cta-row reveal hero-ready">
              <button className="pill primary with-arrow" onClick={openModal}><span>Let&apos;s Talk <span className="badge"><Icon name="arrow-right" /></span></span></button>
              <button className="pill outline" onClick={() => scrollToId('works')}><span>View Work</span></button>
            </div>
            <div className="partners reveal hero-ready">
              <div className="partners-label">Built for</div>
              <div className="partner-grid">{partners.map((n) => <span className="partner" key={n}>{n}</span>)}</div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-orbit reveal hero-ready" aria-hidden="true">
              <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
              <img className="hero-mark" src={MARK} alt="" />
            </div>
            <div className="hero-card reveal hero-ready">
              <div className="hero-card-row" onClick={() => setCardIndex((i) => (i + 1) % cards.length)}>
                <div className="card-slot" key={cardIndex}>
                  <div className="card-caption">{cards[cardIndex].caption}</div>
                  <div className="card-title">{cards[cardIndex].title}</div>
                </div>
                <div className="card-bottom">
                  <div className="dots">{cards.map((_, i) => <span key={i} className={`dot ${i === cardIndex ? 'active' : ''}`} />)}</div>
                  <div className="hero-controls">
                    <button onClick={(e) => { e.stopPropagation(); setCardIndex((i) => (i - 1 + cards.length) % cards.length); }} aria-label="Previous"><span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}><Icon name="arrow-right" /></span></button>
                    <button onClick={(e) => { e.stopPropagation(); setCardIndex((i) => (i + 1) % cards.length); }} aria-label="Next"><Icon name="arrow-right" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shell status reveal hero-ready"><span>AI + Design + 3D, engineered to ship</span><span className="status-scroll">Scroll to explore ↓</span></div>
      </section>

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => <div className="marquee-group" key={k}>{marquee.map((m) => <span key={m + k}>{m}</span>)}</div>)}
        </div>
      </div>

      {/* About */}
      <section id="about" className="section">
        <div className="shell about-grid">
          <div className="console reveal" aria-hidden="true">
            <div className="console-bar"><i /><i /><i /><span>aetherquorix ~ capabilities</span></div>
            <div className="console-body">
              {capabilities.map((c) => <div key={c}><span className="ok">[ok]</span> {c}</div>)}
              <div className="console-cursor">&gt; ready<b /></div>
            </div>
          </div>
          <div className="about-right">
            <div className="eyebrow reveal">The Aetherquorix Technology Studio</div>
            <h2 className="about-statement reveal">We help businesses turn ambitious ideas into <span className="muted">AI-powered products, intelligent automations, graphic identities, and photoreal 3D interior & exterior experiences.</span></h2>
            <div className="about-footer reveal">
              <p className="about-note">A multidisciplinary studio connecting design, 3D, engineering, and AI automation & agents.</p>
              <div>
                <div className="social-label">Follow Aetherquorix</div>
                <div className="socials">{SOCIALS.map(([name, url, icon]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="social" aria-label={name}><Icon name={icon} /></a>)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="works" className="section alt">
        <div className="shell">
          <div className="section-head">
            <div className="eyebrow reveal">Selected Projects</div>
            <h2 className="line-reveal"><span>AI products, visual systems & spaces in action</span></h2>
          </div>
          <ul className="portfolio-grid">
            {works.map((w, i) => (
              <li className="reveal" data-delay={i * 90} key={w.title}>
                <article className="work-card">
                  <img className="work-watermark" src={MARK} alt="" aria-hidden="true" />
                  <div className="work-meta"><span>0{i + 1} / 0{works.length}</span><span>{w.meta}</span></div>
                  <div className="work-bottom">
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                    <span className="work-result">{w.result}</span>
                    <div className="tags">{w.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <WorkGallery3D />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section">
        <div className="shell">
          <div className="eyebrow reveal">Services</div>
          <h2 className="line-reveal section-title"><span>From intelligent software to physical spaces</span></h2>
          <ServicesCoinCarousel />
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="section alt">
        <div className="shell">
          <div className="section-head blog-head">
            <div className="eyebrow reveal">Insights & Journal</div>
            <div className="blog-heading-row">
              <h2 className="line-reveal"><span>Ideas on AI, software, design & 3D</span></h2>
              <p className="blog-intro reveal">Practical thinking from Aetherquorix on building smarter products, sharper brands, and better digital experiences.</p>
            </div>
          </div>
          <BlogCarousel3D posts={blogPosts} />
        </div>
      </section>

      {/* Stats */}
      <section className="section stats-section">
        <div className="shell">
          <div className="stats-panel reveal">
            <div className="eyebrow">Built for Modern Businesses</div>
            <h2>Technology and creative systems that move from concept to business-ready execution.</h2>
            <ul className="stats-grid">
              {stats.map((s) => (
                <li key={s[2]}>
                  <div className="stat-num"><CountUp to={s[0]} suffix={s[1]} /></div>
                  <div className="stat-label">{s[2]}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer>
      <div className="shell footer-inner">
        <div className="footer-cta">
          <h2>
            <div className="line-reveal"><span>Have a complex business idea?</span></div>
            <div className="line-reveal"><span className="grad">Let&apos;s build it.</span></div>
          </h2>
          <button className="pill primary with-arrow" onClick={openModal}><span>Start a project <span className="badge"><Icon name="arrow-up" /></span></span></button>
        </div>
        <div className="footer-cols">
          <div className="footer-brand">
            <Brand />
            <p>An independent studio combining design, 3D architecture & visualization, and AI automation & agents to build sharper digital experiences and smarter workflows.</p>
          </div>
          <div className="footer-col"><h3>Explore</h3><ul>
            <li><a href="#about">About</a></li><li><a href="#works">Work</a></li><li><a href="#blog">Blog</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); openModal(); }}>Contact</a></li>
          </ul></div>
          <div className="footer-col"><h3>Capabilities</h3><ul>
            <li><a href="#services">AI & Automation</a></li><li><a href="#services">Software & Products</a></li>
            <li><a href="#services">Graphic Design</a></li><li><a href="#services">3D Interior & Exterior</a></li>
          </ul></div>
          <div className="footer-col"><h3>Social</h3><ul>
            {SOCIALS.map(([name, url]) => <li key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>)}
          </ul></div>
        </div>
        <div className="legal"><span>© 2026 Aetherquorix Studio. All rights reserved.</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
      </div>
      <div className="footer-watermark" aria-hidden="true">AETHERQUORIX</div>
    </footer>

    <AetherMenuOverlay open={navOpen} onClose={() => setNavOpen(false)} items={navItems} onNavigate={scrollToId} onContact={openModal} time={time} />

    {/* Contact modal */}
    <div className={`overlay modal-overlay ${modalOpen ? 'open visible' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden={!modalOpen} onMouseDown={(e) => { if (e.currentTarget === e.target) closeModal(); }}>
      <div className="modal">
        <button className="modal-close" onClick={closeModal} aria-label="Close"><Icon name="x" /></button>
        {!sent ? (
          <div>
            <div className="eyebrow">Start a project</div>
            <h2 id="modal-title">Tell us what you want to build.</h2>
            <form className="form" onSubmit={submit}>
              <div className="field"><label htmlFor="name">Name</label><input ref={nameRef} id="name" name="name" required placeholder="Your name" autoComplete="name" /></div>
              <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></div>
              <div className="field"><label htmlFor="project">Project</label><textarea id="project" name="project" rows={4} required placeholder="Tell us what you want to build — AI, automation, software, graphic design, interior/exterior 3D, timeline, and budget." /></div>
              <div className="form-bottom">
                <span className="form-note">Opens your email app with the brief ready to send.</span>
                <button className="pill primary with-arrow" type="submit"><span>Send request <span className="badge"><Icon name="arrow-up" /></span></span></button>
              </div>
            </form>
          </div>
        ) : (
          <div className="success">
            <div className="success-badge"><img src={MARK} alt="" /></div>
            <h2>Your brief is ready</h2>
            <p>Your email app should have opened with the message prepared. If nothing opened, write to us directly at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
            <button className="pill outline" onClick={closeModal}><span>Close</span></button>
          </div>
        )}
      </div>
    </div>
  </>;
}
