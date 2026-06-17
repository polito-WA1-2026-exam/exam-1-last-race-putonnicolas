import { Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import { STRINGS } from "@/constants/strings.js"
import "@/pages/ErrorPage/ErrorPage.css"
import "@/styles/shared/Button.css"

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <Container className="error-page-wrapper d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="error-heading">{STRINGS.error.title}</h1>
      <p className="error-text">{STRINGS.error.description}</p>

      <div className="error-actions d-flex gap-3 mt-4">
        <Button
          className="btn-arcade-primary d-flex align-items-center gap-2"
          onClick={() => navigate('/home')}
        >
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
          </svg>
          {STRINGS.error.btnHome}
        </Button>
        <Button
          className="btn-arcade-secondary d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          {STRINGS.error.btnBack}
        </Button>
      </div>
    </Container>
  )
}

export default ErrorPage
