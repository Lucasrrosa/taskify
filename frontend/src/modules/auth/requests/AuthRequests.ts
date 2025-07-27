import { api } from '@/config/api/api'
import type { ILoginParamsDto } from '@/modules/auth/dtos/login-params.dto'
import type { ILoginResponseDto } from '@/modules/auth/dtos/login-response.dto'
import type { IRegisterParamsDto } from '@/modules/auth/dtos/register-params.dto'
import type { AxiosResponse } from 'axios'

export class AuthRequests {
  static async login(params: ILoginParamsDto): Promise<ILoginResponseDto> {
    const response = await api.post<ILoginParamsDto, AxiosResponse<ILoginResponseDto>>('/auth/login', params)
    return response.data
  }
  static async register(params: IRegisterParamsDto): Promise<void> {
    await api.post<IRegisterParamsDto, AxiosResponse<void>>('/auth/register', params)
  }

}