import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Github, Linkedin, Mail, Phone, ChevronDown,
  Database, BarChart3, Code2, ArrowUpRight,
  MapPin, Layers, TrendingUp, Menu, X
} from "lucide-react";
import "./portfolio.css";

/* ─── Images ─────────────────────────────────────────── */
const NYC_IMG    = "/nyc.png";
const GAMING_SUM = "/gaming-sum.png";
const GAMING_DET = "/gaming-det.png";
const SURVEY_IMG = "/survey.png";
const PP_IMG     = "/pp.jpg";

/* ─── Colors (JS-side only for dynamic values) ──────── */
const A = "#38bdf8"; // accent
const P = "#c084fc"; // purple
const O = "#fb923c"; // orange
const G = "#34d399"; // green

/* ─── useInView hook ─────────────────────────────────── */
function useInView() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

/* ─── Reveal wrapper ─────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal${vis ? " reveal-in" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Projects", "Dashboards", "Skills", "Experience", "Contact"];
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav className={`nav${scrolled || open ? " nav-scrolled" : ""}`}>
        {/* Logo */}
        <div className="nav-logo">
          <img src={PP_IMG} alt="Bilal" />
          <span>Bilal <em>Jabasini</em></span>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map((l) => (
            <button key={l} onClick={() => go(l.toLowerCase())}>{l}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="nav-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${open ? " open" : ""}`}>
        {links.map((l) => (
          <button key={l} onClick={() => go(l.toLowerCase())}>{l}</button>
        ))}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="blob blob1" />
      <div className="blob blob2" />

      <div className="hero-badge">
        <span className="hero-dot" />
        <span>Available · Riyadh, Saudi Arabia</span>
      </div>

      <h1 className="hero-name">
        Bilal
        <span className="hero-ghost">Jabasini</span>
      </h1>

      <p className="hero-sub">Data Analyst · Problem Solver · Insight Architect</p>

      <p className="hero-bio">
        Transforming complex datasets into actionable growth strategies.
        Specialized in building end-to-end analytics pipelines with Python,
        SQL, and Power BI that turn raw numbers into measurable business impact.
      </p>

      <div className="hero-ctas">
        <a href="https://github.com/bilaljab" target="_blank" rel="noreferrer" className="cta-primary">
          <Github size={16} /> GitHub
        </a>
        <a href="https://linkedin.com/in/bilal-jabasini" target="_blank" rel="noreferrer" className="cta-secondary">
          <Linkedin size={16} /> LinkedIn
        </a>
      </div>

      <div
        className="hero-scroll"
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span>Scroll</span>
        <ChevronDown size={14} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   STATS
══════════════════════════════════════════════════════ */
function Stats() {
  const [ref, vis] = useInView();
  const items = [
    { v: "5",      l: "Projects Delivered" },
    { v: "$4.99B", l: "Dataset Audited" },
    { v: "383K+",  l: "Records Analyzed" },
    { v: "3",      l: "Tools Mastered" },
  ];
  return (
    <div className="stats" ref={ref}>
      {items.map((s, i) => (
        <div
          key={i}
          className={`stat-item${vis ? " stat-in" : ""}`}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <div className="stat-val">{s.v}</div>
          <div className="stat-lbl">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION HEADER
══════════════════════════════════════════════════════ */
function SectionHeader({ tag, title, ghost, desc }) {
  return (
    <Reveal>
      <header className="sec-hdr">
        <span className="sec-tag">{tag}</span>
        <h2 className="sec-title">
          {title}
          <span className="sec-ghost">{ghost}</span>
        </h2>
        {desc && <p className="sec-desc">{desc}</p>}
      </header>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    title: "NYC Funding Strategic Audit",
    desc: "End-to-end audit of $4.99B in NYC discretionary spending across 97K transactions — uncovering that 87.52% ($4.09B) was hidden under a generic label, directly informing fiscal transparency policy recommendations.",
    tech: ["Python", "Pandas", "MySQL", "Power BI", "Star Schema"],
    url: "https://github.com/bilaljab/NYC-Funding-Strategic-Audit",
    Icon: Database,
  },
  {
    title: "Game Market Intelligence Pipeline",
    desc: "Production ETL pipeline processing 60K+ records proving that Critic Scores ≥8.5 are the primary driver of long-term revenue — reframing how publishers allocate review-marketing budgets.",
    tech: ["Python", "MySQL", "Power BI", "ETL", "Pandas", "SQLAlchemy"],
    url: "https://github.com/bilaljab/Game-Market-Intelligence-Pipeline",
    Icon: TrendingUp,
  },
  {
    title: "Layoffs EDA — Advanced SQL",
    desc: "Deep exploratory analysis on 2,300+ global layoff records (2020–2023) using CTEs, window functions, and DENSE_RANK() to surface cumulative trends, yearly top offenders, and sectoral collapse patterns.",
    tech: ["MySQL", "CTEs", "Window Functions", "DENSE_RANK", "Aggregations"],
    url: "https://github.com/bilaljab/EDA-on-Layoffs-Data-using-MySQL",
    Icon: BarChart3,
  },
  {
    title: "Layoffs Data Cleaning — MySQL",
    desc: "Professional-grade data cleaning pipeline on a real-world layoffs dataset — eliminating duplicates via ROW_NUMBER(), standardizing text fields, handling NULLs, and converting date formats for analysis-ready output.",
    tech: ["MySQL", "ROW_NUMBER()", "Staging Tables", "STR_TO_DATE", "Data QA"],
    url: "https://github.com/bilaljab/Layoffs-Data-Cleaning-using-MySQL",
    Icon: Code2,
  },
  {
    title: "Survey Analyst — Power BI",
    desc: "Transformed 630 raw survey responses from data professionals into an executive dashboard — isolating top salary benchmarks, satisfaction drivers, and language adoption trends across job titles.",
    tech: ["Power BI", "DAX", "Power Query", "Data Modeling", "KPI Cards"],
    url: "https://github.com/bilaljab/Survey-Analyst-PowerBI",
    Icon: Layers,
  },
];

function ProjectCard({ p, delay }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`card${vis ? " card-in" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="card-head">
        <div className="card-icon">
          <p.Icon size={17} color={A} />
        </div>
        <a href={p.url} target="_blank" rel="noreferrer" className="card-gh">
          GitHub →
        </a>
      </div>
      <h3 className="card-title">{p.title}</h3>
      <p className="card-desc">{p.desc}</p>
      <div className="card-tags">
        {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <a href={p.url} target="_blank" rel="noreferrer" className="card-cta">
        View Code <ArrowUpRight size={13} />
      </a>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeader tag="Selected Work" title="The Insight" ghost="Gallery" />
      <div className="cards-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} delay={i * 0.08} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   LIGHTBOX  — rendered via portal directly on body
══════════════════════════════════════════════════════ */
function Lightbox({ img, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        <X size={22} />
      </button>
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        <img src={img} alt={title} className="lb-img" />
        <p className="lb-caption">{title}</p>
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════
   DASHBOARDS
══════════════════════════════════════════════════════ */
function Mockup({ title, desc, tools, color, images, tabs, url }) {
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const img = images.length > 1 ? images[tab] : images[0];

  return (
    <>
      {lightbox && <Lightbox img={img} title={title} onClose={() => setLightbox(false)} />}

      <div className="mockup" style={{ "--mc": color }}>
        {/* Chrome bar */}
        <div className="mockup-bar">
          <div className="mockup-dots">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, flexShrink: 0 }} />
            ))}
          </div>

          {tabs && (
            <div className="mockup-tabs">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className={`mockup-tab${tab === i ? " active" : ""}`}
                  style={tab === i ? { background: `${color}22`, color } : {}}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          <div className="mockup-url">🔒 app.powerbi.com · {title}</div>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mockup-repo"
            style={{ color, background: `${color}14`, border: `1px solid ${color}30` }}
          >
            <Github size={10} /> Repo
          </a>
        </div>

        {/* Screenshot — click to expand */}
        <div className="mockup-img-wrap mockup-img-clickable" onClick={() => setLightbox(true)} title="Click to expand">
          <img src={img} alt={title} className="mockup-img" />
          <div className="mockup-expand-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            Expand
          </div>
        </div>

        {/* Footer */}
        <div className="mockup-foot" style={{ borderTop: `1px solid ${color}18` }}>
          <h3 className="mockup-title">{title}</h3>
          <p className="mockup-desc">{desc}</p>
          <div className="card-tags">
            {tools.map((t) => (
              <span key={t} className="tag" style={{ color, background: `${color}10`, borderColor: `${color}28` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const BOARDS = [
  {
    title: "NYC Funding Strategic Audit",
    desc: "Interactive audit of $4.99B across 5,142 orgs and 97K transactions — exposing a $4.09B categorical visibility gap critical to fiscal transparency.",
    tools: ["Power BI", "DAX", "Star Schema", "MySQL", "Python"],
    color: A,
    images: [NYC_IMG],
    url: "https://github.com/bilaljab/NYC-Funding-Strategic-Audit",
  },
  {
    title: "Game Market Intelligence Pipeline",
    desc: "60K+ record ETL pipeline revealing Critic Score ≥8.5 as the top revenue predictor, uncovering Brand Power outliers where community loyalty drove outsized sales.",
    tools: ["Power BI", "Python ETL", "SQL", "Pandas"],
    color: P,
    images: [GAMING_SUM, GAMING_DET],
    tabs: ["Summary", "Details"],
    url: "https://github.com/bilaljab/Game-Market-Intelligence-Pipeline",
  },
  {
    title: "Survey Analyst — Power BI",
    desc: "Transformed 630 survey responses into a live executive dashboard isolating salary benchmarks, satisfaction drivers, and language adoption trends across job titles.",
    tools: ["Power BI", "Data Modeling", "KPIs", "DAX"],
    color: O,
    images: [SURVEY_IMG],
    url: "https://github.com/bilaljab/Survey-Analyst-PowerBI",
  },
];

function Dashboards() {
  return (
    <section id="dashboards" className="section section-alt">
      <SectionHeader
        tag="Visual Intelligence"
        title="Dashboard"
        ghost="Showcase"
        desc="Real Power BI dashboards — click the tabs on the Gaming card to switch views."
      />
      <div className="dash-grid">
        {BOARDS.map((b, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <Mockup {...b} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════════════ */
const SKILL_CATS = [
  {
    color: A, Icon: Code2, title: "Languages & Libraries",
    items: [{ l: "Python (Pandas, NumPy)", n: 5 }, { l: "SQL / MySQL", n: 5 }, { l: "Matplotlib / Seaborn", n: 4 }, { l: "Git", n: 4 }],
  },
  {
    color: P, Icon: BarChart3, title: "Visualization & BI",
    items: [{ l: "Power BI (DAX)", n: 5 }, { l: "Star Schema Design", n: 5 }, { l: "Dashboard Design", n: 4 }, { l: "Data Storytelling", n: 5 }],
  },
  {
    color: G, Icon: Database, title: "Data Engineering",
    items: [{ l: "ETL Pipeline Dev", n: 4 }, { l: "Data Modeling", n: 5 }, { l: "Data Quality / QA", n: 4 }, { l: "Window Funcs & CTEs", n: 5 }],
  },
  {
    color: O, Icon: Code2, title: "Cloud & Emerging",
    items: [{ l: "AWS (S3, RDS, Lambda)", n: 3 }, { l: "AWS IAM", n: 3 }, { l: "Generative AI Analysis", n: 4 }, { l: "Prompt Engineering", n: 4 }],
  },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader tag="Technical Arsenal" title="Skills" ghost="Matrix" />
      <div className="skills-grid">
        {SKILL_CATS.map((cat, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="skill-card">
              <div className="skill-head">
                <div className="skill-icon" style={{ background: `${cat.color}12` }}>
                  <cat.Icon size={18} color={cat.color} />
                </div>
                <span className="skill-name">{cat.title}</span>
              </div>
              <div className="skill-list">
                {cat.items.map((s, si) => (
                  <div key={si} className="skill-row">
                    <span className="skill-lbl">{s.l}</span>
                    <div className="skill-dots">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className="skill-dot"
                          style={{ background: n <= s.n ? cat.color : "rgba(255,255,255,0.1)" }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════════════ */
const EXP = [
  { date: "02/2026", tag: "Analytics Project", type: "work",    title: "Independent Data Analytics — NYC Council",    desc: "Delivered a consulting-grade audit of $4.99B in public discretionary funds, engineered a Python–MySQL–Power BI pipeline, and produced executive deliverables structured around the Pyramid Principle." },
  { date: "02/2026", tag: "Virtual Program",   type: "project", title: "BCG X · Data for Decision Making",            desc: "Applied advanced Excel pivot analysis to digital campaign data, producing data-driven budget reallocation recommendations aligned to strategic marketing KPIs." },
  { date: "02/2026", tag: "Virtual Program",   type: "project", title: "Tata · Empowering Business with Insights",    desc: "Designed an executive Power BI dashboard from raw retail transaction data — delivering revenue trend and seasonal intelligence to a C-suite audience." },
  { date: "02/2026", tag: "Virtual Program",   type: "project", title: "EA · Product Management Simulation",          desc: "Evaluated KPI frameworks for a mobile strategy game and translated data-driven insights into a stakeholder-facing product performance presentation." },
  { date: "11/2025", tag: "Project",           type: "project", title: "Layoffs EDA — Advanced SQL",                  desc: "Deep-dived into 2,300+ global layoff records (2020–2023) using CTEs, DENSE_RANK(), and rolling window functions to surface cumulative trends and identify top offenders per year." },
  { date: "11/2025", tag: "Project",           type: "project", title: "Layoffs Data Cleaning — MySQL",                desc: "Built a professional data cleaning pipeline using staging tables, ROW_NUMBER() deduplication, TRIM standardization, NULL handling, and STR_TO_DATE conversion — producing an analysis-ready dataset." },
  { date: "02/2025", tag: "Education",         type: "edu",     title: "BSc Informatics Engineering — IUST",          desc: "Graduated from the International University for Science and Technology, Damascus, Syria." },
];

const DC = { work: A, project: P, edu: G };

function TLItem({ item, isLast, delay }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={`tl-item${vis ? " tl-in" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="tl-spine">
        <div className="tl-dot" style={{ background: DC[item.type], boxShadow: `0 0 8px ${DC[item.type]}60` }} />
        {!isLast && <div className="tl-line" />}
      </div>
      <div className="tl-body">
        <div className="tl-meta">
          <span className="tl-date">{item.date}</span>
          <span className="tl-tag" style={{ color: DC[item.type], background: `${DC[item.type]}14` }}>
            {item.tag}
          </span>
        </div>
        <h3 className="tl-title">{item.title}</h3>
        <p className="tl-desc">{item.desc}</p>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <SectionHeader tag="Journey" title="Experience" ghost="Timeline" />
      <div className="timeline">
        {EXP.map((item, i) => (
          <TLItem key={i} item={item} isLast={i === EXP.length - 1} delay={i * 0.07} />
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════════════════════════ */
const CERTS = [
  { title: "CS50P",               org: "Harvard University", desc: "Python Programming",                     color: A },
  { title: "AWS CPE",             org: "AWS Skill Builder",  desc: "Cloud Practitioner Essentials",          color: O },
  { title: "GenAI Data Analysis", org: "Microsoft",          desc: "Professional Certificate · In Progress", color: P },
  { title: "IELTS 7.0",           org: "Academic",           desc: "C1 English Proficiency",                 color: G },
];

function Certifications() {
  return (
    <section className="section" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <Reveal>
        <span className="sec-tag" style={{ marginBottom: "1.75rem" }}>Credentials</span>
      </Reveal>
      <div className="certs-grid">
        {CERTS.map((c, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="cert-card" style={{ borderLeft: `3px solid ${c.color}` }}>
              <div className="cert-title">{c.title}</div>
              <div className="cert-org" style={{ color: c.color }}>{c.org}</div>
              <div className="cert-desc">{c.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <Reveal>
        <div className="contact-wrap">
          <span className="sec-tag">Get in Touch</span>
          <h2 className="contact-title">
            Let's Build Something<br />
            <span style={{ color: A }}>Extraordinary</span>
          </h2>
          <p className="contact-sub">
            Open to Data Analyst, BI Developer, and Analytics Engineer roles.
            Let's talk about how I can turn your data into decisions.
          </p>

          <div className="contact-links">
            {[
              { Icon: Mail,   label: "bilal.jabasini@gmail.com", href: "mailto:bilal.jabasini@gmail.com" },
              { Icon: Phone,  label: "+966 559 768 389",          href: "tel:+966559768389" },
              { Icon: MapPin, label: "Riyadh, Saudi Arabia",      href: "#" },
            ].map(({ Icon, label, href }) => (
              <a key={label} href={href} className="contact-link">
                <Icon size={15} /> {label}
              </a>
            ))}
          </div>

          <div className="contact-socials">
            {[
              { Icon: Github,   href: "https://github.com/bilaljab" },
              { Icon: Linkedin, href: "https://linkedin.com/in/bilal-jabasini" },
            ].map(({ Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="contact-social">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo">BJ<span>.</span></span>
      <span className="footer-copy">© 2026 Bilal Jabasini · Data Analyst &amp; IT</span>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="root">
      <Nav />
      <Hero />
      <Stats />
      <Projects />
      <Dashboards />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
