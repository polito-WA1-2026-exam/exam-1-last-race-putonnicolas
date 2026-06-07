// import {Footer} from '../components/Reusable/Footer.jsx';
import {Header} from "../components/Reusable/Header.jsx"
import {Outlet} from 'react-router';
import { Container } from 'react-bootstrap';

const MainLayout = () => {
  return (
    <div className="app-viewport d-flex flex-column min-vh-100 w-100">
      <Header></Header>
      <Container fluid as="main" className="d-flex flex-column flex-grow-1 py-4">
        <Outlet />
      </Container>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default MainLayout