import { IUserBasedUsecase } from '@/common/interfaces/IUserBasedUsecase'
import { TaskFilterDto } from '@/modules/task/dtos/TaskFilter.dto'
import { Inject, Injectable } from '@nestjs/common'
import { TaskResponseDto } from '../../dtos/TaskResponse.dto'
import { TaskRepository } from '../../task.repository'

@Injectable()
export class GetAllTasksUsecase implements IUserBasedUsecase<TaskFilterDto, TaskResponseDto[]> {
  @Inject()
  private readonly taskRepository: TaskRepository

  async execute(params: TaskFilterDto, userId: string): Promise<TaskResponseDto[]> {
    const result = await this.taskRepository.findTasksByFilter(params, userId)

    return result.map((task) => new TaskResponseDto(task))
  }
}
