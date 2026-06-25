import { useEffect } from 'react'

const PHRASES = [
  'machine learning models',
  'RAG pipelines',
  'multi-agent AI systems',
  'deep learning solutions',
  'LLM workflows & evals'
]

export function useTypewriter(elRef) {
  useEffect(() => {
    const el = elRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = PHRASES[0]
      return
    }
    let p = 0, c = 0, del = false
    let timer
    function tick() {
      const w = PHRASES[p]
      el.textContent = del ? w.slice(0, c--) : w.slice(0, c++)
      if (!del && c === w.length + 1) {
        del = true
        timer = setTimeout(tick, 1300)
        return
      }
      if (del && c < 0) {
        del = false
        p = (p + 1) % PHRASES.length
        c = 0
        timer = setTimeout(tick, 200)
        return
      }
      timer = setTimeout(tick, del ? 42 : 78)
    }
    tick()
    return () => clearTimeout(timer)
  }, [elRef])
}
