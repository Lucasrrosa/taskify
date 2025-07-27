import z from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional()
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>