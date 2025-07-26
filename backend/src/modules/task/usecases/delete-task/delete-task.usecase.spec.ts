import { Test, TestingModule } from '@nestjs/testing'
import { TaskRepository } from '../../task.repository'
import { DeleteTaskUsecase } from './delete-task.usecase'

describe('DeleteTaskService', () => {
  let usecase: DeleteTaskUsecase

  const mockTaskRepository = {
    remove: jest.fn(),
    findOneBy: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteTaskUsecase, { provide: TaskRepository, useValue: mockTaskRepository }],
    }).compile()

    usecase = module.get<DeleteTaskUsecase>(DeleteTaskUsecase)
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined()
  })

  it('should delete a task', async () => {
    const taskId = 1
    const mockResponse = { id: taskId, title: 'Test Task' }

    mockTaskRepository.findOneBy.mockReturnValue(mockResponse)
    mockTaskRepository.remove.mockResolvedValue(mockResponse)

    await usecase.execute(taskId, 'user-id')

    expect(mockTaskRepository.findOneBy).toHaveBeenCalledWith({ id: taskId, user: { id: 'user-id' } })
    expect(mockTaskRepository.remove).toHaveBeenCalledWith(mockResponse)
    expect(mockTaskRepository.remove).toHaveBeenCalledTimes(1)
  })
})
