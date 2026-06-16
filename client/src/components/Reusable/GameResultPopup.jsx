import { Card, Button } from 'react-bootstrap'
import '../../css/Game.css'

import '../../css/Button.css'
import { STRINGS } from '../../constants/strings'

const GameResultPopup = ({ 
  show, 
  isVictory, 
  score, 
  isNewRecord, 
  message, 
  onClose 
}) => {
  if (!show) return null

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ 
        backgroundColor: "rgba(15, 10, 31, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 9999
      }}
    >

      <Card 
        className="bg-arcade-panel border-0 rounded-4 shadow-lg text-center p-4" 
        style={{ 
          maxWidth: '450px', 
          width: '90%', 
          borderTop: isVictory ? '4px solid #00D1FF' : '4px solid #FF3366' 
        }}
      >
        <Card.Body className="d-flex flex-column align-items-center">
          <h2 className={`arcade-title mb-3 fw-bold ${isVictory ? 'text-info' : 'text-danger'}`} style={{ fontSize: '2.5rem' }}>
            {isVictory ? STRINGS.game.result.victory : STRINGS.game.result.defeat}
          </h2>
          <p className="text-white-50 mb-4" style={{ fontSize: '1.1rem' }}>
            {message}
          </p>

          {isVictory && (
            <div className="mb-4 d-flex flex-column align-items-center w-100">
              <div className="bg-dark rounded-3 w-100 py-3 mb-2" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="text-white-50 d-block mb-1" style={{ fontSize: '0.9rem' }}>{STRINGS.game.result.finalScore}</span>
                <h1 className="text-warning display-4 fw-bold mb-0">
                  {score} <span style={{ fontSize: '2.5rem' }}>🪙</span>
                </h1>
              </div>

              {isNewRecord && (
                <div className="d-flex flex-column align-items-center mt-2">
                  <span className="badge bg-danger px-3 py-2 rounded-pill shadow mb-2 text-uppercase" style={{ letterSpacing: '1px' }}>
                    {STRINGS.game.result.newRecord}
                  </span>
                  <a href="/leaderboard" className="text-info text-decoration-none small fw-bold" style={{ textDecoration: 'underline !important' }}>
                    {STRINGS.game.result.leaderboard}
                  </a>
                </div>
              )}
            </div>
          )}

          <Button 
            className="btn-arcade-login w-100 mt-3 py-2"
            onClick={onClose}
            style={{ fontSize: '1.2rem' }}
          >
            {isVictory ? STRINGS.game.result.continue : STRINGS.game.result.tryAgain}
          </Button>
          
        </Card.Body>
      </Card>
    </div>
  )
}

export default GameResultPopup