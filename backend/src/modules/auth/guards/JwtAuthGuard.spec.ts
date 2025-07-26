import { IS_PUBLIC_KEY } from '@/modules/auth/decorators/IsPublic.decorator'
import { UserEntity } from '@/modules/auth/entities/user.entity'
import { JwtAuthGuards } from '@/modules/auth/guards/JwtAuthGuard'
import { FindUserByIdUseCase } from '@/modules/auth/usecases/find-user-by-id/find-user-by-id.usecase'
import { ExecutionContext } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

describe('JwtAuthGuard', () => {
  let service: JwtAuthGuards

  const mockJwtService = {
    verifyAsync: jest.fn(),
  }
  const mockReflector = {
    getAllAndOverride: jest.fn(),
  }
  const mockGetUserByIdUsecase = {
    execute: jest.fn(),
  }

  const mockUserReturn: UserEntity = {
    id: '1',
    username: 'username',
    email: 'email',
    password: 'password',
    createdAt: new Date(),
  } as any as UserEntity

  const context = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Bearer token',
        },
      }),
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
  } as unknown as ExecutionContext

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuards,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
        {
          provide: FindUserByIdUseCase,
          useValue: mockGetUserByIdUsecase,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile()

    service = module.get<JwtAuthGuards>(JwtAuthGuards)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('Should return true when route is public', async () => {
    mockReflector.getAllAndOverride.mockReturnValueOnce([IS_PUBLIC_KEY])

    const result = await service.canActivate(context)
    expect(result).toBe(true)
  })

  it('Should return true when token is valid', async () => {
    mockJwtService.verifyAsync.mockResolvedValueOnce(mockUserReturn)
    mockGetUserByIdUsecase.execute.mockResolvedValueOnce(mockUserReturn)

    const result = await service.canActivate(context)
    expect(result).toBe(true)
  })

  it('Should throw UnautorizedException when token is missing', async () => {
    jest.spyOn(context, 'switchToHttp').mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Bearer ',
        },
      }),
    } as unknown as HttpArgumentsHost)
    await expect(service.canActivate(context)).rejects.toThrow(new Error('Unauthorized'))
  })

  it('Should throw UnauthorizedException when token is invalid', async () => {
    mockJwtService.verifyAsync.mockResolvedValueOnce(null)
    await expect(service.canActivate(context)).rejects.toThrow(new Error('Unauthorized'))
  })

  it('Should throw UnauthorizedException when user not found', async () => {
    mockJwtService.verifyAsync.mockResolvedValueOnce(mockUserReturn)
    mockGetUserByIdUsecase.execute.mockResolvedValueOnce(null)
    await expect(service.canActivate(context)).rejects.toThrow(new Error('Unauthorized'))
  })
})
