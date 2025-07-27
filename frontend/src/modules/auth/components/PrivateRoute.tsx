import { useUser } from '@/modules/auth/store/useAuthStore'
import { Navigate, Outlet } from 'react-router'


export default function PrivateRouter() {
  const user = useUser()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return (
    <Outlet />
  )
}