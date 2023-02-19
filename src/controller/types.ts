import { RouterHandler } from '@src/router/types'

export interface Controller {
  controlGetAll: RouterHandler<any, any>;
  controlGetByID: RouterHandler<any, any>;
  controlAdd: RouterHandler<any, any>;
  controlUpdate: RouterHandler<any, any>;
  controlDelete: RouterHandler<any, any>;
}