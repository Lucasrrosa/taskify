import { TaskRepositoryMock } from '@/modules/task/mocks/TaskRepositoryMock'
import { Test, TestingModule } from '@nestjs/testing'
import { TaskRepository } from '../../task.repository'
import { CreateTaskUsecase } from './create-task.usecase'

describe('CreateTaskService', () => {
  let usecase: CreateTaskUsecase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskUsecase,
        {
          provide: TaskRepository,
          useValue: TaskRepositoryMock,
        },
      ],
    }).compile()

    usecase = module.get<CreateTaskUsecase>(CreateTaskUsecase)
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined()
  })

  it('should create a task', async () => {
    const createTaskDto = { title: 'Test Task', description: 'This is a test task' }
    const savedTask = { id: '1', ...createTaskDto }

    TaskRepositoryMock.createTask.mockReturnValue(savedTask)

    const result = await usecase.execute(createTaskDto, 'user-id')

    expect(result).toMatchObject(savedTask)
    expect(TaskRepositoryMock.createTask).toHaveBeenCalledWith(expect.objectContaining(createTaskDto), 'user-id')
  })
})
