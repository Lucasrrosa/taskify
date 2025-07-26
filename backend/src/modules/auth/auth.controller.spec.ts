import { LogUserInUseCase } from '@/modules/auth/usecases/log-user-in/log-user-in.usecase'
import { RegisterUserUseCase } from '@/modules/auth/usecases/register-user/register-user.usecase'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: LogUserInUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RegisterUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
