import { TaskStatusEnum } from '@/modules/task/enums/task-status.enum'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto {
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string

  @IsEnum(TaskStatusEnum, { message: 'Status must be a valid task status' })
  @IsOptional()
  status?: TaskStatusEnum
}
