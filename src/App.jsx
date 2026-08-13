/**
 * App.jsx – Root component
 *
 * Portfolio website: routes nav targets to pages.
 * home / works open MainPage and scroll to section.
 * about, contact, makeup-fx, digital-solutions, digital-bla-sol, digital-yoga, ux-ui, botanical, and yoga open their pages.
 */

import { useState } from 'react'
import './App.css'
import MainPage from './screens/MainPage'
import AboutScreen from './screens/AboutScreen'
import ContactScreen from './screens/ContactScreen'
import MakeupFxScreen from './screens/MakeupFxScreen'
import DigitalSolutionsScreen from './screens/DigitalSolutionsScreen'
import DigitalBlaSol from './screens/DigitalBlaSol'
import DigitalYoga from './screens/DigitalYoga'
import UxUiScreen from './screens/UxUiScreen'
import Botanical from './screens/Botanical'
import Yoga from './screens/Yoga'

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

    if (target === 'digital-solutions') {
      setPage('digital-solutions')
      setPendingScroll(null)
      return
    }

    if (target === 'digital-bla-sol') {
      setPage('digital-bla-sol')
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

      {page === 'digital-bla-sol' && (
        <DigitalBlaSol onNavigate={handleNavigate} />
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
