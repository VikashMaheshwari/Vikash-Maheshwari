import { useState, useEffect } from 'react'

export default function useTheme() {
  const [isLight, setIsLight] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'light'
      return window.matchMedia('(prefers-color-scheme: light)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.body.classList.toggle('light', isLight)
    try { localStorage.setItem('theme', isLight ? 'light' : 'dark') } catch {}
  }, [isLight])

  return [isLight, () => setIsLight(v => !v)]
}
