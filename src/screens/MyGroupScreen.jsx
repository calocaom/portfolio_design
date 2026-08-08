import './MyGroupScreen.css'
import StatusBar from '../components/StatusBar'
import Footer from '../components/Footer'
import { BACK_ARROW } from '../assets'

export default function MyGroupScreen({ onNavigate }) {
  return (
    <div className="screen my-group-screen">
      <StatusBar />
      <header className="my-group-screen__header">
        <button
          type="button"
          className="back-arrow"
          onClick={() => onNavigate('main')}
          aria-label="Back to main"
        >
          <img src={BACK_ARROW} alt="" className="back-arrow__img" />
        </button>
      </header>
      <main className="screen-content">
        <p className="screen-placeholder">My group screen</p>
      </main>
      <Footer />
    </div>
  )
}
