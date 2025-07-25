import { EnviromentConfigType } from '@/config/enviroment.config'
import { UserEntity } from '@/modules/auth/entities/user.entity'
import { JwtAuthGuards } from '@/modules/auth/guards/JwtAuthGuard'
import { FindUserByIdUseCase } from '@/modules/auth/usecases/find-user-by-id/find-user-by-id.usecase'
import { LogUserInUseCase } from '@/modules/auth/usecases/log-user-in/log-user-in.usecase'
import { RegisterUserUseCase } from '@/modules/auth/usecases/register-user/register-user.usecase'
import { UserRepository } from '@/modules/auth/user.repository'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnviromentConfigType>) => ({
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuards,
    },
    UserRepository,
    FindUserByIdUseCase,
    RegisterUserUseCase,
    LogUserInUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
