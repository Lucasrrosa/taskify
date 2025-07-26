import { IUserBasedUsecase } from '@/common/interfaces/IUserBasedUsecase'
import { TaskRepository } from '@/modules/task/task.repository'
import { Inject, Injectable } from '@nestjs/common'

type UpdateTaskParams = {
  id: number
  title?: string
  description?: string
}

@Injectable()
export class UpdateTaskUsecase implements IUserBasedUsecase<UpdateTaskParams, void> {
  @Inject()
  private readonly taskRepository: TaskRepository

  async execute(params: UpdateTaskParams, userId: string): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id: params.id, user: { id: userId } })

    if (!task) {
      throw new Error('Task not found')
    }

    const updatedTask = { ...task, ...params }

    await this.taskRepository.updateTask(params.id, updatedTask)
  }
}
