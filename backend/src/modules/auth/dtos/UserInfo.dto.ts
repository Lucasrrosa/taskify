import { UserEntity } from '@/modules/auth/entities/user.entity'

export class UserInfo {
  id: string
  accountId: string
  username: string

  constructor(data: UserEntity) {
    this.id = data.id
    this.username = data.username
  }
}
