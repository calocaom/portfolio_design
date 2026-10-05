import { useEffect } from 'react'
import './ScrollZoom.css'

/** Scroll-linked image shift for `.scroll-zoom` tiles inside the active screen. */
export default function ScrollZoom({ page }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return undefined

    const screen = document.querySelector('.screen')
    if (!screen) return undefined

    let frame = 0

    function update() {
      frame = 0
      const viewTop = screen.getBoundingClientRect().top
      const viewH = screen.clientHeight || 1
      screen.querySelectorAll('.scroll-zoom').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.height < 8) return
        const mid = rect.top + rect.height / 2 - viewTop
        const progress = (mid - viewH / 2) / (viewH * 0.72)
        const clamped = Math.max(-1, Math.min(1, progress))
        el.style.setProperty('--scroll-shift', clamped.toFixed(4))
      })
    }

    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    screen.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      screen.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [page])

  return null
}
