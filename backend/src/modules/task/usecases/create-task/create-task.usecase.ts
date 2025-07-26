import { IUserBasedUsecase } from '@/common/interfaces/IUserBasedUsecase'
import { Inject, Injectable } from '@nestjs/common'
import { CreateTaskDto } from '../../dtos/CreateTask.dto'
import { TaskResponseDto } from '../../dtos/TaskResponse.dto'
import { TaskRepository } from '../../task.repository'

@Injectable()
export class CreateTaskUsecase implements IUserBasedUsecase<CreateTaskDto, TaskResponseDto> {
  @Inject()
  private readonly taskRepository: TaskRepository

  async execute(createTaskDto: CreateTaskDto, userId: string): Promise<TaskResponseDto> {
    const task = await this.taskRepository.createTask(createTaskDto, userId)

    return new TaskResponseDto(task)
  }
}
