import { Container, Row } from 'react-bootstrap';
import HowToPlay from './Reusable/HowToPlay.jsx';
import HomeHero from './Reusable/HomeHero.jsx';
import "../css/LandingPage.css"

const LandingPage = () => {

  return (
    <>
      <Container fluid>
          {/* Game presentation */}
          <Row>
              <HomeHero/>
          </Row>
          {/* Rules */}
          <Row>
            <HowToPlay/>        
          </Row>
      </Container>
    </>
  )
}

export default LandingPage