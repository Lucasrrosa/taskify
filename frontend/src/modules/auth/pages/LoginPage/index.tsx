import LoginForm from '@/modules/auth/components/LoginForm'
import { AuthRequests } from '@/modules/auth/requests/AuthRequests'
import type { LoginSchema } from '@/modules/auth/schemas/login.schema'
import { useSetUser, useUser } from '@/modules/auth/store/useAuthStore'
import { Box, Paper, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Navigate, useNavigate } from 'react-router'

export default function LoginPage() {
  const user = useUser()
  const setUser = useSetUser()
  const navigate = useNavigate()
    const logUserIn = useMutation({
      mutationFn: AuthRequests.login,
      onSuccess: (data) => {
        setUser(data.user)
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/')
      }
    })

    const handleLogin = async (data: LoginSchema) => {
        logUserIn.mutate(data)
    }

    if(user) {
        return <Navigate to="/" replace/>
    }
  return (
    <Box className='w-screen h-screen flex items-center justify-center bg-gray-200'>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: (theme) => theme.breakpoints.values.sm,
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Login
        </Typography>
        <Typography variant='body1' gutterBottom>
          Please enter your credentials to log in.
        </Typography>
        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Box>
  )
}
