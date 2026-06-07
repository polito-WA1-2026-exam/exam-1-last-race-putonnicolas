import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import UserContext from "../contexts/UserProvider.jsx"

export default function ProtectedRoute() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}