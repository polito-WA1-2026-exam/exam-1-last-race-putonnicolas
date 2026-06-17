import { Navigate, Outlet, useLocation } from 'react-router'
import useUser from '@/hooks/useUser'

export default function ProtectedRoute() {
  const { user, loading } = useUser()
  const location = useLocation()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-light" role="status"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}
