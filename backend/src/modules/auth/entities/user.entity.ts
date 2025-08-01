import { TaskEntity } from '@/modules/task/task.entity'
import * as bcrypt from 'bcrypt'
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[]

  constructor(data: Partial<UserEntity> = {}) {
    Object.assign(this, data)
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt()
    if (!/^\$2[abxy]?\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt)
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password)
  }
}
