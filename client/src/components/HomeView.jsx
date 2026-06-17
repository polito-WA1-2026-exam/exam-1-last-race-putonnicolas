import { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import HowToPlay from './Reusable/HowToPlay.jsx';
import {Button} from 'react-bootstrap';
import "../css/HomeView.css"
import UserContext from '../contexts/UserProvider.jsx';
import { useNavigate } from 'react-router';
import { STRINGS } from '../constants/strings.js';

const HomeView = () => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()
  
  return (
    <>
      <Container fluid className="py-4 mt-3 md-0">
          {/* Launch game & leaderboard */}
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={6}>
              <Card 
                className="bg-arcade-panel border-0 rounded-4 shadow-lg text-center p-4 p-md-5"
                style={{ 
                  borderTop: '4px solid #00D1FF',
                  backgroundColor: 'rgba(15, 10, 31, 0.8)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
                }}
              >
                <Card.Body className="d-flex flex-column align-items-center">
                  
                  <h2 className="text-white mb-4" style={{ fontSize: '1.8rem' }}>
                    Welcome back, <br/>
                    <span className="text-info fw-bold arcade-title" style={{ fontSize: '2.5rem', letterSpacing: '2px' }}>
                      {userContext.user.username.toUpperCase()}
                    </span>
                  </h2>

                  <div className="d-flex flex-column w-100 gap-3 align-items-center mt-3" style={{ maxWidth: '350px' }}>
                    
                    {/* Launch game */}
                    <Button 
                      className="btn-join-race w-100 py-3 rounded-pill fw-bold shadow" 
                      onClick={() => navigate('/game')}
                      style={{ fontSize: '1.2rem', letterSpacing: '1px' }}
                    >
                      <span className="text-slide">{STRINGS.home.newGame}</span>
                    </Button>

                    {/* LEADERBOARD */}
                    <Button 
                      className="btn-arcade-login w-100 py-2 rounded-pill fw-bold" 
                      onClick={() => navigate('/leaderboard')}
                      style={{ fontSize: '1.1rem', backgroundColor: 'rgba(0, 209, 255, 0.1)', border: '1px solid rgba(0, 209, 255, 0.5)' }}
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

export default HomeView