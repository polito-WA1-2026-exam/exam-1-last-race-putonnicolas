import { Header } from '@/components/layout/Header/Header.jsx'
import { Outlet } from 'react-router'
import { Container } from 'react-bootstrap'

const MainLayout = () => {
  return (
    <div className="app-viewport d-flex flex-column vh-100 w-100 overflow-hidden">
      <Header />
      <Container fluid as="main" className="d-flex flex-column flex-grow-1 h-100 p-0 overflow-auto">
        <Outlet />
      </Container>
    </div>
  )
}

export default MainLayout
