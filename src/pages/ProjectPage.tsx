import { useParams, Link } from 'react-router-dom'
import { getProject } from '../data/projects'

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
)

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
)

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProject(slug ?? '')

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-[#64ffda]">404 — Project not found</p>
        <Link to="/" className="font-mono text-sm text-[#8892b0] hover:text-[#64ffda] flex items-center gap-2 transition-colors">
          <ArrowLeftIcon /> Back to portfolio
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#8892b0]">

      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-16 h-[70px] bg-[#0a192f]/95 backdrop-blur border-b border-[#233554]">
        <Link
          to="/#projects"
          className="flex items-center gap-2 font-mono text-sm text-[#8892b0] hover:text-[#64ffda] transition-colors"
        >
          <ArrowLeftIcon /> Back
        </Link>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 font-mono text-xs text-[#8892b0] hover:text-[#64ffda] transition-colors"
        >
          <GithubIcon /> View on GitHub
        </a>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Meta */}
        <div className="flex items-center justify-between font-mono text-xs text-[#495670] mb-8">
          <span>Updated {project.updated}</span>
          <span>{project.readTime}</span>
        </div>

        {/* Hero banner */}
        <div className="w-full rounded-lg bg-[#112240] border border-[#233554] mb-10 overflow-hidden">
          <div className="h-64 flex flex-col items-center justify-center gap-4">
            <div className="font-mono text-[#64ffda] text-5xl font-bold opacity-10 select-none tracking-tight">
              {'{'}{'}'}
            </div>
            <div className="flex flex-wrap gap-2 justify-center px-8">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-xs text-[#64ffda] border border-[#64ffda]/30 px-3 py-1 rounded-full bg-[#64ffda]/5">
                  {t}
                </span>
              ))}
            </div>
            <p className="font-mono text-xs text-[#495670] mt-1">{project.heroLabel}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#ccd6f6] mb-2">{project.name}</h1>
        <p className="text-[#64ffda] font-mono text-sm mb-12">{project.tagline}</p>

        {/* Article */}
        <article className="space-y-8">
          {project.sections.map((section, i) => {
            if (section.type === 'heading') return (
              <div key={i} className="space-y-4">
                <h2 className="text-xl font-bold text-[#ccd6f6]">{section.title}</h2>
                <p className="leading-relaxed">{section.body}</p>
              </div>
            )

            if (section.type === 'paragraph') return (
              <p key={i} className="leading-relaxed">{section.body}</p>
            )

            if (section.type === 'callout') return (
              <aside key={i} className="bg-[#112240] border border-[#233554] rounded-lg p-6 space-y-6">
                <p className="font-mono text-xs text-[#64ffda] uppercase tracking-widest">Deep Dive</p>
                {section.calloutItems?.map((item, j) => (
                  <div key={j}>
                    <h3 className="text-[#ccd6f6] font-semibold mb-2">{item.heading}</h3>
                    <p className="text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </aside>
            )

            return null
          })}
        </article>

        {/* Back to top */}
        <div className="mt-20 pt-8 border-t border-[#233554] flex items-center justify-between">
          <Link
            to="/#projects"
            className="flex items-center gap-2 font-mono text-xs text-[#8892b0] hover:text-[#64ffda] transition-colors"
          >
            <ArrowLeftIcon /> Back to projects
          </Link>
          <a
            href="#"
            className="flex items-center gap-2 font-mono text-xs text-[#8892b0] hover:text-[#64ffda] transition-colors"
          >
            Back to top <ArrowUpIcon />
          </a>
        </div>

      </main>
    </div>
  )
}
