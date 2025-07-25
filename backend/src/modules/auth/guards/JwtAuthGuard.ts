import { IS_PUBLIC_KEY } from '@/modules/auth/decorators/IsPublic.decorator'
import { UserInfo } from '@/modules/auth/dtos/UserInfo.dto'
import { TokenPayload } from '@/modules/auth/types/token-payload'
import { FindUserByIdUseCase } from '@/modules/auth/usecases/find-user-by-id/find-user-by-id.usecase'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuards implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly getUserByIdUsecase: FindUserByIdUseCase,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const authMetaData = this.reflector.getAllAndOverride<string[]>('auth', [context.getHandler(), context.getClass()])

    if (authMetaData?.includes(IS_PUBLIC_KEY)) return true
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException()

    try {
      const payload: TokenPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      if (!payload) throw new UnauthorizedException()
      const user = await this.getUserByIdUsecase.execute(payload.id)
      if (!user) throw new UnauthorizedException()
      request['userInfo'] = new UserInfo(user)
    } catch (error) {
      throw new UnauthorizedException((error as Error)?.message)
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
