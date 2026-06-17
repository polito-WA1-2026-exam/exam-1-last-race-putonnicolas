import { useEffect, useState, useCallback } from "react"
import MapRenderer from "@/components/game/MapRenderer.jsx"
import { getGameSetup, submitPath } from '@/api/game.js'
import { Card, Col, Container, Row, Button } from "react-bootstrap"
import Stations from "@/components/game/Stations.jsx"
import '@/styles/shared/Game.css'
import '@/styles/shared/Button.css'
import Timer from "@/components/game/Timer.jsx"
import SegmentList from "@/components/game/SegmentList.jsx"
import ChosenPath from "@/components/game/ChosenPath.jsx"
import { STRINGS } from "@/constants/strings.js"
import { GAME_PHASES } from "@/constants/gamePhases.js"
import GameResultPopup from "@/components/game/GameResultPopup.jsx"
import Events from "@/components/game/Events.jsx"

const GamePage = () => {
  const [gameData, setGameData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedSegments, setSelectedSegments] = useState([])
  const [gamePhase, setGamePhase] = useState(GAME_PHASES.SETUP)
  const [gameResult, setGameResult] = useState({
    journeySteps: null,
    show: false,
    isVictory: false,
    score: 0,
    message: '',
    isNewRecord: false
  })

  const handleSubmitPath = useCallback(() => {
    const routeArray = selectedSegments.length === 0 ? [] : [
      selectedSegments[0].station1Id,
      ...selectedSegments.map(segment => segment.station2Id)
    ]

    submitPath(routeArray)
      .then((result) => {
        setGameResult({
          show: true,
          journeySteps: result.journeySteps,
          isVictory: result.isValid,
          score: result.isValid ? result.finalScore : 0,
          isNewRecord: result.isValid ? result.isNewRecord : false,
          message: result.isValid
            ? STRINGS.game.validPath
            : STRINGS.game.unvalidPath
        })

        setGamePhase(result.isValid ? GAME_PHASES.EXECUTION : GAME_PHASES.RESULT)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [selectedSegments])

  const handleAddSegment = useCallback((segment) => {
    setSelectedSegments((prev) => [...prev, segment])
  }, [])

  const handleRemoveSegment = useCallback((segmentId) => {
    setSelectedSegments((prev) => prev.filter(s => s.id !== segmentId))
  }, [])

  const availableSegments = gameData
    ? gameData.network.segments.filter(s => {
      const isAlreadyUsed = selectedSegments.find(sel =>
        sel && (
          (sel.station1Id === s.station1Id && sel.station2Id === s.station2Id) ||
          (sel.station1Id === s.station2Id && sel.station2Id === s.station1Id)
        )
      )

      return !isAlreadyUsed
    })
    : []

  useEffect(() => {
    getGameSetup(true)
      .then((data) => {
        setGameData(data)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
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
    <Container fluid className="game-container h-100 w-100 flex-grow-1 d-flex flex-column p-2 overflow-hidden">
      {gamePhase === GAME_PHASES.PLANNING && (
        <Row className="mb-3 flex-shrink-0">
          <Col>
            <Card className="bg-arcade-panel border-0 rounded-4 shadow">
              <Card.Body className="p-2 d-flex flex-row align-items-center gap-3">
                <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                  <Card.Title className="arcade-title m-2 map-card-title">{STRINGS.game.path}</Card.Title>
                  <ChosenPath
                    segments={selectedSegments}
                    stations={gameData.network.stations}
                    onRemove={handleRemoveSegment}
                  />
                </div>

                <Button
                  className="btn-arcade-login d-flex align-items-center gap-2 flex-shrink-0"
                  onClick={handleSubmitPath}
                  disabled={selectedSegments.length === 0}
                >
                  <span>{STRINGS.game.submitPath}</span>
                  <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>➔</span>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row className={`overflow-hidden g-3 game-main-row ${gamePhase === GAME_PHASES.SETUP ? 'my-auto' : 'flex-grow-1'}`}>
        <Col lg={7} className="d-flex flex-column overflow-hidden map-column">
          <Card className="flex-grow-1 bg-arcade-panel border-0 rounded-4 shadow overflow-hidden map-card">
            <Card.Body className="p-2 d-flex flex-column overflow-hidden map-card-body">
              <MapRenderer network={gameData.network} startStation={gameData.startStation} endStation={gameData.endStation} showStartAndEnd={gamePhase !== GAME_PHASES.SETUP} showLines={gamePhase !== GAME_PHASES.PLANNING} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5} className="d-flex flex-column gap-3 overflow-hidden">
          {gamePhase === GAME_PHASES.PLANNING && (
            <>
              <div className="d-flex flex-row gap-2 flex-shrink-0">
                <Card className="bg-arcade-panel border-0 rounded-4 shadow flex-grow-1 overflow-hidden">
                  <Card.Body className="px-3 py-2 text-white d-flex align-items-center justify-content-center">
                    <Stations startStation={gameData.startStation} endStation={gameData.endStation} />
                  </Card.Body>
                </Card>
                <Card className="bg-arcade-panel border-0 rounded-4 shadow d-flex justify-content-center">
                  <Card.Body className="p-2 text-white d-flex align-items-center justify-content-center">
                    <Timer initialSeconds={90} onTimeUp={handleSubmitPath} />
                  </Card.Body>
                </Card>
              </div>

              <Card className="flex-grow-1 bg-arcade-panel border-0 rounded-4 shadow d-flex flex-column overflow-hidden segments-card">
                <Card.Body className="d-flex flex-column p-3 overflow-hidden segments-card-body">
                  <Card.Title className="arcade-title mb-3">{STRINGS.game.availableSegments}</Card.Title>

                  <div className="overflow-auto flex-grow-1 custom-scrollbar pe-2 segments-scroll-container">
                    <SegmentList segments={availableSegments} stations={gameData.network.stations} onAdd={handleAddSegment} />
                  </div>
                </Card.Body>
              </Card>
            </>
          )}
          {gamePhase === GAME_PHASES.SETUP && (
            <Card className="flex-grow-1 bg-arcade-panel border-0 rounded-4 shadow d-flex flex-column justify-content-center align-items-center p-4 text-center">
              <h2 className="arcade-title mb-4 setup-title">{STRINGS.game.readyToPlay}</h2>
              <p className="text-white-50 mb-5 setup-description">
                {STRINGS.game.readyToPlayDesc}
              </p>
              <Button
                className="btn-arcade-login px-5 py-3 setup-start-btn"
                onClick={() => setGamePhase(GAME_PHASES.PLANNING)}
              >
                {STRINGS.game.startGame}
              </Button>
            </Card>
          )}
        </Col>
      </Row>

      {gamePhase === GAME_PHASES.EXECUTION && (
        <Events
          journey={gameResult.journeySteps}
          onClose={() => setGamePhase(GAME_PHASES.RESULT)}
          stations={gameData.network.stations}
        />
      )}

      <GameResultPopup
        show={gamePhase === GAME_PHASES.RESULT}
        isVictory={gameResult.isVictory}
        score={gameResult.score}
        isNewRecord={gameResult.isNewRecord}
        message={gameResult.message}
        onClose={() => {
          setGamePhase(GAME_PHASES.SETUP)
          setSelectedSegments([])
          setLoading(true)
          setError('')

          getGameSetup(false)
            .then((newData) => {
              setGameData((prevData) => ({
                ...newData,
                network: prevData?.network || newData.network
              }))
            })
            .catch((err) => {
              const errorMessage = err?.message || 'Failed to load new game setup'
              setError(errorMessage)
            })
            .finally(() => {
              setLoading(false)
            })
        }}
      />
    </Container>
  )
}

export default GamePage
