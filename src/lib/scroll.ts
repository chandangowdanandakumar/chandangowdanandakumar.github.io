// Previously duplicated in App.tsx (delay 80) and ProjectPage.tsx (delay 150)
// as two separate setTimeout+scrollIntoView calls.
export function scrollToId(id: string, delay = 100) {
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), delay)
}
