/**
 * App.jsx – Root component
 *
 * Portfolio website: routes nav targets to pages.
 * home / works open MainPage and scroll to section.
 * about, contact, and makeup-fx open their pages.
 */

import { useState } from 'react'
import './App.css'
import MainPage from './screens/MainPage'
import AboutScreen from './screens/AboutScreen'
import ContactScreen from './screens/ContactScreen'
import MakeupFxScreen from './screens/MakeupFxScreen'

const MAIN_SECTION_IDS = new Set(['home', 'works'])

export default function App() {
  const [page, setPage] = useState('main')
  const [pendingScroll, setPendingScroll] = useState(null)

  function handleNavigate(target) {
    if (target === 'contact') {
      setPage('contact')
      setPendingScroll(null)
      return
    }

    if (target === 'about') {
      setPage('about')
      setPendingScroll(null)
      return
    }

    if (target === 'makeup-fx') {
      setPage('makeup-fx')
      setPendingScroll(null)
      return
    }

    if (MAIN_SECTION_IDS.has(target)) {
      setPage('main')
      setPendingScroll(target)
      return
    }

    setPage(target)
  }

  return (
    <div className="site">
      {page === 'main' && (
        <MainPage
          onNavigate={handleNavigate}
          pendingScroll={pendingScroll}
          onPendingScrollDone={() => setPendingScroll(null)}
        />
      )}

      {page === 'about' && (
        <AboutScreen onNavigate={handleNavigate} />
      )}

      {page === 'contact' && (
        <ContactScreen onNavigate={handleNavigate} />
      )}

      {page === 'makeup-fx' && (
        <MakeupFxScreen onNavigate={handleNavigate} />
      )}
    </div>
  )
}
