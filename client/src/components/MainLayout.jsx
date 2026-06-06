// import {Footer} from '../components/Reusable/Footer.jsx';
import {Header} from "../components/Reusable/Header.jsx"
import {Outlet} from 'react-router';
import { Container } from 'react-bootstrap';

const MainLayout = () => {
  return (
    <div className="app-viewport">
      <Header></Header>
      <Container as="main" className="py-4">
        <Outlet />
      </Container>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default MainLayout