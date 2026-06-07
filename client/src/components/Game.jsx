import { useEffect, useState } from "react"
import MapRenderer from "./Reusable/MapRenderer.jsx"
import {getGameSetup} from '../../src/api/game.js'
import { Card, Col, Container, Row } from "react-bootstrap"
import Stations from "./Reusable/Stations.jsx"
import '../css/Game.css'
import Timer from "./Reusable/Timer.jsx"
import SegmentList from "./Reusable/SegmentList.jsx"
import ChoosedPath from "./Reusable/ChoosedPath.jsx"

const Game = () => {
  const [gameData, setGameData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedSegments, setSelectedSegments] = useState([])

  const handleAddSegment = (segment) => {
    console.log(segment);
    
    setSelectedSegments([...selectedSegments, segment]);
  }

  const handleRemoveSegment = (segmentId) => {
    setSelectedSegments(selectedSegments.filter(s => s.id !== segmentId));
  }

  const availableSegments = gameData 
  ? gameData.network.segments.filter(s => 
      !selectedSegments.find(sel => sel && sel.id === s.id)
    )
  : [];

  useEffect(() => {
    getGameSetup()
      .then((data) => {
        setGameData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <Container fluid className="game-container w-100 h-100 d-flex flex-column p-1">
  
      {/* Path choosed */}
      <Row className="mb-3 flex-shrink-0">
        <Col>
          <Card className="bg-arcade-panel border-0 rounded-4 shadow">
            <Card.Body className="p-3">
              <Card.Title className="arcade-title mb-2">Trajet choisi</Card.Title>
              <ChoosedPath segments={selectedSegments} stations={gameData.network.stations} onRemove={handleRemoveSegment}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="flex-grow-1 overflow-hidden g-3">
        
        {/* Map */}
        <Col lg={7} className="h-100">
          <Card className="h-100 bg-arcade-panel border-0 rounded-4 shadow">
            <Card.Body className="p-2">
              <MapRenderer network={gameData.network} startStation={gameData.startStation} endStation={gameData.endStation} />
            </Card.Body>
          </Card>
        </Col>

        {/* Right infos */}
        <Col lg={5} className="h-100 d-flex flex-column gap-3">
          
          {/* Station + timer */}
          <div className="d-flex flex-row gap-2">
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
          <Card className="h-100 bg-arcade-panel border-0 rounded-4 shadow d-flex flex-column">
            <Card.Body className="d-flex flex-column p-3 overflow-hidden">
              <Card.Title className="arcade-title mb-3">Segments disponibles</Card.Title>
              
              <div className="overflow-auto flex-grow-1 custom-scrollbar pe-2">
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