import { TaskStatusEnum } from '@/modules/task/enums/task-status.enum'
import { TaskEntity } from '../task.entity'

export class TaskResponseDto {
  id: number
  title: string
  description?: string
  status: TaskStatusEnum
  createdAt: Date

  constructor(entity: TaskEntity) {
    this.id = entity.id
    this.title = entity.title
    this.createdAt = entity.createdAt
    this.description = entity.description
    this.status = entity.status
  }
}
