import hues from './photographyHues.json'
import { PHOTOGRAPHY_FILTERS, photoMatchesFilter } from './photographyFilters'
import { ringCounts } from './photoRings'

const GREY_FILTER = PHOTOGRAPHY_FILTERS.find((item) => item.label === 'B&W')

function hueOf(photo) {
  const value = hues[photo.file]
  return typeof value === 'number' ? value : 0
}

function isGrey(photo) {
  return GREY_FILTER ? photoMatchesFilter(photo, GREY_FILTER) : false
}

function byFile(a, b) {
  return String(a.file).localeCompare(String(b.file), 'en')
}

function byRainbow(a, b) {
  const hueA = hueOf(a) > 345 ? hueOf(a) - 360 : hueOf(a)
  const hueB = hueOf(b) > 345 ? hueOf(b) - 360 : hueOf(b)
  if (hueA !== hueB) return hueA - hueB
  return byFile(a, b)
}

function takeEven(pool, count) {
  if (count >= pool.length) return { picked: pool.slice(), rest: [] }
  const used = new Set()
  const picked = []
  for (let index = 0; index < count; index += 1) {
    const slot = Math.min(pool.length - 1, Math.floor((index * pool.length) / count))
    used.add(slot)
    picked.push(pool[slot])
  }
  return {
    picked,
    rest: pool.filter((_, index) => !used.has(index)),
  }
}

export function arrangePhotosByHue(photos) {
  const sorted = [...photos].sort((a, b) => {
    const delta = hueOf(a) - hueOf(b)
    if (delta) return delta
    return String(a.file).localeCompare(String(b.file), 'en')
  })
  const counts = ringCounts(sorted.length)
  if (!counts.length) return []
  let pool = sorted
  const rings = new Array(counts.length)
  for (let ring = counts.length - 1; ring >= 0; ring -= 1) {
    const { picked, rest } = takeEven(pool, counts[ring])
    rings[ring] = picked
    pool = rest
  }
  return rings.flat()
}

/** Flat panel order: chromatic hues left to right, greyscale photos last. */
export function arrangePhotosForPanel(photos) {
  const color = []
  const grey = []
  photos.forEach((photo) => {
    if (isGrey(photo)) grey.push(photo)
    else color.push(photo)
  })
  color.sort(byRainbow)
  grey.sort(byFile)
  return color.concat(grey)
}
