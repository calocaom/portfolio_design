/**
 * App.jsx – Root component
 *
 * Portfolio website: routes nav targets to pages.
 * home / works open MainPage and scroll to section.
 * about, contact, makeup-fx, digital-solutions, digital-cphfw, digital-yoga, ux-ui, botanical, and yoga open their pages.
 * Hash routes (e.g. #yoga) open a page on load / new tab.
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

function pageFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const page = hash.split('/')[0]
  if (!page || page === 'home' || page === 'works' || page === 'main') return 'main'
  if (HASH_PAGES.has(page)) return page
  return 'main'
}

export default function App() {
  const [page, setPage] = useState(() => pageFromHash())
  const [pendingScroll, setPendingScroll] = useState(null)

  useEffect(() => {
    function onHashChange() {
      setPage(pageFromHash())
      setPendingScroll(null)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

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

    if (target === 'digital-solutions') {
      setPage('digital-solutions')
      setPendingScroll(null)
      return
    }

    if (target === 'digital-cphfw') {
      setPage('digital-cphfw')
      setPendingScroll(null)
      return
    }

    if (target === 'digital-yoga') {
      setPage('digital-yoga')
      setPendingScroll(null)
      return
    }

    if (target === 'ux-ui') {
      setPage('ux-ui')
      setPendingScroll(null)
      return
    }

    if (target === 'botanical') {
      setPage('botanical')
      setPendingScroll(null)
      return
    }

    if (target === 'yoga') {
      setPage('yoga')
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
