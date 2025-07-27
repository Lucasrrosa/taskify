import type { TaskStatusEnum } from '@/modules/tasks/enums/TaskEnum'

export interface IUpdateTaskDto {
  title?: string
  status?: TaskStatusEnum
}
