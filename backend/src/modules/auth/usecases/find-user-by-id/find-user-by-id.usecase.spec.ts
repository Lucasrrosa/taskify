import { FindUserByIdUseCase } from '@/modules/auth/usecases/find-user-by-id/find-user-by-id.usecase'
import { UserRepository } from '@/modules/auth/user.repository'
import { Test, TestingModule } from '@nestjs/testing'

describe('FindUserByIdUseCase', () => {
  let findUserByIdUseCase: FindUserByIdUseCase
  const mockRepository = {
    findUserById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
        FindUserByIdUseCase,
      ],
    }).compile()

    findUserByIdUseCase = module.get<FindUserByIdUseCase>(FindUserByIdUseCase)
  })

  it('should be defined', () => {
    expect(findUserByIdUseCase).toBeDefined()
  })
  it('Should return user', async () => {
    mockRepository.findUserById.mockResolvedValue({
      id: '1',
      username: 'username',
      email: 'email',
      password: 'password',
    })
    const result = await findUserByIdUseCase.execute('1')
    expect(result.id).toEqual('1')
  })

  it('should throw NotFoundException', async () => {
    mockRepository.findUserById.mockResolvedValue(null)
    await expect(findUserByIdUseCase.execute('1')).rejects.toThrow()
  })
})
