import { RegisterParamsDto } from '@/modules/auth/dtos/register-params.dto'
import { UserRepository } from '@/modules/auth/user.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class RegisterUserUseCase {
  @Inject()
  private readonly userRepository: UserRepository

  async execute(userData: RegisterParamsDto): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const user = this.userRepository.create(userData)
    await this.userRepository.save(user)
  }
}
