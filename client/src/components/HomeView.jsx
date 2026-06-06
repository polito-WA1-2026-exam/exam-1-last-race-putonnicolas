import { Container, Col, Row } from 'react-bootstrap';
import HowToPlay from './Reusable/HowToPlay.jsx';
import HomeHero from './Reusable/HomeHero.jsx';
import "../css/HomeView.css"

const HomeView = () => {

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

const TryIt = () =>
{
  return <></>
}

export default HomeView