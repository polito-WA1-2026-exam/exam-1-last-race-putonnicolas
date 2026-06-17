import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import HowToPlay from '@/components/landing/HowToPlay/HowToPlay.jsx'
import '@/pages/HomePage/HomePage.css'
import '@/styles/shared/Button.css'
import '@/styles/shared/Arcade.css'
import useUser from '@/hooks/useUser'
import { useNavigate } from 'react-router'
import { STRINGS } from '@/constants/strings.js'

const HomePage = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <Container fluid className="py-4 mt-3 md-0">
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} lg={6}>
          <Card className="bg-arcade-panel border-0 rounded-4 shadow-lg text-center p-4 p-md-5 arcade-hero-card">
            <Card.Body className="d-flex flex-column align-items-center">
              <h2 className="text-white mb-4 home-welcome-title">
                Welcome back, <br />
                <span className="text-info fw-bold arcade-title arcade-title-lg">
                  {user.username.toUpperCase()}
                </span>
              </h2>

              <div className="d-flex flex-column w-100 gap-3 align-items-center mt-3 home-actions">
                <Button
                  className="btn-join-race w-100 py-3 rounded-pill fw-bold shadow home-join-btn"
                  onClick={() => navigate('/game')}
                >
                  <span className="text-slide">{STRINGS.home.newGame}</span>
                </Button>

                <Button
                  className="btn-arcade-login btn-arcade-outline w-100 py-2 rounded-pill fw-bold home-leaderboard-btn"
                  onClick={() => navigate('/leaderboard')}
                >
                  {STRINGS.home.leaderboard}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <HowToPlay />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
