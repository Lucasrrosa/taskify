import { IBaseUsecase } from '@/common/interfaces/IBaseUsecase'
import { UserEntity } from '@/modules/auth/entities/user.entity'
import { UserRepository } from '@/modules/auth/user.repository'
import { Inject, NotFoundException } from '@nestjs/common'

export class FindUserByIdUseCase implements IBaseUsecase<string, UserEntity> {
  @Inject()
  private readonly userRepository: UserRepository
  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }
}
