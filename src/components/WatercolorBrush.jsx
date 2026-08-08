import { useEffect, useRef } from 'react'
import './WatercolorBrush.css'

const LIFE_MS = 900
const PIGMENTS_REVEAL = [
  { h: 268, s: 55, l: 38 },
  { h: 278, s: 48, l: 40 },
  { h: 258, s: 50, l: 34 },
  { h: 290, s: 42, l: 42 },
  { h: 250, s: 45, l: 32 },
  { h: 275, s: 50, l: 44 },
]

/* Violet, plum, purple — used for paint strokes on light surfaces */
const PIGMENTS_PAINT = [
  { h: 270, s: 58, l: 42 }, /* violet */
  { h: 320, s: 42, l: 36 }, /* plum */
  { h: 282, s: 55, l: 34 }, /* purple */
  { h: 265, s: 52, l: 46 }, /* light violet */
  { h: 310, s: 38, l: 32 }, /* deep plum */
  { h: 275, s: 60, l: 38 }, /* rich purple */
]

function hsla(h, s, l, a) {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

function lifeAlpha(born, now) {
  const t = (now - born) / LIFE_MS
  if (t <= 0) return 1
  if (t >= 1) return 0
  return 1 - t * t
}

/**
 * Acrylic brush:
 *   reveal — punch through a black veil (Contact)
 *   paint  — purple strokes on a light surface (MainPage)
 */
export default function WatercolorBrush({ containerRef, variant = 'reveal' }) {
  const veilRef = useRef(null)
  const paintRef = useRef(null)
  const isPaint = variant === 'paint'

  useEffect(() => {
    const veilCanvas = veilRef.current
    const paintCanvas = paintRef.current
    const container = containerRef?.current
    if (!paintCanvas || !container) return
    if (!isPaint && !veilCanvas) return

    const veilCtx = veilCanvas?.getContext('2d', { alpha: true }) ?? null
    const paintCtx = paintCanvas.getContext('2d', { alpha: true })
    if (!paintCtx) return
    if (!isPaint && !veilCtx) return

    const pigments = isPaint ? PIGMENTS_PAINT : PIGMENTS_REVEAL

    const state = {
      prevX: null,
      prevY: null,
      prevT: 0,
      pigment: 0,
      distance: 0,
      width: 0,
      height: 0,
      marks: [],
      raf: 0,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    }

    function resize() {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.width = rect.width
      state.height = rect.height

      const canvases = isPaint ? [paintCanvas] : [veilCanvas, paintCanvas]
      for (const canvas of canvases) {
        canvas.width = Math.max(1, Math.floor(rect.width * dpr))
        canvas.height = Math.max(1, Math.floor(rect.height * dpr))
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
      }

      if (veilCtx) veilCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawAcrylicStamp(ctx, mark, alpha, mode) {
      if (alpha <= 0.01) return

      const { x, y, angle, rx, ry, pigment, bristles, edgeSpecks } = mark
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.globalAlpha = alpha

      for (let i = 0; i < bristles.length; i++) {
        const b = bristles[i]
        const w = rx * b.sx
        const h = ry * b.sy

        if (mode === 'erase') {
          const g = ctx.createRadialGradient(b.ox, b.oy, 0, b.ox, b.oy, Math.max(w, h))
          g.addColorStop(0, 'rgba(255,255,255,1)')
          g.addColorStop(0.5, 'rgba(255,255,255,0.9)')
          g.addColorStop(0.78, 'rgba(255,255,255,0.28)')
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = g
        } else {
          const { h: hue, s, l } = pigment
          const hj = hue + b.hue
          const g = ctx.createRadialGradient(b.ox, b.oy, 0, b.ox, b.oy, Math.max(w, h))
          if (isPaint) {
            g.addColorStop(0, hsla(hj, s, l + 6, 0.42))
            g.addColorStop(0.4, hsla(hj, s, l, 0.26))
            g.addColorStop(0.75, hsla(hj, s - 4, l - 2, 0.1))
            g.addColorStop(1, hsla(hj, s, l, 0))
          } else {
            g.addColorStop(0, hsla(hj, s, l + 4, 0.14))
            g.addColorStop(0.45, hsla(hj, s, l, 0.07))
            g.addColorStop(0.78, hsla(hj, s - 6, l - 4, 0.025))
            g.addColorStop(1, hsla(hj, s, l, 0))
          }
          ctx.fillStyle = g
        }

        ctx.beginPath()
        const lobes = b.lobes || 10
        for (let p = 0; p <= lobes; p++) {
          const t = (p / lobes) * Math.PI * 2
          const jagged = 0.78 + b.edge[p % b.edge.length] * 0.28
          const px = b.ox + Math.cos(t) * w * jagged
          const py = b.oy + Math.sin(t) * h * jagged
          if (p === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fill()
      }

      for (let i = 0; i < edgeSpecks.length; i++) {
        const speck = edgeSpecks[i]
        const sx = Math.cos(speck.a) * rx * speck.d
        const sy = Math.sin(speck.a) * ry * speck.d

        if (mode === 'erase') {
          ctx.fillStyle = `rgba(255,255,255,${0.35 + speck.aBoost})`
        } else {
          const { h: hue, s, l } = pigment
          const speckA = isPaint ? 0.12 + speck.aBoost * 0.1 : 0.045 + speck.aBoost * 0.055
          ctx.fillStyle = hsla(hue + speck.hue, s, l + 2, speckA)
        }

        ctx.beginPath()
        ctx.ellipse(sx, sy, speck.rw, speck.rh, speck.rot, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    function makeEdge(count) {
      return Array.from({ length: count }, () => 0.7 + Math.random() * 0.55)
    }

    function makeBristles() {
      const count = 3 + Math.floor(Math.random() * 3)
      const list = [
        {
          ox: 0,
          oy: 0,
          sx: 1,
          sy: 1,
          hue: 0,
          lobes: 12 + Math.floor(Math.random() * 6),
          edge: makeEdge(16),
        },
      ]
      for (let i = 0; i < count; i++) {
        list.push({
          ox: (Math.random() - 0.5) * 22,
          oy: (Math.random() - 0.5) * 14,
          sx: 0.35 + Math.random() * 0.5,
          sy: 0.28 + Math.random() * 0.45,
          hue: (Math.random() - 0.5) * 18,
          lobes: 9 + Math.floor(Math.random() * 7),
          edge: makeEdge(14),
        })
      }
      return list
    }

    function makeEdgeSpecks(rx, ry) {
      const count = 14 + Math.floor(Math.random() * 16)
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({
          a: Math.random() * Math.PI * 2,
          d: 0.72 + Math.random() * 0.48,
          rw: 1.2 + Math.random() * (rx * 0.12),
          rh: 0.8 + Math.random() * (ry * 0.18),
          rot: Math.random() * Math.PI,
          hue: (Math.random() - 0.5) * 20,
          aBoost: Math.random() * 0.45,
        })
      }
      for (let i = 0; i < 5; i++) {
        list.push({
          a: (Math.random() - 0.5) * 0.8,
          d: 0.85 + Math.random() * 0.4,
          rw: 2 + Math.random() * (rx * 0.2),
          rh: 0.6 + Math.random() * 2.2,
          rot: Math.random() * Math.PI,
          hue: (Math.random() - 0.5) * 12,
          aBoost: 0.2 + Math.random() * 0.4,
        })
      }
      return list
    }

    function addMarks(x, y, angle, speed, now) {
      const pigment = pigments[state.pigment % pigments.length]
      const rx = Math.max(22, Math.min(64, 56 - speed * 28))
      const ry = rx * (0.32 + Math.random() * 0.18)
      const finalRx = rx * (0.9 + Math.random() * 0.25)

      state.marks.push({
        x,
        y,
        angle,
        rx: finalRx,
        ry,
        pigment,
        bristles: makeBristles(),
        edgeSpecks: makeEdgeSpecks(finalRx, ry),
        born: now,
      })

      if (state.marks.length > 200) {
        state.marks.splice(0, state.marks.length - 200)
      }
    }

    function paintAt(clientX, clientY) {
      if (state.reducedMotion) return

      const rect = container.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const now = performance.now()

      if (state.prevX == null) {
        state.prevX = x
        state.prevY = y
        state.prevT = now
        addMarks(x, y, 0, 0.2, now)
        return
      }

      const dx = x - state.prevX
      const dy = y - state.prevY
      const dist = Math.hypot(dx, dy)
      if (dist < 2) return

      const dt = Math.max(now - state.prevT, 1)
      const speed = dist / dt
      const angle = Math.atan2(dy, dx)

      state.distance += dist
      if (state.distance > 56) {
        state.pigment += 1
        state.distance = 0
      }

      const steps = Math.max(1, Math.ceil(dist / 10))
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        addMarks(state.prevX + dx * t, state.prevY + dy * t, angle, speed, now)
      }

      state.prevX = x
      state.prevY = y
      state.prevT = now
    }

    function render(now) {
      const { width, height, marks } = state
      state.marks = marks.filter((m) => now - m.born < LIFE_MS)

      const dpr = paintCanvas.width / Math.max(width, 1)

      if (!isPaint && veilCtx && veilCanvas) {
        veilCtx.setTransform(1, 0, 0, 1, 0, 0)
        veilCtx.clearRect(0, 0, veilCanvas.width, veilCanvas.height)
        veilCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

        veilCtx.globalCompositeOperation = 'source-over'
        veilCtx.globalAlpha = 1
        veilCtx.fillStyle = '#000'
        veilCtx.fillRect(0, 0, width, height)

        veilCtx.globalCompositeOperation = 'destination-out'
        for (const mark of state.marks) {
          drawAcrylicStamp(veilCtx, mark, lifeAlpha(mark.born, now), 'erase')
        }
      }

      paintCtx.setTransform(1, 0, 0, 1, 0, 0)
      paintCtx.clearRect(0, 0, paintCanvas.width, paintCanvas.height)
      paintCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintCtx.globalCompositeOperation = 'source-over'

      for (const mark of state.marks) {
        drawAcrylicStamp(paintCtx, mark, lifeAlpha(mark.born, now), 'color')
      }

      state.raf = requestAnimationFrame(render)
    }

    function onPointerMove(event) {
      if (event.pointerType === 'touch' && event.buttons === 0) return
      paintAt(event.clientX, event.clientY)
    }

    function onPointerDown(event) {
      state.prevX = null
      paintAt(event.clientX, event.clientY)
    }

    function onPointerLeave() {
      state.prevX = null
      state.prevY = null
    }

    resize()
    state.raf = requestAnimationFrame(render)
    window.addEventListener('resize', resize)
    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerdown', onPointerDown, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelAnimationFrame(state.raf)
      window.removeEventListener('resize', resize)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [containerRef, isPaint])

  return (
    <>
      {!isPaint && (
        <canvas
          ref={veilRef}
          className="watercolor-brush watercolor-brush--veil"
          aria-hidden="true"
        />
      )}
      <canvas
        ref={paintRef}
        className={`watercolor-brush watercolor-brush--paint${isPaint ? ' watercolor-brush--paint-only' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}
