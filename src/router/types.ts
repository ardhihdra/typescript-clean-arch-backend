// export interface ResponseType {
//   response(status: number, payload: any): any
// }
export type RouterRequestType<T> = T
export type RouterResponseType<T> = T

export interface RouterType {
  responseType: RouterResponseType<any>
  requestType: RouterRequestType<any>
	get(endpoint: String, handler: RouterHandler<RouterRequestType<any>, RouterResponseType<any>>): any
	post(endpoint: String, handler: RouterHandler<RouterRequestType<any>, RouterResponseType<any>>): any
	put(endpoint: String, handler: RouterHandler<RouterRequestType<any>, RouterResponseType<any>>): any
	patch(endpoint: String, handler: RouterHandler<RouterRequestType<any>, RouterResponseType<any>>): any
	delete(endpoint: String, handler: RouterHandler<RouterRequestType<any>, RouterResponseType<any>>): any
	serve(port: number): any
  response(res: RouterResponseType<any>, status: number, payload: any): any
}


export type RouterHandler<ResponseType, RequestType> = (req: RequestType, res: ResponseType) => any