import PrivateRouter from '@/modules/auth/components/PrivateRoute'
import LoginPage from '@/modules/auth/pages/LoginPage'
import RegisterPage from '@/modules/auth/pages/RegisterPage'
import TasksPage from '@/modules/tasks/page/TasksPage'
import { BrowserRouter, Route, Routes } from 'react-router'

export default function RouteConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouter/>}>
          <Route path="/" element={<TasksPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}