import { useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HowToPlay from './Reusable/HowToPlay.jsx';
import HomeHero from './Reusable/HomeHero.jsx';
import "../css/HomeView.css"
import UserContext from '../contexts/UserProvider.jsx';

const HomeView = () => {
  const userContext = useContext(UserContext)

  return (
    <>
      <Container fluid>
          {/* Game presentation */}
          <Row>
              <p>Welcome back, {userContext.user.username}</p>
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