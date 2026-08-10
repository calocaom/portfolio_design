/** Prefix a public/ path for GitHub Pages (or any Vite `base`). */
export function publicUrl(path) {
  const base = import.meta.env.BASE_URL || '/'
  const clean = String(path).replace(/^\/+/, '')
  return `${base}${clean}`
}
