import captions from './photographyPhotos.json'

const images = import.meta.glob('../assets/photography/*.jpg', {
  eager: true,
  import: 'default',
})

export const PHOTOGRAPHY_PHOTOS = captions.map((item) => {
  const match = Object.entries(images).find(([path]) => path.endsWith(`/${item.file}`))
  return {
    src: match?.[1],
    file: item.file,
    place: item.place,
    camera: item.camera,
    caption: item.caption || '',
    tags: item.tags || [],
  }
}).filter((photo) => photo.src)
