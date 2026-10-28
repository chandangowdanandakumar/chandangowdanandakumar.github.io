// The "01. About Me ───" numbered heading was repeated with the same
// three-part markup (marker span + title + divider line) in About,
// Experience, OpenSource, Projects, Certifications, and Blog.
export function SectionHeading({
  marker,
  title,
  divider = true,
  className = 'text-2xl mb-10',
  markerClassName = 'text-xl',
}: {
  marker: string
  title: string
  divider?: boolean
  className?: string
  markerClassName?: string
}) {
  return (
    <h2 className={`flex items-center gap-3 text-[#0f172a] font-bold ${className}`}>
      <span className={`font-mono text-[#4f46e5] font-normal ${markerClassName}`}>{marker}</span>
      {title}
      {divider && <div className="flex-1 h-px bg-[#e2e8f0] ml-2" />}
    </h2>
  )
}
