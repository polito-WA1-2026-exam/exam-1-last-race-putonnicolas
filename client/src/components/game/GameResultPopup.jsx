import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import '@/styles/shared/Game.css'
import '@/styles/shared/Button.css'
import '@/styles/shared/Arcade.css'
import '@/components/game/GameResultPopup.css'
import { STRINGS } from '@/constants/strings'

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
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center arcade-overlay-light">
      <Card
        className={`bg-arcade-panel border-0 rounded-4 shadow-lg text-center p-4 arcade-modal-card-sm ${isVictory ? 'arcade-modal-card-victory' : 'arcade-modal-card-defeat'}`}
      >
        <Card.Body className="d-flex flex-column align-items-center">
          <h2 className={`arcade-title mb-3 fw-bold result-title ${isVictory ? 'text-info' : 'text-danger'}`}>
            {isVictory ? STRINGS.game.result.victory : STRINGS.game.result.defeat}
          </h2>
          <p className="text-white-50 mb-4 result-message">
            {message}
          </p>

          {isVictory && (
            <div className="mb-4 d-flex flex-column align-items-center w-100">
              <div className="rounded-4 p-4 mb-4 arcade-inset-panel">
                <p className="station-label text-uppercase mb-0 text-white-50 result-score-label">
                  {STRINGS.game.result.finalScore}
                </p>
                <h1 className="text-warning display-4 fw-bold mb-0">
                  {score} <span className="result-score-value">🪙</span>
                </h1>
              </div>

              {isNewRecord && (
                <div className="d-flex flex-column align-items-center mt-2">
                  <span className="badge bg-danger px-3 py-2 rounded-pill shadow mb-2 text-uppercase result-record-badge">
                    {STRINGS.game.result.newRecord}
                  </span>
                  <Link to="/leaderboard" className="text-info text-decoration-underline small fw-bold">
                    {STRINGS.game.result.leaderboard}
                  </Link>
                </div>
              )}
            </div>
          )}

          <Button
            className="btn-arcade-login w-100 mt-3 py-2 result-continue-btn"
            onClick={onClose}
          >
            {isVictory ? STRINGS.game.result.continue : STRINGS.game.result.tryAgain}
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default GameResultPopup
