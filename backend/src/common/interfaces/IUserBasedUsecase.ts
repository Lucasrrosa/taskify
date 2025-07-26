export interface IUserBasedUsecase<TParams, TResult> {
  execute(params: TParams, userId: string): Promise<TResult>
}
