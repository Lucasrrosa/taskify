import RegisterForm from '@/modules/auth/components/RegisterForm'
import { AuthRequests } from '@/modules/auth/requests/AuthRequests'
import type { RegisterSchema } from '@/modules/auth/schemas/register.schema'
import { Box, Paper, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export default function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation = useMutation({
    mutationFn: AuthRequests.register,
    onSuccess: () => {
      navigate('/login')
    }
  })

    const handleRegister = async (data: RegisterSchema) => {
        registerMutation.mutate({email: data.email, password: data.password, username: '', name: ''})
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
          Register
        </Typography>
        <Typography variant='body1' gutterBottom>
          Please enter your details to create an account.
        </Typography>
        <RegisterForm onSubmit={handleRegister} />
      </Paper>
    </Box>
  )
}