import { UpdateTaskUsecase } from '@/modules/task/usecases/update-task/update-task.usecase'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskController } from './task.controller'
import { TaskEntity } from './task.entity'
import { TaskRepository } from './task.repository'
import { CreateTaskUsecase } from './usecases/create-task/create-task.usecase'
import { DeleteTaskUsecase } from './usecases/delete-task/delete-task.usecase'
import { GetAllTasksUsecase } from './usecases/get-all-tasks/get-all-tasks.usecase'

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [CreateTaskUsecase, TaskRepository, GetAllTasksUsecase, DeleteTaskUsecase, UpdateTaskUsecase],
})
export class TaskModule {}
