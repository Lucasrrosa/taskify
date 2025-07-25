import { TokenPayload } from '@/modules/auth/types/token-payload'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

type RequestType = {
  userInfo: TokenPayload
}

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<RequestType>()
  return request.userInfo.id
})
