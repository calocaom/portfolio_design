/**
 * App.jsx – Root component
 *
 * Portfolio website: routes nav targets to pages.
 * home / works open MainPage and scroll to section.
 * about, contact, makeup-fx, digital-solutions, digital-cphfw, digital-yoga, ux-ui, botanical, and yoga open their pages.
 * Hash routes (e.g. #yoga) open a page on load / new tab and drive browser history (back / forward).
 */

import { useEffect, useState } from 'react'
import './App.css'
import MainPage from './screens/MainPage'
import AboutScreen from './screens/AboutScreen'
import ContactScreen from './screens/ContactScreen'
import MakeupFxScreen from './screens/MakeupFxScreen'
import DigitalSolutionsScreen from './screens/DigitalSolutionsScreen'
import DigitalCphfw from './screens/DigitalCphfw'
import DigitalYoga from './screens/DigitalYoga'
import UxUiScreen from './screens/UxUiScreen'
import Botanical from './screens/Botanical'
import Yoga from './screens/Yoga'

const MAIN_SECTION_IDS = new Set(['home', 'works'])
const HASH_PAGES = new Set([
  'about',
  'contact',
  'makeup-fx',
  'digital-solutions',
  'digital-cphfw',
  'digital-yoga',
  'ux-ui',
  'botanical',
  'yoga',
])

function currentHashPage() {
  return window.location.hash.replace(/^#\/?/, '').split('/')[0] || ''
}

function pageFromHash() {
  const page = currentHashPage()
  if (!page || page === 'home' || page === 'works' || page === 'main') return 'main'
  if (HASH_PAGES.has(page)) return page
  return 'main'
}

function scrollTargetFromHash() {
  const page = currentHashPage()
  if (page === 'home' || page === 'works') return page
  return null
}

export default function App() {
  const [page, setPage] = useState(() => pageFromHash())
  const [pendingScroll, setPendingScroll] = useState(() => scrollTargetFromHash())

  useEffect(() => {
    function onHashChange() {
      setPage(pageFromHash())
      setPendingScroll(scrollTargetFromHash())
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function handleNavigate(target) {
    const nextHash = MAIN_SECTION_IDS.has(target)
      ? target
      : HASH_PAGES.has(target)
        ? target
        : target

    if (MAIN_SECTION_IDS.has(target)) {
      setPendingScroll(target)
    } else {
      setPendingScroll(null)
    }

    // Same hash: hashchange will not fire — update state directly (e.g. re-click Works).
    if (currentHashPage() === nextHash) {
      setPage(pageFromHash())
      return
    }

    // Assigning location.hash pushes a history entry in Chrome, Safari, Firefox, etc.
    window.location.hash = nextHash
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

      {page === 'digital-solutions' && (
        <DigitalSolutionsScreen onNavigate={handleNavigate} />
      )}

      {page === 'digital-cphfw' && (
        <DigitalCphfw onNavigate={handleNavigate} />
      )}

      {page === 'digital-yoga' && (
        <DigitalYoga onNavigate={handleNavigate} />
      )}

      {page === 'ux-ui' && (
        <UxUiScreen onNavigate={handleNavigate} />
      )}

      {page === 'botanical' && (
        <Botanical onNavigate={handleNavigate} />
      )}

      {page === 'yoga' && (
        <Yoga onNavigate={handleNavigate} />
      )}
    </div>
  )
}
