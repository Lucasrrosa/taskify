import FormTextField from '@/components/form-fields/FormTextField'
import { loginSchema, type LoginSchema } from '@/modules/auth/schemas/login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Link } from '@mui/material'
import { useForm } from 'react-hook-form'

type LoginFormProps = {
    onSubmit: (data: LoginSchema) => void
}

export default function LoginForm({ onSubmit }: LoginFormProps) {

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(loginSchema),
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
            <FormTextField
                control={control}
                name="email"
                label="Email"
                fullWidth
            />
            <FormTextField
                control={control}
                name="password"
                label="Password"
                type="password"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
            <Link href="/register" variant="body2">
                Don't have an account? Register
            </Link>
        </form>
    )
}