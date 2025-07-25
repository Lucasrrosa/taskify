import { IBaseUsecase } from '@/common/interfaces/IBaseUsecase'
import { LoginParamsDto } from '@/modules/auth/dtos/login-params.dto'
import { ILoginResponseDto } from '@/modules/auth/dtos/login-response.dto'
import { TokenPayload } from '@/modules/auth/types/token-payload'
import { UserRepository } from '@/modules/auth/user.repository'
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class LogUserInUseCase implements IBaseUsecase<LoginParamsDto, ILoginResponseDto> {
  @Inject()
  private readonly userRepository: UserRepository

  @Inject()
  private readonly jwtService: JwtService

  async execute(loginData: LoginParamsDto): Promise<ILoginResponseDto> {
    const user = await this.userRepository.findByEmail(loginData.email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const isValidPassword = await user.checkPassword(loginData.password)
    if (!isValidPassword) {
      throw new BadRequestException('Password is invalid')
    }
    const tokenPayload: TokenPayload = { id: user.id, username: user.username }
    const accessToken = this.jwtService.sign(tokenPayload)
    return {
      user: {
        email: user.email,
        username: user.username,
        id: user.id,
      },
      accessToken,
    }
  }
}
