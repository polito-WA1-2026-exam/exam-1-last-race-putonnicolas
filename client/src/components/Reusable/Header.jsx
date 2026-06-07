import { useContext } from "react"
import { Button, Container, Navbar } from "react-bootstrap"
import { useNavigate } from 'react-router'
import UserContext from "../../contexts/UserProvider.jsx"
import "../../css/Header.css"
import "../../css/Button.css"
import logoImage from '../../assets/last_race_logo.png';
import { STRINGS } from "../../constants/strings.js"

export function Header() {

  const userContext = useContext(UserContext)
  
  return (
    <Navbar className="custom-navbar grainy" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href={'/home' }>
          <img
            alt="Logo Last Race"
            src={logoImage}
            className="navbar-logo" 
          />
        </Navbar.Brand>
        {userContext.user ? 
          <Button className="btn-join-race">
            <span className="text-slide">{STRINGS.header.launchGame}</span>
          </Button>
        : <></> }

        {userContext.user ? <UserInfo name={userContext.user.username}/> : <LoginButton/>}
      </Container>
    </Navbar>)
}

function LoginButton() {
  const navigate = useNavigate()

  return <Button className="btn-arcade-login" onClick={() => navigate('/login')}>Log In</Button>
}


function LogoutButton() {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  return <>
    <Button 
      className="btn-arcade-secondary btn-arcade-sm d-flex align-items-center gap-2"
      onClick={() => 
      {
        userContext.logout()
        navigate('/home')
      }
      }
    >
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      {STRINGS.header.logout}
    </Button>
  </>
}

function UserInfo({ name }) {
  return (
    <div className="d-flex align-items-center gap-3">
      <span className="user-greeting">{name.toUpperCase()}</span>

      <LogoutButton/>
    </div> 
  )
}