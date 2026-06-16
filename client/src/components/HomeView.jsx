import { useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HowToPlay from './Reusable/HowToPlay.jsx';
import {Button} from 'react-bootstrap';
import HomeHero from './Reusable/HomeHero.jsx';
import "../css/HomeView.css"
import UserContext from '../contexts/UserProvider.jsx';
import { useNavigate } from 'react-router';

const HomeView = () => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()
  
  return (
    <>
      <Container fluid>
          {/* Game presentation */}
          <Row>
              <p>Welcome back, {userContext.user.username}</p>
              <Button className="btn-join-race" onClick={ () => {
                console.log('click');
                
                navigate('/game')
              }

              }>
                <span className="text-slide">Launch game</span>
              </Button>
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