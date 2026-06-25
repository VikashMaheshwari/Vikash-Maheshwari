import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            // trigger fill bars
            e.target.querySelectorAll('.fill').forEach(f => {
              if (f.dataset.w) f.style.width = f.dataset.w + '%'
            })
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.16 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}
