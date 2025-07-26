import LoginPage from '@/modules/auth/pages/LoginPage'
import RegisterPage from '@/modules/auth/pages/RegisterPage'
import TasksPage from '@/modules/tasks/page/TasksPage'
import { BrowserRouter, Route, Routes } from 'react-router'

export default function RouteConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        </Routes>
        </BrowserRouter>
  )
}