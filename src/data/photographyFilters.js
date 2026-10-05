// Tumblr shows one tag at a time. A post with several tags appears under each
// of those tags. These labels are the menu the photography page uses; each one
// matches the blog tag of the same name. Arquitecture also includes the blog's
// "architecture" spelling. B&W matches the black-and-white tags used on the posts.
export const PHOTOGRAPHY_FILTERS = [
  { label: 'Portrait', tags: ['portrait photography'] },
  { label: 'People', tags: ['people photography'] },
  { label: 'Urban', tags: ['urban photography'] },
  { label: 'Arquitecture', tags: ['arquitecture photography', 'arquitecture', 'architecture photography', 'architecture'] },
  { label: 'B&W', tags: ['bw', 'bw photography', 'blackandwhite', 'b&w photography'] },
  { label: 'Nature', tags: ['nature photography'] },
  { label: 'Asia', tags: ['asia photography'] },
  { label: 'Japan', tags: ['japan photography'] },
  { label: 'Mexico City', tags: ['mexico city'] },
  { label: 'Florence Italy', tags: ['florence italy'] },
  { label: 'Landscape', tags: ['landscape photography'] },
  { label: 'Germany', tags: ['germany photography'] },
  { label: 'Denmark', tags: ['denmark photography'] },
  { label: 'Norway', tags: ['norway photography'] },
  { label: 'USA', tags: ['usa photography'] },
  { label: 'Niagara Falls', tags: ['niagara falls'] },
]

export function photoMatchesFilter(photo, filter) {
  if (!filter) return true
  const wanted = new Set(filter.tags.map((tag) => tag.toLowerCase()))
  return (photo.tags || []).some((tag) => wanted.has(tag.toLowerCase()))
}
