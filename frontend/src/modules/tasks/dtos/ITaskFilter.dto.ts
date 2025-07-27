import type { TaskStatusEnum } from '@/modules/tasks/enums/TaskEnum'

export interface ITaskFilterDto {
  status?: TaskStatusEnum
  title?: string
}
