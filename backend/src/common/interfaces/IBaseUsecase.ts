export interface IBaseUsecase<Params, Response> {
  execute(params: Params): Promise<Response> | Response
}
