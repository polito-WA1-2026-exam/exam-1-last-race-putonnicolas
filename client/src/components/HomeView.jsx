import { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import HowToPlay from './Reusable/HowToPlay.jsx';
import {Button} from 'react-bootstrap';
import "../css/HomeView.css"
import UserContext from '../contexts/UserProvider.jsx';
import { useNavigate } from 'react-router';

const HomeView = () => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()
  
  return (
    <>
      <Container fluid>
          {/* Launch game & leaderboard */}
          <Row>
              <p>Welcome back, {userContext.user.username}</p>
              <Button className="btn-join-race" onClick={ () => {              
                navigate('/game')
              }

              }>
                <span className="text-slide">Launch game</span>
              </Button>
          </Row>
          {/* Rules */}
          <Row>
            <HowToPlay/>        
          </Row>
      </Container>
    </>
  )
}

export default HomeView