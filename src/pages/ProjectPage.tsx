import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProject } from '../data/projects'
import { GithubIcon, ArrowLeftIcon, ArrowUpIcon } from '../components/icons'
import { scrollToId } from '../lib/scroll'

// The top-bar and bottom-of-article back controls differ only in label/size.
function BackButton({ onClick, label, size = 'text-xs' }: { onClick: () => void; label: string; size?: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 font-mono ${size} text-[#475569] hover:text-[#4f46e5] transition-colors`}>
      <ArrowLeftIcon /> {label}
    </button>
  )
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = getProject(slug ?? '')

  // Land at the top of the article instead of inheriting the homepage's
  // scroll position.
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
      scrollToId('projects', 150)
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-[#4f46e5]">404 — Project not found</p>
        <Link to="/" className="font-mono text-sm text-[#475569] hover:text-[#4f46e5] flex items-center gap-2 transition-colors">
          <ArrowLeftIcon /> Back to portfolio
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#475569]">

      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-16 h-[70px] bg-[#ffffff]/95 backdrop-blur border-b border-[#e2e8f0]">
        <BackButton onClick={handleBack} label="Back" size="text-sm" />
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 font-mono text-xs text-[#475569] hover:text-[#4f46e5] transition-colors"
        >
          <GithubIcon className="w-4 h-4" /> View on GitHub
        </a>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Meta */}
        <div className="flex items-center justify-between font-mono text-xs text-[#64748b] mb-8">
          <span>Updated {project.updated}</span>
          <span>{project.readTime}</span>
        </div>

        {/* Hero banner */}
        <div className="w-full rounded-lg bg-[#f8fafc] border border-[#e2e8f0] mb-10 overflow-hidden">
          <div className="h-64 flex flex-col items-center justify-center gap-4">
            <div className="font-mono text-[#4f46e5] text-5xl font-bold opacity-10 select-none tracking-tight">
              {'{'}{'}'}
            </div>
            <div className="flex flex-wrap gap-2 justify-center px-8">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-xs text-[#4f46e5] border border-[#4f46e5]/30 px-3 py-1 rounded-full bg-[#4f46e5]/5">
                  {t}
                </span>
              ))}
            </div>
            <p className="font-mono text-xs text-[#64748b] mt-1">{project.heroLabel}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#0f172a] mb-2">{project.name}</h1>
        <p className="text-[#4f46e5] font-mono text-sm mb-12">{project.tagline}</p>

        {/* Article */}
        <article className="space-y-8">
          {project.sections.map((section, i) => {
            switch (section.type) {
              case 'heading':
                return (
                  <div key={i} className="space-y-4">
                    <h2 className="text-xl font-bold text-[#0f172a]">{section.title}</h2>
                    <p className="leading-relaxed">{section.body}</p>
                  </div>
                )
              case 'paragraph':
                return <p key={i} className="leading-relaxed">{section.body}</p>
              case 'callout':
                return (
                  <aside key={i} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-6 space-y-6">
                    <p className="font-mono text-xs text-[#4f46e5] uppercase tracking-widest">Case Study</p>
                    {section.calloutItems?.map((item, j) => (
                      <div key={j}>
                        <h3 className="text-[#0f172a] font-semibold mb-2">{item.heading}</h3>
                        <p className="text-sm leading-relaxed">{item.body}</p>
                      </div>
                    ))}
                  </aside>
                )
              default:
                return null
            }
          })}
        </article>

        {/* Back to top */}
        <div className="mt-20 pt-8 border-t border-[#e2e8f0] flex items-center justify-between">
          <BackButton onClick={handleBack} label="Back to projects" />
          <a
            href="#"
            className="flex items-center gap-2 font-mono text-xs text-[#475569] hover:text-[#4f46e5] transition-colors"
          >
            Back to top <ArrowUpIcon />
          </a>
        </div>

      </main>
    </div>
  )
}
