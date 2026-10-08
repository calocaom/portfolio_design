import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './PhotoWheel.css'
import { ringCounts } from '../data/photoRings'
import { SOLID_DIAMETER } from './octahedronFaces'
import { drawSolo, drawWheel, warmWheelThumbs, HEX_PACK, ORBIT_MS, POPUP_AT_MS, SETTLE_MS, SOLO_MS, SOLO_STAGE_MS } from './photoWheelScene'

export const PHOTO_PANEL_QUERY = '(max-width: 720px)'

const SOLID_RADIUS = SOLID_DIAMETER / 2
const HOLE_GAP = 0.22
const STAGE_PAD = 0.8

function panelRows(tiles) {
  const rows = []
  let index = 0
  let rowIndex = 0
  while (index < tiles.length) {
    const count = rowIndex % 2 === 0 ? 6 : 5
    rows.push(tiles.slice(index, index + count))
    index += count
    rowIndex += 1
  }
  return rows
}

function buildCells(total) {
  const cells = []
  const hexHeight = HEX_PACK * 1.1547005
  let prevRadius = 0
  ringCounts(total).forEach((count, ringIndex) => {
    const stagger = ringIndex % 2 === 0 ? 0 : 0.5
    if (count < 2) {
      const radius = prevRadius === 0 ? 0 : prevRadius + hexHeight
      const angle = -Math.PI / 2
      cells.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        ring: ringIndex + 1,
      })
      prevRadius = radius
      return
    }
    const touchRadius = 1 / (2 * Math.sin(Math.PI / count))
    const radius = prevRadius === 0
      ? touchRadius
      : Math.max(touchRadius, prevRadius + hexHeight)
    prevRadius = radius
    for (let i = 0; i < count; i += 1) {
      const angle = ((i + stagger) / count) * Math.PI * 2 - Math.PI / 2
      cells.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        ring: ringIndex + 1,
      })
    }
  })
  return cells
}

function captionLines(photo) {
  if (!photo) return []
  const stored = String(photo.caption || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  if (stored.length) return stored
  return [photo.place, photo.camera].filter(Boolean)
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function smoothstep(p) {
  const t = Math.min(1, Math.max(0, p))
  return t * t * (3 - 2 * t)
}

const Cell = memo(function Cell({ tile, current, chosen, onPick }) {
  if (!tile.photo) return null
  return (
    <button
      type="button"
      className={`photo-wheel__cell${chosen ? ' photo-wheel__cell--chosen' : ''}`}
      style={{
        '--xu': tile.x.toFixed(4),
        '--yu': tile.y.toFixed(4),
      }}
      aria-label={tile.photo.place || tile.photo.caption || 'Photograph'}
      aria-current={current ? 'true' : undefined}
      onClick={() => onPick(tile.index)}
    >
      <img className="photo-wheel__photo" src={tile.photo.src} alt="" draggable={false} />
    </button>
  )
})

function PhotoPopup({ photo, closeLabel, onClose, unwrap, land, backdropCloses }) {
  const lines = captionLines(photo)

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const classes = [
    'photo-wheel__popup',
    unwrap ? 'photo-wheel__popup--unwrap' : '',
    land ? 'photo-wheel__popup--land photo-wheel__popup--orbit' : '',
  ].filter(Boolean).join(' ')

  return createPortal(
    <div
      className={classes}
      role="dialog"
      aria-modal="true"
      aria-label={lines[0] || closeLabel}
      onClick={backdropCloses ? onClose : undefined}
    >
      <div className="photo-wheel__popup-sheet" onClick={(event) => event.stopPropagation()}>
        {land ? (
          <>
            <span className="photo-wheel__ripple" aria-hidden="true" />
            <span className="photo-wheel__ripple photo-wheel__ripple--late" aria-hidden="true" />
          </>
        ) : null}
        <div className="photo-wheel__popup-frame">
          <button type="button" className="photo-wheel__popup-close" aria-label={closeLabel} onClick={onClose}>
            ×
          </button>
          <img src={photo.src} alt="" draggable={false} />
        </div>
        {lines.length ? (
          <p className="photo-wheel__caption">
            {lines.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </p>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

export default function PhotoWheel({ photos, label, closeLabel = 'Close', openCenter = false }) {
  const [selected, setSelected] = useState(0)
  const [centerOpen, setCenterOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [hexSize, setHexSize] = useState(36)
  const [panel, setPanel] = useState(() => window.matchMedia(PHOTO_PANEL_QUERY).matches)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const seqRef = useRef(0)
  const finishedRef = useRef(0)
  const timersRef = useRef([])
  const modeRef = useRef('stop')
  const clockRef = useRef({ last: 0, origin: 0, orbit: 0 })
  const hexSizeRef = useRef(hexSize)
  hexSizeRef.current = hexSize
  const count = photos.length

  const cells = useMemo(() => buildCells(count), [count])
  const hexReach = useMemo(() => {
    if (!cells.length) return 1
    return Math.max(...cells.map((cell) => Math.hypot(cell.x, cell.y)))
  }, [cells])
  const focusRatio = useMemo(() => {
    if (!cells.length) return 0.34
    const inner = Math.min(...cells.map((cell) => Math.hypot(cell.x, cell.y)))
    const hole = Math.max(0.8, inner - SOLID_RADIUS - HOLE_GAP)
    const side = hole * Math.SQRT2 * 0.92
    return side / (2 * (Math.max(hexReach, 0.01) + STAGE_PAD))
  }, [cells, hexReach])
  const tiles = useMemo(
    () => cells.map((cell, index) => ({ ...cell, photo: photos[index], index })),
    [cells, photos],
  )
  const stageRadius = Math.max(hexReach, 0.01) + STAGE_PAD
  const focusSide = hexSize * 2 * stageRadius * focusRatio
  const popupPhoto = (centerOpen || phase === 'open') ? tiles[selected]?.photo : null

  function clearTimers() {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current = []
  }

  const finish = useCallback((id) => {
    if (id !== seqRef.current || finishedRef.current === id) return
    finishedRef.current = id
    clearTimers()
    setPlaying(false)
    setPhase('shown')
    setCenterOpen(true)
  }, [])

  const closePopup = useCallback(() => {
    seqRef.current += 1
    clearTimers()
    modeRef.current = 'stop'
    setPlaying(false)
    setCenterOpen(false)
    setPhase('idle')
  }, [])

  useEffect(() => {
    seqRef.current += 1
    clearTimers()
    modeRef.current = 'stop'
    setPlaying(false)
    setPhase(openCenter ? 'shown' : 'idle')
    setSelected(0)
    setCenterOpen(openCenter)
  }, [photos, openCenter])

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    const media = window.matchMedia(PHOTO_PANEL_QUERY)
    const apply = () => setPanel(media.matches)
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const observer = new ResizeObserver(() => {
      const width = stage.clientWidth
      if (width > 0) setHexSize(width / 2 / (hexReach + STAGE_PAD))
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [hexReach])

  useEffect(() => {
    if (panel) return undefined
    const stage = stageRef.current
    if (!stage) return undefined
    let index = 0
    let frame = 0
    const warm = () => {
      const images = [...stage.querySelectorAll('.photo-wheel__photo')]
      if (!images.length || index >= images.length) return
      index = warmWheelThumbs(images, index, 6)
      if (index < images.length) frame = requestAnimationFrame(warm)
    }
    frame = requestAnimationFrame(warm)
    return () => cancelAnimationFrame(frame)
  }, [panel, tiles])

  useEffect(() => {
    if (!playing) return undefined
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return undefined
    const clock = clockRef.current
    let frame = 0

    if (panel) {
      const cell = stage.querySelector('.photo-wheel__cell--chosen')
      const image = cell?.querySelector('img')
      if (!cell || !image) return undefined
      const ctx = canvas.getContext('2d')
      const tick = (now) => {
        const bounds = canvas.getBoundingClientRect()
        const width = bounds.width
        const height = bounds.height
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
          canvas.width = Math.round(width * dpr)
          canvas.height = Math.round(height * dpr)
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        if (!clock.origin) clock.origin = now
        const rect = cell.getBoundingClientRect()
        const t = Math.min(1, (now - clock.origin) / SOLO_MS)
        drawSolo(ctx, {
          t,
          image,
          cellHeight: rect.height,
          originX: rect.left + rect.width / 2 - bounds.left,
          originY: rect.top + rect.height / 2 - bounds.top,
          width,
          height,
        })
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      return () => {
        cancelAnimationFrame(frame)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    const ctx = canvas.getContext('2d')
    const images = [...stage.querySelectorAll('.photo-wheel__photo')]
    let primed = false
    let popupOpened = false
    const tick = (now) => {
      const bounds = canvas.getBoundingClientRect()
      const width = bounds.width
      const height = bounds.height
      const dpr = 1
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const stageRect = stage.getBoundingClientRect()
      const draw = (elapsed, settle) => {
        drawWheel(ctx, {
          elapsed,
          settle,
          tiles,
          images,
          hexSize: hexSizeRef.current,
          width,
          height,
          originX: stageRect.left + stageRect.width / 2 - bounds.left,
          originY: stageRect.top + stageRect.height / 2 - bounds.top,
        })
      }
      if (!primed) {
        draw(0, 0)
        primed = true
        clock.origin = performance.now()
        frame = requestAnimationFrame(tick)
        return
      }
      const elapsed = now - clock.origin
      if (elapsed >= POPUP_AT_MS && !popupOpened) {
        popupOpened = true
        setPhase('shown')
        setCenterOpen(true)
      }
      if (elapsed < ORBIT_MS) {
        draw(elapsed, 0)
      } else if (elapsed < ORBIT_MS + SETTLE_MS) {
        stage.dataset.phase = 'settle'
        draw(ORBIT_MS, smoothstep((elapsed - ORBIT_MS) / SETTLE_MS))
      } else {
        draw(ORBIT_MS, 1)
        modeRef.current = 'stop'
        setPlaying(false)
        setPhase('shown')
        setCenterOpen(true)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [playing, panel, selected, tiles])

  const playSequence = useCallback((index) => {
    if (playing) return
    const id = seqRef.current + 1
    seqRef.current = id
    clearTimers()
    setSelected(index)
    const orbiting = !panel
    if (prefersReducedMotion()) {
      setPlaying(false)
      setPhase('shown')
      setCenterOpen(true)
      return
    }
    setCenterOpen(false)
    setPlaying(false)
    setPhase('idle')
    requestAnimationFrame(() => {
      if (seqRef.current !== id) return
      stageRef.current?.getBoundingClientRect()
      requestAnimationFrame(() => {
        if (seqRef.current !== id) return
        setPlaying(true)
        setPhase(orbiting ? 'orbit' : 'spin')
        clockRef.current = { last: 0, origin: 0, orbit: 0 }
        if (orbiting) {
          modeRef.current = 'run'
          return
        }
        ;[['grow', 1], ['open', 2]].forEach(([name, step]) => {
          timersRef.current.push(setTimeout(() => {
            if (seqRef.current !== id) return
            setPhase(name)
          }, SOLO_STAGE_MS * step))
        })
        timersRef.current.push(setTimeout(() => finish(id), SOLO_MS + 80))
      })
    })
  }, [finish, playing, panel])

  return (
    <div className={`photo-wheel${panel ? ' photo-wheel--panel' : ''}`}>
      <div
        ref={stageRef}
        className={`photo-wheel__stage${playing ? ' photo-wheel--play' : ''}`}
        data-phase={phase}
        role="region"
        aria-label={label}
        style={{
          '--hex': `${hexSize}px`,
          '--pack': String(HEX_PACK),
          '--focus-side': `${focusSide.toFixed(2)}px`,
        }}
      >
        <div className="photo-wheel__ring">
          {panel
            ? panelRows(tiles).map((row, rowIndex) => (
              <div
                key={row[0]?.photo?.file || rowIndex}
                className={`photo-wheel__row${rowIndex % 2 === 1 ? ' photo-wheel__row--short' : ''}`}
              >
                {row.map((tile) => (
                  <Cell
                    key={tile.photo?.file || tile.index}
                    tile={tile}
                    current={centerOpen && tile.index === selected}
                    chosen={playing && tile.index === selected}
                    onPick={playSequence}
                  />
                ))}
              </div>
            ))
            : tiles.map((tile) => (
              <Cell
                key={tile.photo?.file || tile.index}
                tile={tile}
                current={centerOpen && tile.index === selected}
                chosen={playing && tile.index === selected}
                onPick={playSequence}
              />
            ))}
        </div>
        {playing && !panel ? (
          <canvas ref={canvasRef} className="photo-wheel__canvas" aria-hidden="true" />
        ) : null}
      </div>
      {playing && panel
        ? createPortal(
          <canvas ref={canvasRef} className="photo-wheel__canvas photo-wheel__canvas--solo" aria-hidden="true" />,
          document.body,
        )
        : null}
      {popupPhoto ? (
        <PhotoPopup
          photo={popupPhoto}
          closeLabel={closeLabel}
          onClose={closePopup}
          unwrap={panel}
          land={!panel}
          backdropCloses={panel}
        />
      ) : null}
    </div>
  )
}
