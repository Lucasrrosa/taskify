import { IsOptional, IsString } from 'class-validator'

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  title: string

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string
}
