import { TaskRepositoryMock } from '@/modules/task/mocks/TaskRepositoryMock'
import { Test, TestingModule } from '@nestjs/testing'
import { TaskRepository } from '../../task.repository'
import { GetAllTasksUsecase } from './get-all-tasks.usecase'

describe('GetAllTasksUsecase', () => {
  let usecase: GetAllTasksUsecase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllTasksUsecase, { provide: TaskRepository, useValue: TaskRepositoryMock }],
    }).compile()

    usecase = module.get<GetAllTasksUsecase>(GetAllTasksUsecase)
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined()
  })

  it('should return all tasks', async () => {
    const mockTasks = [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' },
    ]
    const filter = {}

    TaskRepositoryMock.findTasksByFilter.mockResolvedValue(mockTasks)

    const result = await usecase.execute(filter, 'user-id')

    expect(result).toEqual(mockTasks)
    expect(TaskRepositoryMock.findTasksByFilter).toHaveBeenCalled()
  })
})
