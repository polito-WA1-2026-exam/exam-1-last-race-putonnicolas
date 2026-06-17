import { Container, Row, Col, Card } from 'react-bootstrap';
import HowToPlay from './Reusable/HowToPlay.jsx';
import {Button} from 'react-bootstrap';
import "../css/HomePage.css"
import { useNavigate } from 'react-router';
import { STRINGS } from '../constants/strings.js';
import useUser from '../hooks/useUser.js';

const HomePage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  
  return (
    <>
      <Container fluid className="py-4 mt-3 md-0">
          {/* Launch game & leaderboard */}
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={6}>
              <Card 
                className="bg-arcade-panel border-0 rounded-4 shadow-lg text-center p-4 p-md-5 arcade-hero-card"
              >
                <Card.Body className="d-flex flex-column align-items-center">
                  
                  <h2 className="text-white mb-4" style={{ fontSize: '1.8rem' }}>
                    Welcome back, <br/>
                    <span className="text-info fw-bold arcade-title-lg">
                      {user?.username?.toUpperCase()}
                    </span>
                  </h2>

                  <div className="d-flex flex-column w-100 gap-3 align-items-center mt-3" style={{ maxWidth: '350px' }}>
                    
                    {/* Launch game */}
                    <Button 
                      className="btn-join-race w-100 py-3 rounded-pill fw-bold shadow arcade-btn-lg" 
                      onClick={() => navigate('/game')}
                    >
                      <span className="text-slide">{STRINGS.home.newGame}</span>
                    </Button>

                    {/* LEADERBOARD */}
                    <Button 
                      className="btn-arcade-outline w-100 py-2 rounded-pill fw-bold arcade-btn-lg" 
                      onClick={() => navigate('/leaderboard')}
                    >
                      {STRINGS.home.leaderboard}
                    </Button>

                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* Rules */}
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <HowToPlay/>   
            </Col>     
          </Row>
      </Container>
    </>
  )
}

export default HomePage