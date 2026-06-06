import "./css/App.css";
import { Route, Routes } from "react-router";
import MainLayout from "./components/MainLayout.jsx"
import LandingPage from "./components/LandingPage.jsx"
import HomeView from "./components/HomeView.jsx"
import Game from "./components/Game.jsx"
import LoginForm from "./components/LoginForm.jsx"
import Leaderboard from "./components/Leaderboard.jsx"
import ErrorPage from "./components/ErrorPage.jsx"
import {UserProvider} from './contexts/UserProvider.jsx';


function App() {
  return (
    <UserProvider>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="login" element={<LoginForm />} />
            <Route index element={<LandingPage />} />
            <Route path="home" element={<HomeView />} />
            {/* <Route path="game" element={<Game />} /> */}
            {/* <Route path="leaderboard" element={<Leaderboard/>} /> */}
            <Route path="*" element={<ErrorPage/>} />
          </Route>
        </Routes>
    </UserProvider>
  );
}

export default App;
