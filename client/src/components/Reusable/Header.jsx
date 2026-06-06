import { useContext } from "react"
import { Button, Container, Navbar } from "react-bootstrap"
import { Link, useNavigate } from 'react-router'
import UserContext from "../../contexts/UserProvider.jsx"
import "../../css/Header.css"
import logoImage from '../../assets/last_race_logo.png';

export function Header() {

  const user = useContext(UserContext)

  const destination = user.id ? '/home' : '/'

  return (
    <Navbar className="custom-navbar" expand="lg" >
      <Container>
        <Navbar.Brand href={destination}>
          <img
            alt="Logo Last Race"
            src={logoImage}
            className="navbar-logo" 
          />
        </Navbar.Brand>

        <div>{user.name ? <UserInfo name={user.name}/> : <LoginButton/>}</div>
      </Container>
    </Navbar>)
}

function LoginButton() {
  const navigate = useNavigate()

  return <Button className="btn-arcade-login" onClick={() => navigate('/login')}>Log In</Button>
}

function UserInfo(props) {
  return <div>
    <div>{props.name}</div>
    <div><Link to='/logout'>Logout</Link></div>
  </div>
}

