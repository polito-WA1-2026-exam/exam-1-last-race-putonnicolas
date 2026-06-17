import { Container, Row } from 'react-bootstrap'
import HowToPlay from '@/components/landing/HowToPlay/HowToPlay.jsx'
import HomeHero from '@/components/landing/HomeHero.jsx'
import '@/pages/LandingPage/LandingPage.css'

const LandingPage = () => {
  return (
    <Container fluid className="landing-page-container">
      <Row>
        <HomeHero />
      </Row>
      <Row>
        <HowToPlay />
      </Row>
    </Container>
  )
}

export default LandingPage
