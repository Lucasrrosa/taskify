import { UserEntity } from '@/modules/auth/entities/user.entity'
import { TaskStatusEnum } from '@/modules/task/enums/task-status.enum'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'enum', enum: TaskStatusEnum, nullable: false, default: TaskStatusEnum.PENDING })
  status: TaskStatusEnum

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn()
  user: UserEntity
}
