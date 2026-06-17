import '@/styles/App.css'
import { Route, Routes } from 'react-router'
import MainLayout from '@/layouts/MainLayout.jsx'
import LandingPage from '@/pages/LandingPage/LandingPage.jsx'
import HomePage from '@/pages/HomePage/HomePage.jsx'
import GamePage from '@/pages/GamePage/GamePage.jsx'
import LoginPage from '@/pages/LoginPage/LoginPage.jsx'
import LeaderboardPage from '@/pages/LeaderboardPage/LeaderboardPage.jsx'
import ErrorPage from '@/pages/ErrorPage/ErrorPage.jsx'
import { UserProvider } from '@/contexts/UserProvider.jsx'
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<HomePage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
