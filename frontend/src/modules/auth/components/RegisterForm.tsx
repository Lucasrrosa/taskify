import FormTextField from '@/components/form-fields/FormTextField'
import { registerSchema, type RegisterSchema } from '@/modules/auth/schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Link } from '@mui/material'
import { useForm } from 'react-hook-form'

type RegisterFormProps = {
  onSubmit: (data: RegisterSchema) => void
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
      <FormTextField control={control} name='email' label='Email' fullWidth />
      <FormTextField control={control} name='username' label='Username' fullWidth />
      <FormTextField control={control} name='password' label='Password' type='password' fullWidth />
      <Button type='submit' variant='contained' color='primary'>
        Register
      </Button>
      <Link href='/login' variant='body2'>
        Already have an account? Login
      </Link>
    </form>
  )
}
