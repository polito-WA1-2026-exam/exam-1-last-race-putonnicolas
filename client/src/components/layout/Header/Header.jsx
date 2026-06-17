import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import useUser from '@/hooks/useUser'
import '@/components/layout/Header/Header.css'
import '@/styles/shared/Button.css'
import logoImage from '@/assets/last_race_logo.png'
import { STRINGS } from '@/constants/strings.js'

export function Header() {
  const { user } = useUser()

  return (
    <Navbar className="custom-navbar grainy" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Last Race logo"
            src={logoImage}
            className="navbar-logo"
          />
        </Navbar.Brand>

        {user ? <UserInfo name={user.username} /> : <LoginButton />}
      </Container>
    </Navbar>
  )
}

function LoginButton() {
  const navigate = useNavigate()

  return <Button className="btn-arcade-login" onClick={() => navigate('/login')}>Log In</Button>
}

function LogoutButton() {
  const navigate = useNavigate()
  const { logout } = useUser()

  return (
    <Button
      className="btn-arcade-secondary btn-arcade-sm d-flex align-items-center gap-2"
      onClick={() => {
        logout()
        navigate('/')
      }}
    >
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      {STRINGS.header.logout}
    </Button>
  )
}

function UserInfo({ name }) {
  return (
    <div className="d-flex align-items-center gap-3">
      <Link to="/home" className="text-decoration-none text-reset">
        <span className="user-greeting">
          {name.toUpperCase()}
        </span>
      </Link>

      <LogoutButton />
    </div>
  )
}
