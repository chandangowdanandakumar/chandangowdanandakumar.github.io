import { useState, useEffect } from 'react'

// ── Config ──────────────────────────────────────────────────────────────────
const config = {
  name: 'Chandan Gowda Nandakumar',
  shortName: 'Chandan',
  initials: 'CGN',
  email: 'placeholder@email.com',
  github: 'https://github.com/chandangowdanandakumar',
  linkedin: '#',
  navLinks: [
    { name: 'About', url: '#about' },
    { name: 'Experience', url: '#experience' },
    { name: 'Projects', url: '#projects' },
    { name: 'Contact', url: '#contact' },
  ],
  skills: ['Java', 'TypeScript', 'React', 'JavaScript', 'Git', 'AWS'],
  experience: [
    {
      company: 'Amazon',
      title: 'Software Engineer',
      range: '2023 — Present',
      url: 'https://amazon.com',
      bullets: [
        'Building and maintaining scalable distributed systems serving millions of customers.',
        'Collaborating with cross-functional teams to design and ship new features.',
        'Writing clean, efficient, and well-tested Java and TypeScript code.',
      ],
    },
  ],
  projects: [
    {
      name: 'Mini Search Engine',
      description: 'A mini search engine exploring indexing, ranking, and query algorithms from scratch.',
      github: 'https://github.com/chandangowdanandakumar/mini-search-engine',
      tech: ['Java'],
    },
    {
      name: 'Behavioral Questions',
      description: 'A curated collection of behavioral interview questions with structured STAR answers.',
      github: 'https://github.com/chandangowdanandakumar/behavioral-questions',
      tech: ['Markdown'],
    },
    {
      name: 'Portfolio Website',
      description: 'This portfolio — built with React, TypeScript, and Tailwind CSS, deployed via GitHub Pages.',
      github: 'https://github.com/chandangowdanandakumar/chandangowdanandakumar.github.io',
      tech: ['React', 'TypeScript', 'Tailwind'],
    },
  ],
}

// ── Icons ────────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#64ffda" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

// ── Loader ───────────────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a192f] animate-loader-exit">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="absolute inset-0 w-20 h-20 animate-spin-slow" viewBox="0 0 100 100" fill="none">
          <polygon points="50,3 97,28 97,72 50,97 3,72 3,28" stroke="#64ffda" strokeWidth="3" />
        </svg>
        <span className="font-mono text-[#64ffda] text-base font-bold tracking-wide">
          {config.initials}
        </span>
      </div>
    </div>
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-300 h-[70px] ${scrolled ? 'bg-[#0a192f]/95 backdrop-blur shadow-[0_10px_30px_-10px_rgba(2,12,27,0.7)]' : ''}`}>
      <a href="/" aria-label="home">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
          <polygon points="50,3 97,28 97,72 50,97 3,72 3,28" stroke="#64ffda" strokeWidth="4" />
          <text x="50" y="58" textAnchor="middle" fill="#64ffda" fontSize="26" fontFamily="monospace" fontWeight="700">CGN</text>
        </svg>
      </a>

      <nav className="hidden md:flex items-center gap-8">
        <ol className="flex items-center gap-8 list-none">
          {config.navLinks.map((link, i) => (
            <li key={link.name}>
              <a href={link.url} className="font-mono text-xs text-[#ccd6f6] hover:text-[#64ffda] transition-colors">
                <span className="text-[#64ffda] mr-1">0{i + 1}.</span>{link.name}
              </a>
            </li>
          ))}
        </ol>
        <a
          href="/resume.pdf"
          className="font-mono text-xs text-[#64ffda] border border-[#64ffda] rounded px-4 py-2 hover:bg-[#64ffda]/10 transition-colors"
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
    <div className="fixed left-10 bottom-0 hidden xl:flex flex-col items-center gap-5 after:block after:w-px after:h-24 after:bg-[#495670] after:mt-5">
      <a href={config.github} target="_blank" rel="noreferrer" className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200">
        <GithubIcon />
      </a>
      <a href={config.linkedin} className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200">
        <LinkedinIcon />
      </a>
    </div>
  )
}

function RightSidebar() {
  return (
    <div className="fixed right-10 bottom-0 hidden xl:flex flex-col items-center gap-5 after:block after:w-px after:h-24 after:bg-[#495670] after:mt-5">
      <a
        href={`mailto:${config.email}`}
        className="font-mono text-xs text-[#a8b2d1] hover:text-[#64ffda] tracking-[.15em] hover:-translate-y-1 transition-all duration-200"
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
      <p className="font-mono text-[#64ffda] text-sm md:text-base mb-6 animate-fadeup" style={{ animationDelay: '100ms' }}>
        Hi, my name is
      </p>
      <h1 className="text-5xl md:text-7xl font-bold text-[#ccd6f6] leading-tight animate-fadeup" style={{ animationDelay: '200ms' }}>
        {config.shortName}.
      </h1>
      <h2 className="text-4xl md:text-6xl font-bold text-[#8892b0] mt-2 mb-8 leading-tight animate-fadeup" style={{ animationDelay: '300ms' }}>
        I build things for scale.
      </h2>
      <p className="max-w-[540px] text-[#8892b0] leading-relaxed mb-12 animate-fadeup" style={{ animationDelay: '400ms' }}>
        I'm a software engineer at{' '}
        <a href="https://amazon.com" target="_blank" rel="noreferrer" className="text-[#64ffda] hover:underline underline-offset-4">
          Amazon
        </a>
        , specializing in building reliable, scalable distributed systems. I care deeply about clean code and great engineering.
      </p>
      <div className="animate-fadeup" style={{ animationDelay: '500ms' }}>
        <a
          href="#projects"
          className="font-mono text-sm text-[#64ffda] border border-[#64ffda] rounded px-7 py-4 hover:bg-[#64ffda]/10 transition-colors"
        >
          Check out my work!
        </a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="max-w-[900px] mx-auto px-6 xl:px-0 py-24">
      <h2 className="flex items-center gap-3 text-[#ccd6f6] text-2xl font-bold mb-10">
        <span className="font-mono text-[#64ffda] text-xl font-normal">01.</span>
        About Me
        <div className="flex-1 h-px bg-[#233554] ml-2" />
      </h2>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 space-y-4 text-[#8892b0] leading-relaxed">
          <p>
            Hello! I'm Chandan, a software engineer based in Seattle. I enjoy building things
            that make a difference — from high-throughput backend systems to clean, accessible UIs.
          </p>
          <p>
            Currently I work at{' '}
            <a href="https://amazon.com" className="text-[#64ffda] hover:underline underline-offset-4">
              Amazon
            </a>
            , where I contribute to large-scale distributed systems. I'm always looking to learn,
            grow, and work on problems that matter.
          </p>
          <p className="pt-1">Here are a few technologies I've been working with recently:</p>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-4 font-mono text-sm mt-1">
            {config.skills.map(s => (
              <li key={s} className="flex items-center gap-2">
                <span className="text-[#64ffda] text-xs">▹</span>{s}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 flex justify-center">
          <div className="relative group w-52 h-52">
            <div className="absolute inset-0 rounded border-2 border-[#64ffda] translate-x-4 translate-y-4 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />
            <div className="relative z-10 w-full h-full rounded bg-[#112240] flex items-center justify-center overflow-hidden">
              <span className="font-mono text-7xl font-bold text-[#64ffda] opacity-20 select-none">
                {config.initials}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const [active, setActive] = useState(0)
  const exp = config.experience[active]

  return (
    <section id="experience" className="max-w-[700px] mx-auto px-6 xl:px-0 py-24">
      <h2 className="flex items-center gap-3 text-[#ccd6f6] text-2xl font-bold mb-10">
        <span className="font-mono text-[#64ffda] text-xl font-normal">02.</span>
        Where I've Worked
        <div className="flex-1 h-px bg-[#233554] ml-2" />
      </h2>

      <div className="flex flex-col sm:flex-row gap-0">
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible border-b-2 sm:border-b-0 sm:border-l-2 border-[#233554] shrink-0">
          {config.experience.map((e, i) => (
            <button
              key={e.company}
              onClick={() => setActive(i)}
              className={`font-mono text-sm px-5 py-3 text-left whitespace-nowrap transition-all duration-200 border-b-2 sm:border-b-0 sm:border-l-2 -mb-0.5 sm:-mb-0 sm:-ml-0.5
                ${active === i
                  ? 'border-[#64ffda] text-[#64ffda] bg-[#64ffda]/5'
                  : 'border-transparent text-[#8892b0] hover:text-[#64ffda] hover:bg-[#64ffda]/5'}`}
            >
              {e.company}
            </button>
          ))}
        </div>

        <div className="sm:pl-8 pt-4 sm:pt-0">
          <h3 className="text-[#ccd6f6] text-lg font-medium">
            {exp.title}{' '}
            <a href={exp.url} target="_blank" rel="noreferrer" className="text-[#64ffda]">
              @ {exp.company}
            </a>
          </h3>
          <p className="font-mono text-xs text-[#8892b0] mt-1 mb-5">{exp.range}</p>
          <ul className="space-y-3">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[#8892b0] text-sm leading-relaxed">
                <span className="text-[#64ffda] shrink-0 mt-0.5">▹</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="max-w-[900px] mx-auto px-6 xl:px-0 py-24">
      <h2 className="flex items-center gap-3 text-[#ccd6f6] text-2xl font-bold mb-10">
        <span className="font-mono text-[#64ffda] text-xl font-normal">03.</span>
        Some Things I've Built
        <div className="flex-1 h-px bg-[#233554] ml-2" />
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {config.projects.map(p => (
          <div
            key={p.name}
            className="group bg-[#112240] rounded p-7 flex flex-col gap-5 hover:-translate-y-2 transition-transform duration-200 shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)]"
          >
            <div className="flex items-center justify-between">
              <FolderIcon />
              <div className="flex items-center gap-3">
                <a href={p.github} target="_blank" rel="noreferrer" className="text-[#a8b2d1] hover:text-[#64ffda] transition-colors">
                  <GithubIcon />
                </a>
                <a href={p.github} target="_blank" rel="noreferrer" className="text-[#a8b2d1] hover:text-[#64ffda] transition-colors">
                  <ExternalIcon />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[#ccd6f6] font-medium text-lg mb-2 group-hover:text-[#64ffda] transition-colors">
                {p.name}
              </h3>
              <p className="text-[#8892b0] text-sm leading-relaxed">{p.description}</p>
            </div>

            <ul className="flex flex-wrap gap-3 font-mono text-xs text-[#8892b0] mt-auto">
              {p.tech.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="max-w-[600px] mx-auto px-6 xl:px-0 py-24 text-center">
      <p className="font-mono text-[#64ffda] text-sm mb-4">04. What's Next?</p>
      <h2 className="text-5xl font-bold text-[#ccd6f6] mb-6">Get In Touch</h2>
      <p className="text-[#8892b0] leading-relaxed mb-12 max-w-[460px] mx-auto">
        I'm currently open to new opportunities. Whether you have a question or just want to say hi,
        my inbox is always open — I'll do my best to get back to you!
      </p>
      <a
        href={`mailto:${config.email}`}
        className="font-mono text-sm text-[#64ffda] border border-[#64ffda] rounded px-10 py-4 hover:bg-[#64ffda]/10 transition-colors"
      >
        Say Hello
      </a>
    </section>
  )
}

function Footer() {
  return (
    <footer className="text-center py-6 font-mono text-xs text-[#8892b0] leading-relaxed">
      <a href={config.github} target="_blank" rel="noreferrer" className="hover:text-[#64ffda] transition-colors">
        Designed &amp; Built by Chandan Gowda Nandakumar
      </a>
    </footer>
  )
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-[#0a192f]">
      {loading && <Loader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <Nav scrolled={scrolled} />
          <LeftSidebar />
          <RightSidebar />
          <main className="max-w-[1600px] mx-auto px-6 md:px-16 xl:px-36">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
