import { IsEmail, IsString } from 'class-validator'

export class RegisterParamsDto {
  @IsString()
  @IsEmail()
  email: string
  @IsString()
  password: string
  @IsString()
  username: string
}
