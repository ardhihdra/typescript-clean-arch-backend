import express, { Response, Request } from 'express'
import { RouterType, RouterResponseType, RouterHandler } from './types'

type ExpressType  = RouterHandler<Response, Request>

export class ExpressRouter implements RouterType {
  responseType: Response
  requestType: Request
  app: any

  constructor() {
    this.app = express()
  }

  get(endpoint: String, handler: ExpressType): any {
    return this.app.get(endpoint, handler)
  }

  post(endpoint: String, handler: ExpressType): any {
    return this.app.post(endpoint, handler)
  }

  put(endpoint: String, handler: ExpressType): any {
    return this.app.put(endpoint, handler)
  }

  patch(endpoint: String, handler: ExpressType): any {
    return this.app.patch(endpoint, handler)
  }

  delete(endpoint: String, handler: ExpressType): any {
    return this.app.delete(endpoint, handler)
  }

  serve(port: number) {
    return this.app.listen(port, () => {
      console.log(`Express app listening on port ${port}`)
    })
  }

  response(res: RouterResponseType<Response>, status: number, payload: any) {
    console.log("CEK RES", res.status, res.send)
    return res.status(status).send(payload)
  }
}