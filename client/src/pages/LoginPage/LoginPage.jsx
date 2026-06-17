import { useState } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router"
import useUser from '@/hooks/useUser'
import '@/pages/LoginPage/LoginPage.css'
import '@/styles/shared/Button.css'

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errormsg, setErrormsg] = useState("")

  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useUser()

  const destination = location.state?.from || "/home"

  const doSubmit = async (e) => {
    e.preventDefault()
    setErrormsg("")

    if (!username || !password) {
      setErrormsg("Please fulfill all the fields.")
      return
    }

    try {
      await login(username, password)
      navigate(destination, { replace: true })
    } catch {
      setErrormsg("Wrong logins.")
    }
  }

  return (
    <Container className="login-page-container d-flex align-items-center justify-content-center">

      <div className="login-card">
        <h2 className="login-title text-center mb-2">LOGIN</h2>
        <p className="login-p text-center mb-4">Ready to hit the track again?</p>

        <Form onSubmit={doSubmit}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label className="custom-label">USERNAME / EMAIL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              className="custom-input"
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="custom-label">PASSWORD</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              className="custom-input"
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2 mt-5">
            <Button className="btn-arcade-login" type="submit">
              LOG IN
            </Button>
          </div>

          {errormsg && (
            <div className="text-danger text-center mt-3 arcade-error-msg">
              ⚠️ {errormsg}
            </div>
          )}
        </Form>
      </div>

    </Container>
  )
}

export default LoginPage
