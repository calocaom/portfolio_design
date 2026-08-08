import AnimatedSubheadline from './AnimatedSubheadline'
import './Header.css'
import { useI18n } from '../i18n/I18nContext'

export default function Header() {
  const { t } = useI18n()

  return (
    <header className="header">
      <h1 className="header__title">{t('header.name')}</h1>
      <AnimatedSubheadline variant="home" />
    </header>
  )
}
