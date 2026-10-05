import { OCTAHEDRON_FACES } from './octahedronFaces'

export const STAGE_MS = 1500
export const TIMELINE_MS = STAGE_MS * 5
const PERSPECTIVE = 1800

// Each ring is a rigid hoop. It leans onto its own axis, then the photos
// travel around that same circle, so the diameter does not grow or collapse.
const ORBITS = [
  { axis: [1, 0, 0], tilt: 58, spin: 360 },
  { axis: [0, 1, 0], tilt: -48, spin: -360 },
  { axis: normalize([1, 1, 0]), tilt: 52, spin: 360 },
  { axis: normalize([1, -1, 0]), tilt: -40, spin: -360 },
]
const CAMERA_YAW = 12
const CAMERA_PITCH = -16

function normalize(v) {
  const length = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / length, v[1] / length, v[2] / length]
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

function rotateAround(v, axis, degrees) {
  if (!degrees) return v
  const k = normalize(axis)
  const rad = (degrees * Math.PI) / 180
  const c = Math.cos(rad)
  const s = Math.sin(rad)
  const d = dot(k, v)
  const cr = cross(k, v)
  return [
    v[0] * c + cr[0] * s + k[0] * d * (1 - c),
    v[1] * c + cr[1] * s + k[1] * d * (1 - c),
    v[2] * c + cr[2] * s + k[2] * d * (1 - c),
  ]
}

function smooth(p) {
  const t = Math.min(1, Math.max(0, p))
  return t * t * (3 - 2 * t)
}

function cameraLean(t) {
  if (t <= 0.2) return 0
  if (t <= 0.35) return smooth((t - 0.2) / 0.15)
  if (t <= 0.6) return 1
  if (t <= 0.8) return 1 - smooth((t - 0.6) / 0.2)
  return 0
}

export function ringPose(t, orbit) {
  const lean = cameraLean(t)
  const travel = t <= 0.2 ? 0 : t >= 0.6 ? 1 : (t - 0.2) / 0.4
  return {
    tilt: orbit.tilt * lean,
    spin: orbit.spin * travel,
    lean,
  }
}

function orientRing(point, spinDeg, axis, tiltDeg, lean) {
  const rad = (spinDeg * Math.PI) / 180
  const c = Math.cos(rad)
  const s = Math.sin(rad)
  let next = [point[0] * c - point[1] * s, point[0] * s + point[1] * c, point[2]]
  next = rotateAround(next, axis, tiltDeg)
  next = rotateAround(next, [0, 1, 0], CAMERA_YAW * lean)
  return rotateAround(next, [1, 0, 0], CAMERA_PITCH * lean)
}

export function tumbleAngles(t, index) {
  const travel = t <= 0.6 ? t / 0.6 : 1
  const alt = index % 2 === 1 ? -1 : 1
  const phase = (index % 8) * 28
  return {
    x: alt * (phase * 0.4 + travel * 250),
    y: phase + travel * 520,
    z: alt * (travel * 64),
  }
}

function applyTumble(point, angles) {
  let next = rotateAround(point, [1, 0, 0], angles.x)
  next = rotateAround(next, [0, 1, 0], angles.y)
  return rotateAround(next, [0, 0, 1], angles.z)
}

function project(p, cx, cy) {
  const scale = PERSPECTIVE / (PERSPECTIVE - p[2] || 0.001)
  return [cx + p[0] * scale, cy + p[1] * scale]
}

function coverSource(img, boxW, boxH) {
  const width = img.naturalWidth || img.width
  const height = img.naturalHeight || img.height
  const aspect = width / height
  const boxAspect = boxW / Math.max(boxH, 0.01)
  if (aspect > boxAspect) {
    const sw = height * boxAspect
    return { sx: (width - sw) / 2, sy: 0, sw, sh: height }
  }
  const sh = width / boxAspect
  return { sx: 0, sy: (height - sh) / 2, sw: width, sh }
}

function paintFace(ctx, face, points, image, alpha) {
  if (face.kind !== 'hex' || points.length < 3 || alpha <= 0.01) return
  if (!image || !(image.naturalWidth || image.width)) return
  ctx.beginPath()
  ctx.moveTo(points[0][0], points[0][1])
  for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i][0], points[i][1])
  ctx.closePath()
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.clip()
  const xs = points.map((point) => point[0])
  const ys = points.map((point) => point[1])
  const left = Math.min(...xs)
  const top = Math.min(...ys)
  const boxW = Math.max(1, Math.max(...xs) - left)
  const boxH = Math.max(1, Math.max(...ys) - top)
  const source = coverSource(image, boxW, boxH)
  ctx.drawImage(image, source.sx, source.sy, source.sw, source.sh, left, top, boxW, boxH)
  if (face.shade < 0.99) {
    ctx.fillStyle = `rgba(12, 8, 20, ${1 - face.shade})`
    ctx.fill()
  }
  ctx.restore()
}

const FLAT_FACE = { kind: 'hex', shade: 1 }

export const HEX_PACK = 0.98
export const ORBIT_MS = 2000
export const SETTLE_MS = 500
// Open the photo while the rings are still orbiting. They return home after it appears.
export const POPUP_AT_MS = 1200
// One turn used to take 4.5s. 0.2 slower keeps the same path at 80% of that speed.
const ORBIT_PERIOD = 4500 / 0.8

function livePose(elapsed, settle, orbit) {
  const leanIn = smooth(Math.min(1, elapsed / 400))
  const held = 1 - settle
  return {
    tilt: orbit.tilt * leanIn * held,
    spin: orbit.spin * (elapsed / ORBIT_PERIOD) * held,
    lean: leanIn * held,
  }
}

const thumbs = new WeakMap()

function thumbFor(image) {
  if (!image?.complete || !image.naturalWidth) return image
  const cached = thumbs.get(image)
  if (cached) return cached
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  const source = coverSource(image, size, size)
  context.drawImage(image, source.sx, source.sy, source.sw, source.sh, 0, 0, size, size)
  thumbs.set(image, canvas)
  return canvas
}

export function warmWheelThumbs(images, start, count) {
  const end = Math.min(images.length, start + count)
  for (let index = start; index < end; index += 1) thumbFor(images[index])
  return end
}

// Flat hexes ride the armillary hoops, then settle home.
export function drawWheel(ctx, {
  elapsed,
  settle,
  tiles,
  images,
  hexSize,
  width,
  height,
  originX,
  originY,
}) {
  const fit = (hexSize * HEX_PACK) / FLAT_HEX_WIDTH
  const poses = ORBITS.map((orbit) => livePose(elapsed, settle, orbit))
  const drawList = []

  tiles.forEach((tile, index) => {
    const orbit = ORBITS[(tile.ring - 1) % ORBITS.length]
    const pose = poses[(tile.ring - 1) % ORBITS.length]
    const image = images[index]
    const normal = orientRing([0, 0, 1], pose.spin, orbit.axis, pose.tilt, pose.lean)
    if (normal[2] <= 0.05) return
    const homeX = tile.x * hexSize
    const homeY = tile.y * hexSize
    const world = FRONT_HEX.vertices.map((vertex) => {
      const point = [vertex[0] * fit + homeX, vertex[1] * fit + homeY, vertex[2] * fit]
      return orientRing(point, pose.spin, orbit.axis, pose.tilt, pose.lean)
    })
    const depth = world.reduce((sum, point) => sum + point[2], 0) / world.length
    drawList.push({
      face: FLAT_FACE,
      image,
      alpha: 0.55 + 0.45 * Math.min(1, normal[2]),
      depth,
      points: world.map((point) => project(point, originX, originY)),
    })
  })

  drawList.sort((a, b) => a.depth - b.depth)
  ctx.clearRect(0, 0, width, height)
  drawList.forEach((item) => paintFace(ctx, item.face, item.points, thumbFor(item.image), item.alpha))
}

export const SOLO_STAGE_MS = 800
export const SOLO_MS = SOLO_STAGE_MS * 3

const FRONT_HEX = OCTAHEDRON_FACES.find((face) => face.front)
  || OCTAHEDRON_FACES.find((face) => face.kind === 'hex')

const FLAT_HEX_WIDTH = (() => {
  let minX = Infinity
  let maxX = -Infinity
  FRONT_HEX.vertices.forEach((vertex) => {
    const scale = PERSPECTIVE / (PERSPECTIVE - vertex[2] || 0.001)
    const x = vertex[0] * scale
    if (x < minX) minX = x
    if (x > maxX) maxX = x
  })
  return Math.max(1, maxX - minX)
})()

function projectedFrontHeight(scale) {
  let minY = Infinity
  let maxY = -Infinity
  FRONT_HEX.vertices.forEach((vertex) => {
    const point = project([vertex[0] * scale, vertex[1] * scale, vertex[2] * scale], 0, 0)
    if (point[1] < minY) minY = point[1]
    if (point[1] > maxY) maxY = point[1]
  })
  return Math.max(1, maxY - minY)
}

function scaleForHeight(target) {
  let scale = target / projectedFrontHeight(1)
  scale *= target / projectedFrontHeight(scale)
  return scale
}

/** One solid tumbles in place, grows to the middle, then opens and fades. */
export function drawSolo(ctx, { t, image, cellHeight, originX, originY, width, height }) {
  const grow = t <= 1 / 3 ? 0 : t >= 2 / 3 ? 1 : smooth((t - 1 / 3) / (1 / 3))
  const open = t <= 2 / 3 ? 0 : Math.min(1, (t - 2 / 3) / (1 / 3))
  const travel = t <= 2 / 3 ? t / (2 / 3) : 1
  const spin = smooth(travel)
  const startScale = scaleForHeight(cellHeight)
  const targetScale = scaleForHeight(Math.min(width * 0.86, (height - 52) * 0.72))
  const scale = startScale + (targetScale - startScale) * grow
  const cx = originX + (width / 2 - originX) * grow
  const cy = originY + (height / 2 - originY) * grow
  const angles = { x: spin * 260, y: spin * 480, z: spin * 36 }
  const alpha = 1 - smooth(open)
  const burst = 28 * scale * smooth(open)
  const drawList = []

  ctx.clearRect(0, 0, width, height)
  if (alpha <= 0.01) return

  OCTAHEDRON_FACES.forEach((face) => {
    if (face.kind !== 'hex') return
    const normal = applyTumble(face.normal, angles)
    if (normal[2] <= 0.04) return
    const world = face.vertices.map((vertex) => {
      let point = applyTumble(
        [vertex[0] * scale, vertex[1] * scale, vertex[2] * scale],
        angles,
      )
      if (burst) {
        point = [
          point[0] + normal[0] * burst,
          point[1] + normal[1] * burst,
          point[2] + normal[2] * burst,
        ]
      }
      return point
    })
    const depth = world.reduce((sum, point) => sum + point[2], 0) / world.length
    drawList.push({
      face,
      image,
      alpha: alpha * (0.55 + 0.45 * Math.min(1, normal[2])),
      depth,
      points: world.map((point) => project(point, cx, cy)),
    })
  })

  drawList.sort((a, b) => a.depth - b.depth)
  drawList.forEach((item) => paintFace(ctx, item.face, item.points, item.image, item.alpha))
}
