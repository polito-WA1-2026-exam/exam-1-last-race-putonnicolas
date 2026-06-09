import { useEffect, useState } from "react"
import MapRenderer from "./Reusable/MapRenderer.jsx"
import {getGameSetup, submitPath } from '../../src/api/game.js'
import { Card, Col, Container, Row, Button } from "react-bootstrap"
import Stations from "./Reusable/Stations.jsx"
import tclLogo from '../assets/tcl-logo.svg'
import '../css/Game.css'
import '../css/Button.css'
import Timer from "./Reusable/Timer.jsx"
import SegmentList from "./Reusable/SegmentList.jsx"
import ChoosedPath from "./Reusable/ChoosedPath.jsx"

const Game = () => {
  const [gameData, setGameData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedSegments, setSelectedSegments] = useState([])

  const handleSubmitPath = () => {
    if (selectedSegments.length === 0) return

    const routeArray = [
      selectedSegments[0].station1Id,
      ...selectedSegments.map(segment => segment.station2Id)
    ]

    submitPath(routeArray)
      .then((result) => {
        if (result.isValid) {
          alert(`Score: ${result.finalScore} coins. New record: ${result.isNewRecord}`)
        } else {
          alert("Wrong path !")
        }
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
  }

  const handleAddSegment = (segment) => {
    console.log(segment)
    
    setSelectedSegments([...selectedSegments, segment])
  }

  const handleRemoveSegment = (segmentId) => {
    setSelectedSegments(selectedSegments.filter(s => s.id !== segmentId))
  }

  const availableSegments = gameData 
  ? gameData.network.segments.filter(s => {
      console.log(gameData.network.segments);
      console.log(gameData.network.stations);
      
      const isAlreadyUsed = selectedSegments.find(sel => 
        sel && (
          (sel.station1Id === s.station1Id && sel.station2Id === s.station2Id) ||
          (sel.station1Id === s.station2Id && sel.station2Id === s.station1Id)
        )
      );

      return !isAlreadyUsed;
    })
  : [];

  useEffect(() => {
    getGameSetup()
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
      {/* Path choosed */}
      <Row className="mb-3 flex-shrink-0">
        <Col>
          <Card className="bg-arcade-panel border-0 rounded-4 shadow">
            <Card.Body className="p-2 d-flex flex-row align-items-center gap-3">
              
              <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                <Card.Title className="arcade-title m-2 map-card-title">Trajet choisi</Card.Title>
                <ChoosedPath 
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
                <span>Submit path</span>
                <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>➔</span>
              </Button>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="flex-grow-1 overflow-hidden g-3 game-main-row">
        
        {/* Map */}
        <Col lg={7} className="d-flex flex-column overflow-hidden map-column">

          <Card className="flex-grow-1 bg-arcade-panel border-0 rounded-4 shadow overflow-hidden map-card">
            <Card.Body className="p-2 d-flex flex-column overflow-hidden map-card-body">
              <MapRenderer network={gameData.network} startStation={gameData.startStation} endStation={gameData.endStation} />
            </Card.Body>
          </Card>
        </Col>

        {/* Right infos */}
        <Col lg={5} className="d-flex flex-column gap-3 overflow-hidden">
          
          {/* Station + timer */}
          <div className="d-flex flex-row gap-2 flex-shrink-0">
            <Card className="bg-arcade-panel border-0 rounded-4 shadow flex-grow-1 overflow-hidden">
              <Card.Body className="px-3 py-2 text-white d-flex align-items-center justify-content-center">
                <Stations startStation={gameData.startStation} endStation={gameData.endStation} />
              </Card.Body>
            </Card>
            <Card className="bg-arcade-panel border-0 rounded-4 shadow d-flex justify-content-center">
              <Card.Body className="p-2 text-white d-flex align-items-center justify-content-center">
                <Timer initialSeconds={90} onTimeUp={() => {}} />
              </Card.Body>
            </Card>
          </div>

          {/*  Availaible Segments */}
          <Card className="flex-grow-1 bg-arcade-panel border-0 rounded-4 shadow d-flex flex-column overflow-hidden segments-card">
            <Card.Body className="d-flex flex-column p-3 overflow-hidden segments-card-body">
              <Card.Title className="arcade-title mb-3">Segments disponibles</Card.Title>
              
              <div className="overflow-auto flex-grow-1 custom-scrollbar pe-2 segments-scroll-container">
                <SegmentList segments={availableSegments} stations={gameData.network.stations} onAdd={handleAddSegment} />
              </div>
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Game