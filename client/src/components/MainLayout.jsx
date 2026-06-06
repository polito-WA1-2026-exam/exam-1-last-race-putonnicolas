import {Footer} from '../components/Reusable/Footer.jsx';
import {Header} from "../components/Reusable/Header.jsx"
import {Outlet} from 'react-router';

const MainLayout = () => {
  return <>
    <Header></Header>
    <Outlet />
    <Footer></Footer>
  </>
}

export default MainLayout