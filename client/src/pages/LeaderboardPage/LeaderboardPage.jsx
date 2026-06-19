import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import '@/styles/shared/Game.css'
import '@/styles/shared/Button.css'
import '@/styles/shared/Arcade.css'
import '@/pages/LeaderboardPage/LeaderboardPage.css'
import { getLeaderboard } from '@/api/leaderboard.js'
import { STRINGS } from '@/constants/strings.js'
import useUser from '@/hooks/useUser'

const RANK_STYLES = [
  { className: 'rank-gold', icon: '🥇' },
  { className: 'rank-silver', icon: '🥈' },
  { className: 'rank-bronze', icon: '🥉' },
]

const getRankDisplay = (index) => {
  if (index < 3) {
    return RANK_STYLES[index]
  }

  return { className: 'rank-default', icon: `${index + 1}.` }
}

const LeaderboardPage = () => {
  const { user } = useUser()
  const [scores, setScores] = useState([])
  const [error, setError] = useState('')
  const [userRank, setUserRank] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLeaderboard()
      .then((data) => {
        setScores(data.leaderboard)
        setUserRank(Number(data.currentUserRank))
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-light" role="status"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>
  }

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center p-2 overflow-hidden">
      <Card 
        className="bg-arcade-panel border-0 rounded-4 shadow-lg p-3 d-flex flex-column arcade-modal-card-full"
        style={{ minHeight: 0 }}
      >
        <Card.Body 
          className="d-flex flex-column align-items-center w-100 p-0 h-100"
          style={{ minHeight: 0 }}
        >
          <div className="text-center mb-3 flex-shrink-0">
            <h1 className="arcade-title fw-bold text-info mb-1 arcade-title-lg">
              {STRINGS.leaderboard.title}
            </h1>
            <p className="text-white-50 mb-0 arcade-subtitle">
              {STRINGS.leaderboard.description}
            </p>
          </div>

          <div 
            className="w-100 rounded-4 p-3 mb-4 flex-grow-1 d-flex flex-column arcade-inset-panel-scrollable"
            style={{ minHeight: 0 }}
          >
            <div className="d-flex justify-content-between px-3 pb-2 mb-2 border-bottom flex-shrink-0 arcade-section-divider">
              <span className="text-white-50 fw-bold text-center leaderboard-header-col-rank">
                {STRINGS.leaderboard.rank}
              </span>
              <span className="text-white-50 fw-bold text-start leaderboard-header-col-player">
                {STRINGS.leaderboard.player}
              </span>
              <span className="text-white-50 fw-bold text-end leaderboard-header-col-score">
                {STRINGS.leaderboard.score}
              </span>
            </div>

            {/* Scrollable panel */}
            <div 
              className="d-flex flex-column gap-2 pe-2 custom-scrollbar" 
              style={{ overflowY: 'auto', minHeight: 0 }}
            >
              {scores.map((score, index) => {
                const rank = index + 1
                const rankData = getRankDisplay(index)
                const isTop3 = index < 3
                const isCurrentUser = score.username === user.username
                const isHighlightedUser = isCurrentUser && rank === userRank

                const rowClasses = [
                  'd-flex justify-content-between align-items-center p-2 rounded-3 flex-shrink-0',
                  isTop3 ? 'leaderboard-row-top3' : '',
                  isHighlightedUser ? 'leaderboard-row-user' : '',
                  isTop3 ? 'leaderboard-row-bordered' : '',
                ].filter(Boolean).join(' ')

                return (
                  <div
                    key={`${score.username}-${index}`}
                    className={rowClasses}
                    style={{
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <span className={`fw-bold fs-4 text-center leaderboard-rank-cell ${rankData.className}`}>
                      {rankData.icon}
                    </span>

                    <span className={`fw-bold text-start text-white text-truncate px-2 leaderboard-player-cell ${isTop3 ? 'leaderboard-player-cell-top3' : 'leaderboard-player-cell-default'}`}>
                      {score.username}
                    </span>

                    <span className={`fw-bold text-end leaderboard-score-cell ${rankData.className} ${isTop3 ? 'leaderboard-score-cell-top3' : 'leaderboard-score-cell-default'}`}>
                      {score.bestScore} <span className="leaderboard-coin-icon">🪙</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <Button
            as={Link}
            to="/home"
            className="btn-arcade-login w-100 py-3 rounded-pill text-uppercase fw-bold shadow-sm flex-shrink-0 leaderboard-back-btn"
          >
            {STRINGS.leaderboard.back}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LeaderboardPage
