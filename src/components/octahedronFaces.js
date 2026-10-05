// Truncated octahedron with vertices at the permutations of (0, ±1, ±2).
// The solid is oriented so one hexagon faces the camera and a vertex points up.
// SOLID_PX is the bounding diameter (vertex to opposite vertex) before CSS scales it.

export const SOLID_PX = 100
export const SOLID_DIAMETER = 0.94

const MODEL_RADIUS = Math.sqrt(5)
const UNIT = SOLID_PX / (2 * MODEL_RADIUS)
const BURST = 36

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

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

function mul(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s]
}

function norm(a) {
  const length = Math.hypot(a[0], a[1], a[2]) || 1
  return [a[0] / length, a[1] / length, a[2] / length]
}

function centroid(verts) {
  const sum = verts.reduce((acc, v) => add(acc, v), [0, 0, 0])
  return mul(sum, 1 / verts.length)
}

function rotateAroundAxis(v, axis, angle) {
  const k = norm(axis)
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const d = dot(k, v)
  const cr = cross(k, v)
  return [
    v[0] * c + cr[0] * s + k[0] * d * (1 - c),
    v[1] * c + cr[1] * s + k[1] * d * (1 - c),
    v[2] * c + cr[2] * s + k[2] * d * (1 - c),
  ]
}

function rotationFromTo(from, to) {
  const a = norm(from)
  const b = norm(to)
  const c = Math.max(-1, Math.min(1, dot(a, b)))
  const axis = cross(a, b)
  const s = Math.hypot(axis[0], axis[1], axis[2])
  if (s < 1e-8) {
    if (c > 0) return (v) => v
    const ortho = Math.abs(a[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]
    const ax = norm(cross(a, ortho))
    return (v) => rotateAroundAxis(v, ax, Math.PI)
  }
  const angle = Math.atan2(s, c)
  return (v) => rotateAroundAxis(v, axis, angle)
}

function newell(verts) {
  const n = [0, 0, 0]
  for (let i = 0; i < verts.length; i += 1) {
    const cur = verts[i]
    const next = verts[(i + 1) % verts.length]
    n[0] += (cur[1] - next[1]) * (cur[2] + next[2])
    n[1] += (cur[2] - next[2]) * (cur[0] + next[0])
    n[2] += (cur[0] - next[0]) * (cur[1] + next[1])
  }
  return norm(n)
}

function allVertices() {
  const perms = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ]
  const verts = []
  perms.forEach((perm) => {
    ;[1, -1].forEach((s1) => {
      ;[1, -1].forEach((s2) => {
        const src = [0, s1, s2 * 2]
        verts.push(perm.map((index) => src[index]))
      })
    })
  })
  return verts
}

function orderOutward(verts, outward) {
  const center = centroid(verts)
  const n = norm(outward)
  let ref = Math.abs(n[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]
  ref = norm(sub(ref, mul(n, dot(ref, n))))
  const bitangent = cross(n, ref)
  const ordered = [...verts].sort((a, b) => {
    const da = sub(a, center)
    const db = sub(b, center)
    return Math.atan2(dot(da, bitangent), dot(da, ref)) - Math.atan2(dot(db, bitangent), dot(db, ref))
  })
  if (dot(newell(ordered), n) < 0) ordered.reverse()
  return ordered
}

function rawFaces() {
  const faces = []
  for (let axis = 0; axis < 3; axis += 1) {
    const a = (axis + 1) % 3
    const b = (axis + 2) % 3
    ;[1, -1].forEach((sign) => {
      const pattern = [[1, 0], [0, 1], [-1, 0], [0, -1]]
      const verts = pattern.map(([pa, pb]) => {
        const v = [0, 0, 0]
        v[axis] = 2 * sign
        v[a] = pa
        v[b] = pb
        return v
      })
      faces.push({
        kind: 'square',
        verts: orderOutward(verts, verts[0].map((value, index) => (index === axis ? sign : 0))),
      })
    })
  }
  const vertices = allVertices()
  ;[1, -1].forEach((sx) => {
    ;[1, -1].forEach((sy) => {
      ;[1, -1].forEach((sz) => {
        const verts = vertices.filter((v) => Math.abs(sx * v[0] + sy * v[1] + sz * v[2] - 3) < 1e-6)
        faces.push({ kind: 'hex', verts: orderOutward(verts, [sx, sy, sz]) })
      })
    })
  })
  return faces
}

function alignFaces(faces) {
  const toCamera = rotationFromTo([1, 1, 1], [0, 0, 1])
  let mapped = faces.map((face) => ({ ...face, verts: face.verts.map(toCamera) }))
  const front = mapped.find((face) => face.kind === 'hex' && newell(face.verts)[2] > 0.9)
  const center = centroid(front.verts)
  const top = front.verts.reduce((best, v) => (v[1] > best[1] ? v : best), front.verts[0])
  const rel = sub(top, center)
  const angle = Math.atan2(rel[0], rel[1])
  const roll = (v) => rotateAroundAxis(v, [0, 0, 1], angle)
  mapped = mapped.map((face) => ({ ...face, verts: face.verts.map(roll) }))
  return mapped
}

function toCss(v) {
  return [v[0] * UNIT, -v[1] * UNIT, v[2] * UNIT]
}

function matrix3d(x, y, z, t) {
  const values = [
    x[0], x[1], x[2], 0,
    y[0], y[1], y[2], 0,
    z[0], z[1], z[2], 0,
    t[0], t[1], t[2], 1,
  ]
  return `matrix3d(${values.map((value) => Number(value.toFixed(4))).join(',')})`
}

function faceRecord(face, index) {
  const center = centroid(face.verts)
  const nModel = newell(face.verts)
  let upHint = [0, 1, 0]
  if (Math.abs(dot(nModel, upHint)) > 0.85) upHint = [1, 0, 0]
  const projected = norm(sub(upHint, mul(nModel, dot(upHint, nModel))))
  const photoUp = face.kind === 'square'
    ? norm(add(sub(face.verts[0], center), sub(face.verts[1], center)))
    : norm(sub(face.verts.reduce((best, v) => (
      dot(sub(v, center), projected) > dot(sub(best, center), projected) ? v : best
    ), face.verts[0]), center))
  const xModel = norm(cross(nModel, photoUp))
  const localY = mul(photoUp, -1)
  const xCss = [xModel[0], -xModel[1], xModel[2]]
  const yCss = [localY[0], -localY[1], localY[2]]
  const zCss = [nModel[0], -nModel[1], nModel[2]]
  const cCss = toCss(center)
  const radius = Math.hypot(...toCss(sub(face.verts[0], center)))
  const rest = `${matrix3d(xCss, yCss, zCss, cCss)} translate(-50%, -50%)`
  const openCenter = [
    cCss[0] + zCss[0] * BURST,
    cCss[1] + zCss[1] * BURST,
    cCss[2] + zCss[2] * BURST,
  ]
  const open = `${matrix3d(xCss, yCss, zCss, openCenter)} translate(-50%, -50%)`
  const front = face.kind === 'hex' && nModel[2] > 0.9
  const width = face.kind === 'hex' ? Math.sqrt(3) * radius : radius * Math.SQRT2
  const height = face.kind === 'hex' ? radius * 2 : radius * Math.SQRT2
  const shade = face.kind === 'square' ? 1 : 0.7 + 0.3 * Math.max(0, zCss[2])
  const vertices = face.verts.map((vertex) => toCss(vertex).map((value) => Number(value.toFixed(3))))
  const normal = zCss.map((value) => Number(value.toFixed(4)))
  const locals = face.verts.map((vertex) => {
    const delta = sub(toCss(vertex), cCss)
    return [dot(delta, xCss), dot(delta, yCss)]
  })
  if (face.kind === 'hex') {
    const expected = [0, 60, 120, 180, 240, 300].map((deg) => {
      const rad = (deg * Math.PI) / 180
      return [Math.sin(rad) * radius, -Math.cos(rad) * radius]
    })
    locals.forEach((local) => {
      const nearest = Math.min(...expected.map((point) => Math.hypot(point[0] - local[0], point[1] - local[1])))
      if (nearest > 0.05) throw new Error(`hex vertex missed clip by ${nearest}`)
    })
  } else {
    const half = radius * Math.SQRT1_2
    locals.forEach((local) => {
      const nearest = Math.min(
        ...[[half, half], [half, -half], [-half, half], [-half, -half]].map((point) => (
          Math.hypot(point[0] - local[0], point[1] - local[1])
        )),
      )
      if (nearest > 0.05) throw new Error(`square vertex missed corner by ${nearest}`)
    })
  }
  return {
    id: `${face.kind}-${index}`,
    kind: face.kind,
    front,
    width,
    height,
    rest,
    open,
    shade,
    vertices,
    normal,
  }
}

export const OCTAHEDRON_FACES = alignFaces(rawFaces()).map(faceRecord)
