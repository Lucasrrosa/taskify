import { TaskStatusEnum } from '@/modules/task/enums/task-status.enum'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class TaskFilterDto {
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status?: TaskStatusEnum

  @IsString()
  @IsOptional()
  title?: string
}
