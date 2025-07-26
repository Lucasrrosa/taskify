import { IUserBasedUsecase } from '@/common/interfaces/IUserBasedUsecase'
import { Inject, Injectable } from '@nestjs/common'
import { TaskRepository } from '../../task.repository'

@Injectable()
export class DeleteTaskUsecase implements IUserBasedUsecase<number, void> {
  @Inject()
  private readonly taskRepository: TaskRepository

  async execute(taskId: number, userId: string): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id: taskId, user: { id: userId } })

    if (!task) {
      throw new Error('Task not found')
    }

    await this.taskRepository.remove(task)
  }
}
