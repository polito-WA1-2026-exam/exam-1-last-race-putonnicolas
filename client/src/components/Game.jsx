import { useEffect, useState } from "react"
import MapRenderer from "./Reusable/MapRenderer.jsx"
import {getGameSetup} from '../../src/api/game.js'
import { Card, Col, Container, Row } from "react-bootstrap"
import Stations from "./Reusable/Stations.jsx"
import '../css/Game.css'

const Game = () => {
  const [gameData, setGameData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <Container fluid className="game-container p-4">
      <Row className="h-100 g-4">
        
        <Col lg={7} className="h-100">
          <Card className="h-100 bg-arcade-panel border-0 rounded-4 shadow">
            <Card.Body className="p-2">
              <MapRenderer 
                network={gameData.network} 
                startStation={gameData.startStation}
                endStation={gameData.endStation}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5} className="h-100 d-flex flex-column gap-3">
          
          <Card className="bg-arcade-panel border-0 rounded-4 shadow flex-shrink-0">
            <Card.Body className="p-2 text-white">
              <Stations startStation={gameData.startStation} endStation={gameData.endStation} />
            </Card.Body>
          </Card>

          <Row className="flex-grow-1 overflow-hidden g-3 m-0">
            
            <Col xs={6} className="h-100 p-0 pe-2">
              <Card className="h-100 bg-arcade-panel border-0 rounded-4 shadow">
                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title className="arcade-title mb-3">Trajet choisi</Card.Title>
                  <div className="overflow-auto flex-grow-1 custom-scrollbar pe-2 text-white">
                    Liste des choix...
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} className="h-100 p-0 ps-2">
              <Card className="h-100 bg-arcade-panel border-0 rounded-4 shadow">
                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title className="arcade-title mb-3">Segments disponibles</Card.Title>
                  <div className="overflow-auto flex-grow-1 custom-scrollbar pe-2 text-white">
                    {/* <SegmentList/> */}
                    Liste des segments...
                  </div>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Game