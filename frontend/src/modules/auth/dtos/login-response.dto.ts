export interface ILoginResponseDto {
  accessToken: string
  user: {
    id: string
    email: string
    username: string
  }
}
