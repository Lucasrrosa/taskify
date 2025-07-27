import type { TaskStatusEnum } from '@/modules/tasks/enums/TaskEnum'

export interface ITaskResponseDto {
  id: number
  title: string
  description?: string
  status: TaskStatusEnum
  createdAt: Date
}
