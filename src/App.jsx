import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [isVictory, setIsVictory] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 })
  const [noMessage, setNoMessage] = useState('')
  const [noMessageIndex, setNoMessageIndex] = useState(0)
  const noButtonRef = useRef(null)

  const ironicMessages = [
    "Dai… davvero?",
    "Non vale!",
    "Ripensaci!",
    "Ma dai...",
    "Non essere così!",
    "Sei sicuro/a?",
    "Ancora no?",
    "Impossibile!"
  ]

  const handleYesClick = () => {
    setIsVictory(true)
  }

  const handleNoHover = (e) => {
    const button = e.currentTarget
    const container = button.parentElement
    const containerRect = container.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()

    // Calculate safe boundaries for the button
    const maxX = containerRect.width - buttonRect.width - 20
    const maxY = containerRect.height - buttonRect.height - 20

    // Generate random position
    const randomX = Math.random() * maxX
    const randomY = Math.random() * maxY

    setNoButtonPosition({ top: randomY, left: randomX })
    
    // Show ironic message
    setNoMessage(ironicMessages[noMessageIndex])
    setNoMessageIndex((noMessageIndex + 1) % ironicMessages.length)
    
    // Hide message after 2 seconds
    setTimeout(() => setNoMessage(''), 2000)
  }

  const handleRestart = () => {
    setIsVictory(false)
    setNoButtonPosition({ top: 0, left: 0 })
    setNoMessage('')
    setNoMessageIndex(0)
  }

  if (isVictory) {
    return (
      <div className="app victory">
        <div className="hearts-animation">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="heart" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}>❤️</div>
          ))}
        </div>
        <div className="confetti-animation">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#ff6b9d', '#c06c84', '#f67280', '#f8b195', '#ffd3b6'][Math.floor(Math.random() * 5)],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="victory-content">
          <h1 className="victory-title">🎉 Perfetto! 🎉</h1>
          <p className="victory-message">
            Hai vinto una cena, mille baci e un fidanzato rompiscatole per sempre 💖
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Ricomincia ❤️
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="content">
        <h1 className="title">Mi ami?</h1>
        
        {noMessage && (
          <div className="ironic-message">{noMessage}</div>
        )}

        <div className="buttons-container">
          <button className="yes-button" onClick={handleYesClick}>
            Sì ❤️
          </button>
          
          <button
            ref={noButtonRef}
            className="no-button"
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            style={{
              position: noButtonPosition.top || noButtonPosition.left ? 'absolute' : 'relative',
              top: noButtonPosition.top ? `${noButtonPosition.top}px` : 'auto',
              left: noButtonPosition.left ? `${noButtonPosition.left}px` : 'auto',
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
