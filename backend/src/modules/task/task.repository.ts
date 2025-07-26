import { CreateTaskDto } from '@/modules/task/dtos/CreateTask.dto'
import { TaskFilterDto } from '@/modules/task/dtos/TaskFilter.dto'
import { UpdateTaskDto } from '@/modules/task/dtos/UpdateTask.dto'
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { TaskEntity } from './task.entity'

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager())
  }

  findTasksByFilter(filter: TaskFilterDto, userId: string): Promise<TaskEntity[]> {
    const queryBuilder = this.createQueryBuilder('task')
      .where('task.userId = :userId', { userId })
      .orderBy('task.createdAt', 'DESC')

    if (filter.status) {
      queryBuilder.andWhere('task.status = :status', { status: filter.status })
    }
    if (filter.title) {
      queryBuilder.andWhere('task.title LIKE :title', { title: `%${filter.title}%` })
    }
    return queryBuilder.getMany()
  }

  async createTask(createTaskDto: CreateTaskDto, userId: string): Promise<TaskEntity> {
    const task = this.create({
      ...createTaskDto,
      user: { id: userId }, // Assuming user is set by the service
    })
    const result = await this.save(task)
    return result
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.delete(taskId)
  }

  async updateTask(taskId: number, updateData: UpdateTaskDto): Promise<TaskEntity> {
    await this.update(taskId, updateData)
    return this.findOneBy({ id: taskId }) as Promise<TaskEntity>
  }
}
