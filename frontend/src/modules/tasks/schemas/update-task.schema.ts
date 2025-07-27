import { TaskStatusEnum } from '@/modules/tasks/enums/TaskEnum'
import z from 'zod'

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum([TaskStatusEnum.COMPLETED, TaskStatusEnum.PENDING], { message: 'Status is required' }),
})

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>