import { useState, useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GithubIcon, LinkedinIcon, FolderIcon, ExternalIcon } from './components/icons'
import { RevealSection } from './components/RevealSection'
import { SectionHeading } from './components/SectionHeading'
import { useSessionState } from './hooks/useSessionState'
import { scrollToId } from './lib/scroll'
import { projects as projectDetails } from './data/projects'

// ── Config ──────────────────────────────────────────────────────────────────
const config = {
  name: 'Chandan Gowda Nandakumar',
  shortName: 'Chandan',
  initials: 'CGN',
  email: 'reachchandan97@gmail.com',
  github: 'https://github.com/chandangowdanandakumar',
  linkedin: 'https://www.linkedin.com/in/gowdaa/',
  navLinks: [
    { name: 'About', url: '#about' },
    { name: 'Experience', url: '#experience' },
    { name: 'Open Source', url: '#opensource' },
    { name: 'Projects', url: '#projects' },
    { name: 'Blog', url: '#blog' },
    { name: 'Contact', url: '#contact' },
  ],
  skills: ['Java', 'React.js', 'TypeScript', 'Express.js', 'GraphQL', 'AWS', 'React Native', 'Neo4j'],
  experience: [
    {
      company: 'Amazon',
      title: 'Software Engineer',
      range: 'Mar 2025 — Present',
      url: 'https://amazon.com',
      bullets: [
        'Building and maintaining scalable distributed systems serving millions of customers.',
        'Collaborating with cross-functional teams to design and ship high-quality features.',
        'Writing clean, efficient, and well-tested Java and TypeScript code at scale.',
      ],
    },
    {
      company: 'Google',
      title: 'Software Test Engineer',
      range: 'Dec 2024 — Mar 2025',
      url: 'https://google.com',
      bullets: [
        'Contract role focused on software test engineering for Google products.',
        'Ensured quality and reliability through comprehensive testing strategies.',
        'Collaborated with engineering teams in Mountain View to validate system behaviour.',
      ],
    },
    {
      company: '777 Partners',
      title: 'Software Engineer',
      range: 'Jan 2024 — Jul 2024',
      url: '#',
      bullets: [
        'Backend Java development for fintech products serving a large customer base.',
        'Built scalable services and APIs in a fast-paced financial services environment.',
      ],
    },
    {
      company: 'Rocket Mortgage',
      title: 'Software Engineer',
      range: 'May 2022 — Nov 2023',
      url: 'https://rocketmortgage.com',
      bullets: [
        'Developed API endpoints for Rocket FOC clients, improving data retrieval efficiency and enabling seamless access to customer information.',
        'Built interactive dashboards using React.js and Neo4j graph database for efficient data management and storage.',
        'Led front-end development using Express.js and contributed across the full stack.',
      ],
    },
    {
      company: 'ASU',
      title: 'Technical Architect · Developer · Team Lead',
      range: 'May 2021 — May 2022',
      url: 'https://asu.edu',
      bullets: [
        'Led creation of an interactive web application for dashboards leveraging Neo4j and React.js.',
        'Transformed web app to a React Native mobile app, leading to a 26% increase in customer engagement.',
        'Guided 200 undergraduate students as Development Team Lead in the Grand Challenges program.',
      ],
    },
  ],
  certifications: [
    { name: 'Java Programming Masterclass for Software Developers', issuer: 'Udemy', year: '2018' },
    { name: 'Machine Learning A-Z™: Hands-On Python & R in Data Science', issuer: 'Udemy', year: '2018' },
    { name: 'Deep Learning A-Z™: Hands-On Artificial Neural Networks', issuer: 'Udemy', year: '2018' },
    { name: 'Python for Data Science and Machine Learning Bootcamp', issuer: 'Udemy', year: '2018' },
    { name: 'Data Science A-Z™: Real-Life Data Science Exercises', issuer: 'Udemy', year: '2018' },
    { name: 'Learn Python Programming Masterclass', issuer: 'Udemy', year: '2018' },
    { name: 'The Web Developer Bootcamp', issuer: 'Udemy', year: '2018' },
    { name: 'Complete Android N Developer Course', issuer: 'Udemy', year: '2021' },
    { name: 'Complete Python Bootcamp From Zero to Hero', issuer: 'Udemy', year: '2021' },
    { name: 'Statistics Foundations: The Basics', issuer: 'LinkedIn', year: '2021' },
  ],
  openSource: [
    {
      repo: 'amazon/internal-service',
      pr: 'PR-1234',
      title: 'Add distributed tracing to request pipeline',
      description: 'Instrumented the full request lifecycle with end-to-end tracing, cutting mean time to diagnose latency regressions in production.',
      tech: ['Java', 'AWS X-Ray', 'CloudWatch'],
      url: '#',
    },
    {
      repo: 'amazon/internal-platform',
      pr: 'PR-5678',
      title: 'Migrate authentication layer to SigV4',
      description: 'Replaced legacy HMAC auth with SigV4 signing across service boundaries, improving security posture and enabling cross-region calls.',
      tech: ['Java', 'AWS SigV4', 'IAM'],
      url: '#',
    },
    {
      repo: 'amazon/internal-tools',
      pr: 'PR-9012',
      title: 'Automate release pipeline with CDK',
      description: 'Built a CDK-based deployment pipeline that reduced manual release steps from 12 to 2 and cut deploy time by 40%.',
      tech: ['TypeScript', 'AWS CDK', 'GitHub Actions'],
      url: '#',
    },
  ],
  blog: [
    {
      date: 'Coming soon',
      readTime: '— min read',
      title: 'What I learned building distributed systems at Amazon',
      description: 'Lessons from working on services that handle millions of requests per second — on failure modes, observability, and keeping things boring.',
      tags: ['Engineering', 'Distributed Systems'],
      url: '#',
    },
    {
      date: 'Coming soon',
      readTime: '— min read',
      title: 'Getting the most out of behavioral interview prep',
      description: 'How the STAR framework and Leadership Principles turned scattered notes into concrete, outcome-driven answers.',
      tags: ['Career', 'Interviews'],
      url: '#',
    },
  ],
  // Cards for write-ups are derived from data/projects.ts (the single source
  // for name/description/github/tech) so the two never drift out of sync;
  // only the write-up-less portfolio project is defined here.
  projects: [
    ...projectDetails.map(p => ({
      name: p.name,
      description: p.description,
      github: p.github,
      slug: p.slug,
      tech: p.tech,
    })),
    {
      name: 'Portfolio Website',
      description: 'This portfolio — built with React, TypeScript, and Tailwind CSS, deployed via GitHub Pages.',
      github: 'https://github.com/chandangowdanandakumar/chandangowdanandakumar.github.io',
      slug: '',
      tech: ['React', 'TypeScript', 'Tailwind'],
    },
  ],
}

// ── Loader ───────────────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#ffffff] animate-loader-exit">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="absolute inset-0 w-20 h-20 animate-spin-slow" viewBox="0 0 100 100" fill="none">
          <polygon points="50,3 97,28 97,72 50,97 3,72 3,28" stroke="#4f46e5" strokeWidth="3" />
        </svg>
        <span className="font-mono text-[#4f46e5] text-base font-bold tracking-wide">
          {config.initials}
        </span>
      </div>
    </div>
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-300 h-[70px] ${scrolled ? 'bg-[#ffffff]/95 backdrop-blur shadow-[0_10px_30px_-10px_rgba(15, 23, 42, 0.1)]' : ''}`}>
      <a href="/" aria-label="home">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
          <polygon points="50,3 97,28 97,72 50,97 3,72 3,28" stroke="#4f46e5" strokeWidth="4" />
          <text x="50" y="58" textAnchor="middle" fill="#4f46e5" fontSize="26" fontFamily="monospace" fontWeight="700">CGN</text>
        </svg>
      </a>

      <nav className="hidden md:flex items-center gap-8">
        <ol className="flex items-center gap-8 list-none">
          {config.navLinks.map((link, i) => (
            <li key={link.name}>
              <a href={link.url} className="font-mono text-xs text-[#0f172a] hover:text-[#4f46e5] transition-colors">
                <span className="text-[#4f46e5] mr-1">0{i + 1}.</span>{link.name}
              </a>
            </li>
          ))}
        </ol>
        <a
          href="/resume.pdf"
          className="font-mono text-xs text-[#4f46e5] border border-[#4f46e5] rounded px-4 py-2 hover:bg-[#4f46e5]/10 transition-colors"
        >
          Resume
        </a>
      </nav>
    </header>
  )
}

// ── Sidebars ─────────────────────────────────────────────────────────────────
function LeftSidebar() {
  return (
    <div className="fixed left-10 bottom-0 hidden xl:flex flex-col items-center gap-5 after:block after:w-px after:h-24 after:bg-[#64748b] after:mt-5">
      <a href={config.github} target="_blank" rel="noreferrer" className="text-[#64748b] hover:text-[#4f46e5] hover:-translate-y-1 transition-all duration-200">
        <GithubIcon />
      </a>
      <a href={config.linkedin} className="text-[#64748b] hover:text-[#4f46e5] hover:-translate-y-1 transition-all duration-200">
        <LinkedinIcon />
      </a>
    </div>
  )
}

function RightSidebar() {
  return (
    <div className="fixed right-10 bottom-0 hidden xl:flex flex-col items-center gap-5 after:block after:w-px after:h-24 after:bg-[#64748b] after:mt-5">
      <a
        href={`mailto:${config.email}`}
        className="font-mono text-xs text-[#64748b] hover:text-[#4f46e5] tracking-[.15em] hover:-translate-y-1 transition-all duration-200"
        style={{ writingMode: 'vertical-rl' }}
      >
        {config.email}
      </a>
    </div>
  )
}

// ── Sections ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center max-w-[1000px] mx-auto px-6 xl:px-0 pt-20">
      <p className="font-mono text-[#4f46e5] text-sm md:text-base mb-6 animate-fadeup" style={{ animationDelay: '100ms' }}>
        Hi, my name is
      </p>
      <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] leading-tight animate-fadeup" style={{ animationDelay: '200ms' }}>
        {config.shortName}.
      </h1>
      <h2 className="text-4xl md:text-6xl font-bold text-[#475569] mt-2 mb-8 leading-tight animate-fadeup" style={{ animationDelay: '300ms' }}>
        I build things for scale.
      </h2>
      <p className="max-w-[540px] text-[#475569] leading-relaxed mb-12 animate-fadeup" style={{ animationDelay: '400ms' }}>
        I'm a software engineer at{' '}
        <a href="https://amazon.com" target="_blank" rel="noreferrer" className="text-[#4f46e5] hover:underline underline-offset-4">
          Amazon
        </a>
        , specializing in building reliable, scalable distributed systems. I care deeply about clean code and great engineering.
      </p>
      <div className="animate-fadeup" style={{ animationDelay: '500ms' }}>
        <a
          href="#projects"
          className="font-mono text-sm text-[#4f46e5] border border-[#4f46e5] rounded px-7 py-4 hover:bg-[#4f46e5]/10 transition-colors"
        >
          Check out my work!
        </a>
      </div>
    </section>
  )
}

function About() {
  return (
    <RevealSection id="about" className="max-w-[900px] mx-auto px-6 xl:px-0 py-24">
      <SectionHeading marker="01." title="About Me" />

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 space-y-4 text-[#475569] leading-relaxed">
          <p>
            Hi, I'm Chandan — a Software Engineer at Amazon in Seattle. I hold a Master's in
            Information Technology from Arizona State University and a Bachelor's in Computer
            Science from Bangalore University.
          </p>
          <p>
            My career spans backend systems at{' '}
            <a href="https://amazon.com" className="text-[#4f46e5] hover:underline underline-offset-4">Amazon</a>
            {', '}contract test engineering at{' '}
            <a href="https://google.com" className="text-[#4f46e5] hover:underline underline-offset-4">Google</a>
            , and full-stack development at Rocket Mortgage and 777 Partners. I'm strongest in
            Java backend work and have shipped things from Neo4j dashboards to React Native apps.
          </p>
          <p className="pt-1">Here are a few technologies I've been working with recently:</p>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-4 font-mono text-sm mt-1">
            {config.skills.map(s => (
              <li key={s} className="flex items-center gap-2">
                <span className="text-[#4f46e5] text-xs">▹</span>{s}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 flex justify-center">
          <div className="relative group w-52 h-52">
            <div className="absolute inset-0 rounded border-2 border-[#4f46e5] translate-x-4 translate-y-4 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />
            <div className="relative z-10 w-full h-full rounded bg-[#f8fafc] flex items-center justify-center overflow-hidden">
              <span className="font-mono text-7xl font-bold text-[#4f46e5] opacity-20 select-none">
                {config.initials}
              </span>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}

function Experience() {
  const [active, setActive] = useSessionState('cgn_exp', 0, {
    serialize: String,
    deserialize: v => parseInt(v, 10),
  })
  const exp = config.experience[active]

  return (
    <RevealSection id="experience" className="max-w-[900px] mx-auto px-6 xl:px-0 py-24" delayClassName="delay-100">
      <SectionHeading marker="02." title="Where I've Worked" />

      <div className="flex overflow-x-auto border-b border-[#e2e8f0] mb-8 gap-0">
        {config.experience.map((e, i) => (
          <button
            key={e.company}
            onClick={() => setActive(i)}
            className={`font-mono text-xs px-5 py-3 whitespace-nowrap transition-all duration-200 border-b-2 -mb-px
              ${active === i
                ? 'border-[#4f46e5] text-[#4f46e5]'
                : 'border-transparent text-[#475569] hover:text-[#4f46e5]'}`}
          >
            {e.company}
          </button>
        ))}
      </div>

      <div className="pt-0">
          <h3 className="text-[#0f172a] text-lg font-medium">
            {exp.title}{' '}
            <a href={exp.url} target="_blank" rel="noreferrer" className="text-[#4f46e5]">
              @ {exp.company}
            </a>
          </h3>
          <p className="font-mono text-xs text-[#475569] mt-1 mb-5">{exp.range}</p>
          <ul className="space-y-3">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[#475569] text-sm leading-relaxed">
                <span className="text-[#4f46e5] shrink-0 mt-0.5">▹</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
    </RevealSection>
  )
}

const FILTERS = ['All', 'Java', 'Markdown'] as const
type Filter = typeof FILTERS[number]
type ProjectCard = typeof config.projects[number]

// Icon always resolves to either the write-up route or the external repo;
// the title only becomes a link when a write-up exists (`wrapExternal`
// lets the title fall back to plain, non-interactive text instead).
function ProjectLink({
  project,
  className,
  wrapExternal = true,
  children,
}: {
  project: Pick<ProjectCard, 'slug' | 'github'>
  className?: string
  wrapExternal?: boolean
  children: ReactNode
}) {
  if (project.slug) {
    return <Link to={`/projects/${project.slug}`} className={className}>{children}</Link>
  }
  if (wrapExternal) {
    return <a href={project.github} target="_blank" rel="noreferrer" className={className}>{children}</a>
  }
  return <>{children}</>
}

function Projects() {
  const [filter, setFilter] = useSessionState<Filter>('cgn_filter', 'All')
  const visibleProjects = config.projects.filter(p =>
    filter === 'All' || p.tech.some(t => t.toLowerCase() === filter.toLowerCase())
  )

  return (
    <RevealSection id="projects" className="max-w-[900px] mx-auto px-6 xl:px-0 py-24">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <SectionHeading marker="04." title="Some Things I've Built" className="text-2xl" divider={false} />
        <div className="flex items-center gap-1 bg-[#f8fafc] rounded-lg p-1">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-4 py-1.5 rounded transition-colors ${
                filter === f
                  ? 'bg-[#4f46e5]/10 text-[#4f46e5]'
                  : 'text-[#475569] hover:text-[#0f172a]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visibleProjects.map(p => (
          <div
            key={p.name}
            className="group bg-[#f8fafc] rounded p-7 flex flex-col gap-5 hover:-translate-y-2 transition-transform duration-200 shadow-[0_10px_30px_-15px_rgba(15, 23, 42, 0.1)]"
          >
            <div className="flex items-center justify-between">
              <FolderIcon />
              <div className="flex items-center gap-3">
                <a href={p.github} target="_blank" rel="noreferrer" className="text-[#64748b] hover:text-[#4f46e5] transition-colors">
                  <GithubIcon />
                </a>
                <ProjectLink project={p} className="text-[#64748b] hover:text-[#4f46e5] transition-colors">
                  <ExternalIcon />
                </ProjectLink>
              </div>
            </div>

            <div>
              <ProjectLink project={p} wrapExternal={false}>
                <h3 className={`text-[#0f172a] font-medium text-lg mb-2 ${p.slug ? 'group-hover:text-[#4f46e5] transition-colors' : ''}`}>
                  {p.name}
                </h3>
              </ProjectLink>
              <p className="text-[#475569] text-sm leading-relaxed">{p.description}</p>
            </div>

            <ul className="flex flex-wrap gap-3 font-mono text-xs text-[#475569] mt-auto">
              {p.tech.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </RevealSection>
  )
}

function Certifications() {
  return (
    <RevealSection id="certifications" className="max-w-[900px] mx-auto px-6 xl:px-0 py-16">
      <SectionHeading marker="↳" title="Licenses & Certifications" className="text-xl mb-6" markerClassName="text-lg" />
      <div className="flex flex-wrap gap-3">
        {config.certifications.map((c, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-full px-4 py-2 text-sm">
            <span className="font-mono text-[#4f46e5] text-xs">{c.issuer}</span>
            <span className="text-[#0f172a]">{c.name}</span>
            <span className="font-mono text-[#64748b] text-xs">{c.year}</span>
          </div>
        ))}
      </div>
    </RevealSection>
  )
}

function OpenSource() {
  return (
    <RevealSection id="opensource" className="bg-[#f1f5f9]">
      <div className="max-w-[900px] mx-auto px-6 xl:px-0 py-24">
        <SectionHeading marker="03." title="Open Source Contributions" className="text-2xl mb-4" />
        <p className="text-[#475569] text-sm mb-10 max-w-xl">
          Notable contributions to internal Amazon services. Details are abstracted per confidentiality requirements.
        </p>
        <div className="space-y-4">
          {config.openSource.map((item, i) => (
            <a key={i} href={item.url} className="group block bg-[#ffffff] border border-[#e2e8f0] hover:border-[#4f46e5]/40 rounded-lg p-6 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3 font-mono text-xs text-[#64748b]">
                  <span className="text-[#4f46e5]">{item.repo}</span>
                  <span className="bg-[#e2e8f0] text-[#475569] px-2 py-0.5 rounded">{item.pr}</span>
                </div>
                <span className="text-[#64748b] group-hover:text-[#4f46e5] transition-colors shrink-0">
                  <ExternalIcon className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-[#0f172a] font-medium mb-2 group-hover:text-[#4f46e5] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-4">{item.description}</p>
              <ul className="flex flex-wrap gap-3 font-mono text-xs text-[#475569]">
                {item.tech.map(t => <li key={t}>{t}</li>)}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}

function Blog() {
  return (
    <RevealSection id="blog" className="bg-[#f1f5f9]">
      <div className="max-w-[900px] mx-auto px-6 xl:px-0 py-24">
        <SectionHeading marker="05." title="Latest Writing" />
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {config.blog.map((post, i) => (
            <a key={i} href={post.url} className="group block bg-[#ffffff] border border-[#e2e8f0] hover:border-[#4f46e5]/40 rounded-lg p-6 transition-colors">
              <div className="flex items-center justify-between font-mono text-xs text-[#64748b] mb-4">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-[#0f172a] font-medium text-lg mb-3 group-hover:text-[#4f46e5] transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-5">{post.description}</p>
              <ul className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <li key={tag} className="font-mono text-xs text-[#4f46e5] border border-[#4f46e5]/30 px-2.5 py-0.5 rounded-full bg-[#4f46e5]/5">
                    #{tag}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
        <div className="text-center">
          <a href="#" className="font-mono text-sm text-[#4f46e5] hover:underline underline-offset-4 transition-colors">
            View All Posts →
          </a>
        </div>
      </div>
    </RevealSection>
  )
}

function Contact() {
  return (
    <RevealSection id="contact" className="max-w-[600px] mx-auto px-6 xl:px-0 py-24 text-center">
      <p className="font-mono text-[#4f46e5] text-sm mb-4">06. What's Next?</p>
      <h2 className="text-5xl font-bold text-[#0f172a] mb-6">Get In Touch</h2>
      <p className="text-[#475569] leading-relaxed mb-12 max-w-[460px] mx-auto">
        I'm currently open to new opportunities. Whether you have a question or just want to say hi,
        my inbox is always open — I'll do my best to get back to you!
      </p>
      <a
        href={`mailto:${config.email}`}
        className="font-mono text-sm text-[#4f46e5] border border-[#4f46e5] rounded px-10 py-4 hover:bg-[#4f46e5]/10 transition-colors"
      >
        Say Hello
      </a>
    </RevealSection>
  )
}

function Footer() {
  return (
    <footer className="text-center py-6 font-mono text-xs text-[#475569] leading-relaxed">
      <a href={config.github} target="_blank" rel="noreferrer" className="hover:text-[#4f46e5] transition-colors">
        Revised by Chandan Gowda Nandakumar
      </a>
    </footer>
  )
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useSessionState('cgn_loaded', false, {
    serialize: () => '1',
    deserialize: () => true,
  })
  const loading = !loaded

  // Scroll to the hash anchor (e.g. a deep link to #projects) once the
  // real content has mounted.
  useEffect(() => {
    if (!loading && window.location.hash) {
      scrollToId(window.location.hash.slice(1), 80)
    }
  }, [loading])

  return (
    <div className="bg-[#ffffff]">
      {loading && <Loader onDone={() => setLoaded(true)} />}
      {!loading && (
        <>
          <Nav />
          <LeftSidebar />
          <RightSidebar />
          <main className="max-w-[1600px] mx-auto px-6 md:px-16 xl:px-36">
            <Hero />
            <About />
            <Experience />
            <Certifications />
            <OpenSource />
            <Projects />
            <Blog />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
