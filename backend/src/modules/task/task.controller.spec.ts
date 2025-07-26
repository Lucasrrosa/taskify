import { UpdateTaskDto } from '@/modules/task/dtos/UpdateTask.dto'
import { TaskStatusEnum } from '@/modules/task/enums/task-status.enum'
import { UpdateTaskUsecase } from '@/modules/task/usecases/update-task/update-task.usecase'
import { Test, TestingModule } from '@nestjs/testing'
import { TaskController } from './task.controller'
import { CreateTaskUsecase } from './usecases/create-task/create-task.usecase'
import { DeleteTaskUsecase } from './usecases/delete-task/delete-task.usecase'
import { GetAllTasksUsecase } from './usecases/get-all-tasks/get-all-tasks.usecase'

describe('TaskController', () => {
  let controller: TaskController

  const mockCreateTaskUsecase = {
    execute: jest.fn(),
  }

  const mockGetAllTasksUsecase = {
    execute: jest.fn(),
  }

  const mockUpdateTaskUsecase = {
    execute: jest.fn(),
  }

  const mockDeleteTaskUsecase = {
    execute: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: CreateTaskUsecase,
          useValue: mockCreateTaskUsecase,
        },
        {
          provide: GetAllTasksUsecase,
          useValue: mockGetAllTasksUsecase,
        },
        {
          provide: UpdateTaskUsecase,
          useValue: mockUpdateTaskUsecase,
        },
        {
          provide: DeleteTaskUsecase,
          useValue: mockDeleteTaskUsecase,
        },
      ],
    }).compile()

    controller = module.get<TaskController>(TaskController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call create task usecase with the correct parameters', async () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    }
    const mockResponse = { id: 1, ...createTaskDto }

    mockCreateTaskUsecase.execute.mockResolvedValue(mockResponse)

    const result = await controller.createTask(createTaskDto, 'user-id')

    expect(mockCreateTaskUsecase.execute).toHaveBeenCalledWith(createTaskDto, 'user-id')
    expect(result).toEqual(mockResponse)
  })

  it('should call get all tasks usecase with the correct parameters', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
    ]
    const taskFilter = { status: TaskStatusEnum.PENDING, title: 'title search' }
    mockGetAllTasksUsecase.execute.mockResolvedValue(mockTasks)

    const result = await controller.getAllTasks(taskFilter, 'user-id')

    expect(mockGetAllTasksUsecase.execute).toHaveBeenCalledWith(taskFilter, 'user-id')
    expect(result).toEqual(mockTasks)
  })

  it('should call update task usecase with the correct parameters', async () => {
    const taskId = 1
    const mockResponse = { id: taskId, status: TaskStatusEnum.COMPLETED }
    const updateTaskDto: UpdateTaskDto = { status: TaskStatusEnum.COMPLETED }

    mockUpdateTaskUsecase.execute.mockResolvedValue(mockResponse)

    await controller.updateTask(taskId, updateTaskDto, 'user-id')

    expect(mockUpdateTaskUsecase.execute).toHaveBeenCalledWith({ id: taskId, ...updateTaskDto }, 'user-id')
  })

  it('should call delete task usecase with the correct parameters', async () => {
    const taskId = 1
    const mockResponse = { id: taskId, title: 'Test Task' }

    mockDeleteTaskUsecase.execute.mockResolvedValue(mockResponse)

    await controller.deleteTask(taskId, 'user-id')

    expect(mockDeleteTaskUsecase.execute).toHaveBeenCalledWith(taskId, 'user-id')
  })
})
