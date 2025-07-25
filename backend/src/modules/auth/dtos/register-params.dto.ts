import { IsEmail, IsString } from 'class-validator'

export class RegisterParamsDto {
  @IsString()
  @IsEmail()
  email: string
  @IsString()
  password: string
  @IsString()
  name: string
  @IsString()
  username: string
}
