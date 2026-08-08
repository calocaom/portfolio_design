/**
 * App.jsx – Root component
 *
 * Controls which screen is shown and routes navigation IDs to screens.
 * home / works open MainPage and scroll to section.
 * about opens AboutScreen.
 * contact opens ContactScreen.
 * makeup-fx opens MakeupFxScreen.
 */

import { useState } from 'react'
import './App.css'
import MainPage from './screens/MainPage'
import AboutScreen from './screens/AboutScreen'
import ContactScreen from './screens/ContactScreen'
import MakeupFxScreen from './screens/MakeupFxScreen'
import CreateGroupScreen from './screens/CreateGroupScreen'
import MyGroupScreen from './screens/MyGroupScreen'

const MAIN_SECTION_IDS = new Set(['home', 'works'])

const ROUTE_MAP = {
  start: 'main',
  main: 'main',
  'create-group': 'create-group',
  'my-group': 'my-group',
  'makeup-fx': 'makeup-fx',
}

export default function App() {
  const [screen, setScreen] = useState('main')
  const [pendingScroll, setPendingScroll] = useState(null)

  function handleNavigate(target) {
    if (target === 'contact') {
      setScreen('contact')
      setPendingScroll(null)
      return
    }

    if (target === 'about') {
      setScreen('about')
      setPendingScroll(null)
      return
    }

    if (target === 'makeup-fx') {
      setScreen('makeup-fx')
      setPendingScroll(null)
      return
    }

    if (MAIN_SECTION_IDS.has(target)) {
      setScreen('main')
      setPendingScroll(target)
      return
    }

    setScreen(ROUTE_MAP[target] ?? target)
  }

  return (
    <div className="phone-frame">
      {screen === 'main' && (
        <MainPage
          onNavigate={handleNavigate}
          pendingScroll={pendingScroll}
          onPendingScrollDone={() => setPendingScroll(null)}
        />
      )}

      {screen === 'about' && (
        <AboutScreen onNavigate={handleNavigate} />
      )}

      {screen === 'contact' && (
        <ContactScreen onNavigate={handleNavigate} />
      )}

      {screen === 'makeup-fx' && (
        <MakeupFxScreen onNavigate={handleNavigate} />
      )}

      {screen === 'create-group' && (
        <CreateGroupScreen onNavigate={handleNavigate} />
      )}

      {screen === 'my-group' && (
        <MyGroupScreen onNavigate={handleNavigate} />
      )}
    </div>
  )
}
