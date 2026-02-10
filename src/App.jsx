import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [noMessage, setNoMessage] = useState('')
  const [showVictory, setShowVictory] = useState(false)
  const [hearts, setHearts] = useState([])
  const [noAttempts, setNoAttempts] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showFinalPrize, setShowFinalPrize] = useState(false)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const noButtonRef = useRef(null)
  const containerRef = useRef(null)

  const quizQuestions = [
    {
      question: "Ray nasconde 4 calzini il lunedì e 3 il martedì. Ma mercoledì Roberto ne trova 2. Quanti calzini mancano ancora? 🧦",
      options: ["5 calzini", "7 calzini", "9 calzini", "Tutti quelli di Roberto!"],
      correct: 0
    },
    {
      question: "Belle e Ray salgono sulla bilancia INSIEME. Quanto pesa la bilancia? ⚖️",
      options: ["50kg", "Niente, la bilancia non pesa!", "40kg", "10kg"],
      correct: 1
    },
    {
      question: "Da Gallone servono a Elide UN piatto vegetariano. Quanti piatti ha mangiato Elide? 🥗",
      options: ["0, servire non è mangiare!", "1 piatto", "2 piatti", "Dipende dalla fame!"],
      correct: 0
    },
    {
      question: "Roberto ordina pasta al formaggino (8€). Belle ne ruba metà, Roberto la ricompra (8€) e Belle la ruba DI NUOVO. Quanto ha speso totale? 💰",
      options: ["24€", "16€", "12€", "Troppo per una peste come Belle!"],
      correct: 0
    },
    {
      question: "Efrem fa 2000 passi, Ester il 120% di Efrem, Elide il 90% di Ester. Quanti passi fa Elide? 👟",
      options: ["2.160 passi", "2.000 passi", "1.800 passi", "Meno di tutti!"],
      correct: 0
    },
    {
      question: "I 9 gatti mangiano 15 croccantini/giorno. Dopo 7 giorni, quanti ne hanno mangiati? Ma Birba ne nasconde 45 sotto il divano! Quanti effettivamente mangiati? 🐱",
      options: ["900 croccantini", "945 croccantini", "855 croccantini", "Birba è un ladro!"],
      correct: 0
    },
    {
      question: "Elide cade dalla canoa 4 volte ma ricade SEMPRE sulla canoa. Quante volte si è bagnata completamente? 🛶",
      options: ["4 volte", "1 volta", "Mai, cadeva sulla canoa!", "Tutte le volte!"],
      correct: 2
    },
    {
      question: "Sul campo di calciobalilla umano c'erano 10 giocatori per squadra in 2 squadre. Se il campo è lungo 30m e ogni squadra occupa lo stesso spazio, quanti metri per squadra? ⚽",
      options: ["10 metri", "15 metri", "20 metri", "30 metri"],
      correct: 1
    },
    {
      question: "Roberto compra 9 regali per i gatti (7€ l'uno). Belle ne mangia 6. Quanto valgono i regali rimasti? 💸",
      options: ["21€", "42€", "63€", "Niente, Belle li mangia tutti!"],
      correct: 0
    },
    {
      question: "Da Roberto a Gallone sono 5km. Va da solo (andata), torna con Elide (ritorno), poi tornano insieme (andata). Quanti km totali? 🗺️",
      options: ["10km", "15km", "20km", "Troppi!"],
      correct: 1
    },
    {
      question: "Micia, Lea e Romeo dormono 16h/giorno (3 gatti = 48h). Gli altri 6 gatti il 75% (12h x 6 = 72h). Totale ore di sonno? 😴🐱",
      options: ["120 ore", "108 ore", "96 ore", "Troppo!"],
      correct: 0
    },
    {
      question: "Gallone: 2 antipasti (12€), 2 primi (30€), 2 dolci (14€), prosecco (18€) = 74€. Con mancia 12%, quanto paga Roberto? 💳",
      options: ["82,88€", "84€", "86,88€", "Troppo!"],
      correct: 0
    },
    {
      question: "Il gruppo di camminata lenta parte alle 18:00. Elide arriva 15 minuti prima, Efrem 10 minuti dopo Elide, Ester 5 minuti dopo Efrem. A che ora arriva Ester? ⏰",
      options: ["17:50", "18:00", "18:10", "Sempre in ritardo!"],
      correct: 1
    },
    {
      question: "Roberto ha paura del pesce. Belle vede 3 pesci in spiaggia, Ray ne trova altri 2. Quanti pesci ha visto Roberto prima di scappare urlando? 🐟😱",
      options: ["5 pesci", "3 pesci", "0, era già scappato!", "Troppi!"],
      correct: 2
    },
    {
      question: "Belle (40kg) mangia 3% del peso al giorno = 1200g. Ray (10kg) mangia 3% = 300g. In una settimana entrambi? 🦮🐕",
      options: ["10.500 grammi", "7.350 grammi", "3.500 grammi", "Una tonnellata!"],
      correct: 0
    }
  ]

  const messages = [
    "Elide, ci stai provando davvero? 🤔",
    "Roberto sta piangendo 😢",
    "Ma dai, non farmi questo! 😤",
    "Elide pensaci bene... 🥺",
    "Il mio cuore si sta spezzando 💔",
    "Sto chiamando tua madre 📱",
    "Belle ti sta guardando delusa 🦮💔",
    "Il bottone Sì sta diventando più grande... 👀",
    "ELIDE. PER. FAVOREEE. 😱",
    "Roberto.exe ha smesso di funzionare 💻",
    "Guarda quanto è grande il Sì ormai! 😏",
    "Questa è violenza psicologica 🚨",
    "Ho già prenotato da Gallone! 🍝",
    "Sto per morire di tristezza ⚰️",
    "Ray sta abbaiando per la disperazione 🐕😭",
    "Anche Belle ha smesso di scodinzolare 🦮😔",
    "Da Gallone stanno preparando il menù vegetariano... 🥗",
    "Stai facendo piangere gli angeli 👼😭",
    "Ray e Belle hanno smesso di giocare insieme 🐕🦮💔",
    "Anche Alexa dice che sei cattiva 🔊",
    "Il bottone No sta sudando dalla paura 😰",
    "Google Maps sta cancellando la strada per Tricase 🗺️",
    "I passerotti hanno smesso di cantare 🐦💔",
    "Sto scrivendo il mio testamento ✍️",
    "Le stelle si stanno nascondendo 🌟😔",
    "Da Gallone hanno già buttato via il prosecco 🍾",
    "Anche la mozzarella vegetariana si sta sciogliendo per la tristezza 🧀😢",
    "Il Sole sta chiamando in malattia domani ☀️😷",
    "Ray ha nascosto tutti i miei calzini per vendetta 🧦😤",
    "Belle ti sta giudicando con quegli occhioni 🦮👀",
    "La Gioconda ha appena smesso di sorridere 🖼️",
    "Spotify sta mettendo solo canzoni tristi 🎵😭",
    "Ray sta facendo finta di essere morto per il dramma 🐕💀",
    "Belle ha preso il suo giocattolo preferito ed è andata via 🦮🎾",
    "SONO 35 TENTATIVI ELIDE! Da Gallone ci aspettano! 🔥😤"
  ]

  const moveNoButton = () => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const buttonWidth = 120
    const buttonHeight = 50

    // Calcola il range sicuro per mantenere il bottone sempre visibile
    const maxX = containerRect.width - buttonWidth - 60
    const maxY = containerRect.height - buttonHeight - 60
    
    // Genera posizioni random ma sempre all'interno dello schermo
    const newX = (Math.random() - 0.5) * Math.min(maxX, containerRect.width * 0.6)
    const newY = (Math.random() - 0.5) * Math.min(maxY, containerRect.height * 0.5)

    setNoPosition({ x: newX, y: newY })
    
    const newAttempts = noAttempts + 1
    setNoAttempts(newAttempts)
    setYesSize(1 + (newAttempts * 0.15))
    
    const messageIndex = Math.min(newAttempts - 1, messages.length - 1)
    setNoMessage(messages[messageIndex])
  }

  const checkDistance = (clientX, clientY) => {
    const button = noButtonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    const distance = Math.sqrt(
      Math.pow(clientX - buttonCenterX, 2) + 
      Math.pow(clientY - buttonCenterY, 2)
    )

    if (distance < 50) {
      moveNoButton()
    }
  }

  useEffect(() => {
    if (showVictory) return

    const handleMouseMove = (e) => {
      checkDistance(e.clientX, e.clientY)
    }

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        checkDistance(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [noPosition, showVictory])

  const handleYesClick = () => {
    setShowVictory(true)
    
    const heartsCount = 30 + (noAttempts * 5)
    const newHearts = []
    for (let i = 0; i < heartsCount; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      })
    }
    setHearts(newHearts)
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
  }

  const handleRestart = () => {
    setShowVictory(false)
    setNoPosition({ x: 0, y: 0 })
    setNoMessage('')
    setHearts([])
    setNoAttempts(0)
    setYesSize(1)
    setShowQuiz(false)
    setCurrentQuestion(0)
    setScore(0)
    setShowFinalPrize(false)
    setWrongAnswer(false)
  }

  const handleQuizAnswer = (selectedIndex) => {
    const currentQ = quizQuestions[currentQuestion]
    
    if (selectedIndex === currentQ.correct) {
      setScore(score + 1)
    }
    
    // Vai sempre avanti, anche se sbaglia
    setWrongAnswer(selectedIndex !== currentQ.correct)
    
    setTimeout(() => {
      setWrongAnswer(false)
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Quiz completato!
        setShowFinalPrize(true)
      }
    }, 800)
  }

  const getVictoryMessage = () => {
    if (noAttempts === 0) {
      return "WOW! Risposta immediata! Elide ti amo da morire! Belle e Ray possono festeggiare! 😍🦮🐕"
    } else if (noAttempts <= 3) {
      return "Hai fatto solo finta di pensarci! Ti amo Elide 💕 Ray e Belle approvano!"
    } else if (noAttempts <= 7) {
      return `Dopo ${noAttempts} tentativi di scappare... ma alla fine hai ceduto! 😏💖 Belle è fiera di te!`
    } else if (noAttempts <= 15) {
      return `${noAttempts} TENTATIVI?! Elide sei cattivissima! Ma ti amo lo stesso (Ray è ancora traumatizzato) 🐕💔❤️`
    } else {
      return `${noAttempts} TENTATIVI?! Sei una torturatrice! Ma ti amo comunque! ❤️ Ray e Belle ti perdonano... forse 🦮🐕`
    }
  }

  if (showVictory) {
    // Mostra il premio finale dopo il quiz
    if (showFinalPrize) {
      const perfectScore = score === quizQuestions.length
      
      const getScoreMessage = () => {
        if (perfectScore) {
          return "PERFETTO! SEI UN GENIO! 🏆🎉"
        } else if (score >= 11) {
          return "⚠️ ERRORE DI SISTEMA ⚠️"
        } else if (score >= 6) {
          return "Bene dai! 😊"
        } else {
          return "Ehm... 😅"
        }
      }
      
      const getScoreDescription = () => {
        if (perfectScore) {
          return `Hai risposto a tutte le ${quizQuestions.length} domande correttamente! Il tuo amore è perfetto! Non ci posso credere! 😍`
        } else if (score >= 11) {
          return `ATTENZIONE: Il sistema non era programmato per gestire ${score} risposte corrette su ${quizQuestions.length}. Il tuo amore è oltre ogni aspettativa! Non dovevi amarmi così tanto! 😱🔴`
        } else if (score >= 6) {
          return `${score} su ${quizQuestions.length}... Il tuo amore è quello che mi aspettavo! Mi ami abbastanza! 😏`
        } else {
          return `Solo ${score} su ${quizQuestions.length}? Elide... Il tuo amore ha bisogno di essere dimostrato meglio! Mi devi fare dei massaggi! 😂💆‍♂️`
        }
      }
      
      // Stile speciale per errore 11-14
      const isError = score >= 11 && !perfectScore
      
      return (
        <div className={`app victory ${isError ? 'error-mode' : ''}`}>
          <div className="victory-content">
            <h1 className="victory-title">
              {getScoreMessage()}
            </h1>
            <p className="victory-message">
              {getScoreDescription()}
            </p>
            <div className="final-prize">
              <h2>💖 Livello del tuo amore 💖</h2>
              <p className="prize-reveal">
                {score >= 6 
                  ? "Il tuo amore è dimostrato! Ti meriti: una cena romantica da Gallone a Tricase che ti pagherò io, mille baci, coccole infinite e un Roberto (con Ray) che ti amerà per sempre! 💖🐕"
                  : "Il tuo amore è... migliorabile! Ma ti meriti comunque: una cena romantica da Gallone a Tricase che ti pagherò io (però paghi TU il dolce dopo questa performance! 😂), mille baci, coccole infinite e un Roberto (con Ray) che ti amerà per sempre! 💖🐕"
                }
              </p>
            </div>
            <button className="restart-button" onClick={handleRestart}>
              Ricomincia tutto 😈
            </button>
          </div>
        </div>
      )
    }

    // Mostra i quiz
    if (showQuiz) {
      const currentQ = quizQuestions[currentQuestion]
      return (
        <div className="app victory">
          <div className="quiz-content">
            <div className="quiz-header">
              <h2>🎮 QUIZ TIME! 🎮</h2>
              <p className="quiz-subtitle">
                Rispondi correttamente per dimostrare quanto mi ami!
              </p>
              <div className="quiz-progress">
                Domanda {currentQuestion + 1} di {quizQuestions.length}
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="quiz-question">
              <h3>{currentQ.question}</h3>
              <div className="quiz-options">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    className={`quiz-option ${wrongAnswer && index !== currentQ.correct ? 'wrong' : ''}`}
                    onClick={() => handleQuizAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {wrongAnswer && (
                <p className="wrong-message">❌ Riprova! Elide, lo dovresti sapere! 😏</p>
              )}
            </div>
            
            <div className="quiz-score">
              Punteggio: {score} / {quizQuestions.length}
            </div>
          </div>
        </div>
      )
    }

    // Schermata di vittoria iniziale
    return (
      <div className="app victory">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`
            }}
          >
            ❤️
          </div>
        ))}
        <div className="victory-content">
          <h1 className="victory-title">YESS! 🎉</h1>
          <p className="victory-message">
            {getVictoryMessage()}
          </p>
          {noAttempts > 5 && (
            <p className="victory-stats">
              📊 Statistica: Hai torturato Roberto {noAttempts} volte prima di dire sì
            </p>
          )}
          <p className="victory-subtitle">
            Ma aspetta... devi dimostrare il tuo amore rispondendo al QUIZ! 💕
          </p>
          <button className="start-quiz-button" onClick={handleStartQuiz}>
            Dimostra il tuo amore! 🚀
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app" ref={containerRef}>
      <div className="content">
        <h1 className="question">Elide, mi ami? 💕</h1>
        <p className="subtitle">~ Roberto ti sta aspettando ~</p>
        
        <div className="buttons-container">
          <button 
            className="yes-button" 
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesSize})`,
            }}
          >
            Sì ❤️
          </button>
          
          <button
            ref={noButtonRef}
            className="no-button"
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            }}
          >
            No
          </button>
        </div>

        {noAttempts > 0 && (
          <div className="attempts-counter">
            Tentativi di dire no: {noAttempts} 😏
          </div>
        )}

        {noMessage && (
          <p className="no-message">{noMessage}</p>
        )}
      </div>
    </div>
  )
}

export default App
