import { IsPublic } from '@/modules/auth/decorators/IsPublic.decorator'
import { LoginParamsDto } from '@/modules/auth/dtos/login-params.dto'
import { RegisterParamsDto } from '@/modules/auth/dtos/register-params.dto'
import { LogUserInUseCase } from '@/modules/auth/usecases/log-user-in/log-user-in.usecase'
import { RegisterUserUseCase } from '@/modules/auth/usecases/register-user/register-user.usecase'
import { Body, Controller, Inject, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly registerUserUseCase: RegisterUserUseCase

  @Inject()
  private readonly logUserInUseCase: LogUserInUseCase

  @IsPublic()
  @Post('login')
  login(@Body() loginDto: LoginParamsDto) {
    return this.logUserInUseCase.execute(loginDto)
  }

  @IsPublic()
  @Post('register')
  register(@Body() registerDto: RegisterParamsDto) {
    return this.registerUserUseCase.execute(registerDto)
  }
}
