import { useEffect, useRef, useState } from 'react'

// Generic over the element type so call sites no longer need to cast the
// ref (every section used `ref={ref as React.RefObject<HTMLElement>}`
// because this used to be hardcoded to HTMLElement).
export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}
