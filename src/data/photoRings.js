export function ringCounts(total) {
  if (total <= 0) return []
  const rings = total < 8 ? 1 : total < 20 ? 2 : total < 40 ? 3 : 4
  const delta = 8
  const span = (rings * (rings - 1)) / 2
  const base = Math.max(3, Math.round((total - delta * span) / rings))
  const counts = Array.from({ length: rings }, (_, index) => base + index * delta)
  let used = counts.reduce((sum, count) => sum + count, 0)
  let index = counts.length - 1
  while (used > total) {
    if (counts[index] > 1) {
      counts[index] -= 1
      used -= 1
    }
    index = (index - 1 + counts.length) % counts.length
  }
  index = counts.length - 1
  while (used < total) {
    counts[index] += 1
    used += 1
    index = (index - 1 + counts.length) % counts.length
  }
  return counts.filter((count) => count > 0)
}
