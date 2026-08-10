import { useRef, useState } from 'react'
import './MakeupFxScreen.css'
import StatusBar from '../components/StatusBar'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import PortfolioMagazine from '../components/PortfolioMagazine'
import AnimatedTitle from '../components/AnimatedTitle'
import WatercolorBrush from '../components/WatercolorBrush'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'

const MUA_SFX_PAGES = Array.from({ length: 18 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return publicUrl(`portfolios/mua/${n}.png`)
})

const MUA_FASHION_PAGES = Array.from({ length: 13 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  // Page 11 reuses mua/12.png (mua-fashion/11.png removed)
  if (n === '11') return publicUrl('portfolios/mua/12.png')
  return publicUrl(`portfolios/mua-fashion/${n}.png`)
})

const PORTFOLIO_PAGES = {
  sfx: MUA_SFX_PAGES,
  fashion: MUA_FASHION_PAGES,
}

/** Single cover image per portfolio button — set when assets are ready */
const MOSAIC_IMAGES = {
  sfx: publicUrl('portfolios/mua/02.png'),
  fashion: publicUrl('portfolios/mua/03.png'),
}

const MOSAIC_KEYS = ['sfx', 'fashion']

export default function MakeupFxScreen({ onNavigate }) {
  const { t } = useI18n()
  const screenRef = useRef(null)
  const [openPortfolio, setOpenPortfolio] = useState(null)

  const openPages = openPortfolio ? PORTFOLIO_PAGES[openPortfolio] : []
  const openTitle = openPortfolio ? t(`makeupFx.mosaics.${openPortfolio}`) : ''

  return (
    <div ref={screenRef} className="screen makeup-fx-screen">
      <div className="makeup-fx-screen__brush" aria-hidden="true">
        <WatercolorBrush containerRef={screenRef} variant="paint" />
      </div>

      <StatusBar />

      <main className="makeup-fx-screen__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={t('makeupFx.navCrumb')}
        />

        <section
          className="makeup-fx-screen__intro"
          aria-label={t('makeupFx.title').replace(/\n/g, ' ')}
        >
          <h1 className="makeup-fx-screen__title">{t('makeupFx.title')}</h1>
          <p className="makeup-fx-screen__body">{t('makeupFx.body')}</p>
          <p className="makeup-fx-screen__body makeup-fx-screen__body--expertise">
            {t('makeupFx.expertise')}
          </p>
        </section>

        <section
          className="makeup-fx-screen__portfolios"
          aria-label={t('makeupFx.portfolios')}
        >
          <div className="makeup-fx-screen__reel-wrap">
            <a
              href="https://www.omarcaloca.com/MAKEUP_FX.html"
              className="makeup-fx-screen__reel"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('makeupFx.reel')}
            </a>
          </div>

          <h2 className="makeup-fx-screen__subtitle">{t('makeupFx.portfolios')}</h2>

          <ul className="makeup-fx-screen__mosaic-grid">
            {MOSAIC_KEYS.map((key) => {
              const label = t(`makeupFx.mosaics.${key}`)
              const imageSrc = MOSAIC_IMAGES[key]

              return (
                <li key={key} className="makeup-fx-screen__mosaic-item">
                  <figure className="makeup-fx-screen__mosaic">
                    <button
                      type="button"
                      className={`makeup-fx-screen__mosaic-cover${imageSrc ? '' : ' makeup-fx-screen__mosaic-cover--empty'}`}
                      onClick={() => setOpenPortfolio(key)}
                      aria-label={`${t('makeupFx.explore')}: ${label}`}
                    >
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt=""
                          className={`makeup-fx-screen__mosaic-image makeup-fx-screen__mosaic-image--${key}`}
                        />
                      ) : null}
                    </button>
                    <figcaption className="makeup-fx-screen__mosaic-legend">
                      <AnimatedTitle className="makeup-fx-screen__mosaic-legend-title">
                        {label}
                      </AnimatedTitle>
                    </figcaption>
                  </figure>

                  <button
                    type="button"
                    className="makeup-fx-screen__explore"
                    onClick={() => setOpenPortfolio(key)}
                    aria-label={`${t('makeupFx.explore')}: ${label}`}
                  >
                    {t('makeupFx.explore')}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <Footer className="footer--in-flow" />
      </main>

      <PortfolioMagazine
        open={Boolean(openPortfolio)}
        pages={openPages}
        title={openTitle}
        onClose={() => setOpenPortfolio(null)}
      />
    </div>
  )
}
