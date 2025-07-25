import { IsEmail, IsString } from 'class-validator'

export class LoginParamsDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string
}
