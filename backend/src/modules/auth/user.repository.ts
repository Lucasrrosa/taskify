import { UserEntity } from '@/modules/auth/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager())
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return await this.findOne({ where: { id } })
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.findOne({ where: { email } })
  }
}
