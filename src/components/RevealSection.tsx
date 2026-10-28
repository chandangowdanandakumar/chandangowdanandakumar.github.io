import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Previously every section (About, Experience, Projects, Certifications,
// OpenSource, Projects, Blog, Contact) repeated its own
// `const { ref, visible } = useScrollReveal()` call, the
// `ref as React.RefObject<HTMLElement>` cast, and the same
// `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
// template string. This wrapper owns that once.
export function RevealSection({
  id,
  className = '',
  delayClassName = '',
  children,
}: {
  id?: string
  className?: string
  delayClassName?: string
  children: ReactNode
}) {
  const { ref, visible } = useScrollReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id={id}
      className={`${className} transition-all duration-700 ${delayClassName} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </section>
  )
}
