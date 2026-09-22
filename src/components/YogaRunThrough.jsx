import AnimatedTitle from './AnimatedTitle'
import RunThroughCarousel from './RunThroughCarousel'
import { useI18n } from '../i18n/I18nContext'

const slideModules = import.meta.glob(
  '../assets/ux-ui/yoga-runthrough-*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' },
)

function slideNumber(path) {
  const match = path.match(/(\d+)\.[a-z]+$/i)
  return match ? Number(match[1]) : 0
}

/** Landscape screens dropped in as yoga-runthrough-1.png, yoga-runthrough-2.jpg, and so on. */
export const YOGA_RUNTHROUGH_SLIDES = Object.keys(slideModules)
  .sort((a, b) => slideNumber(a) - slideNumber(b))
  .map((path) => slideModules[path])

export const hasYogaRunThrough = YOGA_RUNTHROUGH_SLIDES.length > 0

export default function YogaRunThrough() {
  const { dict, t } = useI18n()

  if (!hasYogaRunThrough) return null

  return (
    <section
      className="ux-case-study__run-through"
      aria-label={t('yoga.runThrough.aria')}
    >
      <AnimatedTitle className="ux-case-study__subtitle">
        {t('yoga.runThrough.title')}
      </AnimatedTitle>
      <RunThroughCarousel
        layout="landscape"
        slides={YOGA_RUNTHROUGH_SLIDES}
        legends={dict.yoga.runThrough?.legends ?? []}
        prevLabel={t('yoga.runThrough.prev')}
        nextLabel={t('yoga.runThrough.next')}
        label={t('yoga.runThrough.aria')}
      />
    </section>
  )
}
