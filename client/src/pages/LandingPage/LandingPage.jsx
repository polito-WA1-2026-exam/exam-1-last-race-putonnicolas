import { Container, Row } from 'react-bootstrap'
import HowToPlay from '@/components/landing/HowToPlay/HowToPlay.jsx'
import LandingHero from '@/components/landing/LandingHero/LandingHero.jsx'
import '@/pages/LandingPage/LandingPage.css'

const LandingPage = () => {
  return (
    <Container fluid className="landing-page-container">
      <Row>
        <LandingHero />
      </Row>
      <Row>
        <HowToPlay />
      </Row>
    </Container>
  )
}

export default LandingPage
