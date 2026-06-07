import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import UserContext from "../contexts/UserProvider.jsx"

export default function ProtectedRoute() {
  const { user, loading } = useContext(UserContext)

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-light" role="status"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}