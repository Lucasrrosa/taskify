import { UserId } from '@/modules/auth/decorators/UserId.decorator'
import { TaskFilterDto } from '@/modules/task/dtos/TaskFilter.dto'
import { UpdateTaskDto } from '@/modules/task/dtos/UpdateTask.dto'
import { UpdateTaskUsecase } from '@/modules/task/usecases/update-task/update-task.usecase'
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { CreateTaskDto } from './dtos/CreateTask.dto'
import { CreateTaskUsecase } from './usecases/create-task/create-task.usecase'
import { DeleteTaskUsecase } from './usecases/delete-task/delete-task.usecase'
import { GetAllTasksUsecase } from './usecases/get-all-tasks/get-all-tasks.usecase'

@Controller('tasks')
export class TaskController {
  @Inject()
  private readonly createTaskService: CreateTaskUsecase

  @Inject()
  private readonly getAllTasksUsecase: GetAllTasksUsecase

  @Inject()
  private readonly deleteTaskService: DeleteTaskUsecase

  @Inject()
  private readonly updateTaskUsecase: UpdateTaskUsecase

  @Get()
  async getAllTasks(@Query() params: TaskFilterDto, @UserId() userId: string) {
    const tasks = await this.getAllTasksUsecase.execute(params, userId)
    return tasks
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @UserId() userId: string) {
    const task = await this.createTaskService.execute(createTaskDto, userId)
    return task
  }

  @Patch('/:id')
  async updateTask(@Param('id', ParseIntPipe) taskId: number, @Body() params: UpdateTaskDto, @UserId() userId: string) {
    await this.updateTaskUsecase.execute({ id: taskId, ...params }, userId)
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) taskId: number, @UserId() userId: string) {
    await this.deleteTaskService.execute(taskId, userId)
  }
}
