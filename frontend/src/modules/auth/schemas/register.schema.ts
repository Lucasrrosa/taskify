import { z } from 'zod'
export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { message: 'Password is required' }),
    username: z.string().min(1, { message: 'Username is required' }),
})
export type RegisterSchema = z.infer<typeof registerSchema>