import { PostCache } from '@src/cache';
import { PostModel } from '@src/models';
import { ServiceError } from '../errors';
import { Controller } from './types';
import { RouterType, RouterResponseType, RouterRequestType } from '@src/router/types'

export class PostController implements Controller {
  private postCache: PostCache;
  private postModel: PostModel;
  private postRouter: RouterType;

  constructor(postModel: PostModel, postCache: PostCache, postRouter: RouterType) {
    this.postModel = postModel;
    this.postCache = postCache;
    this.postRouter = postRouter;
  }

  async controlGetAll(req: RouterRequestType<any>, res: RouterResponseType<any>): Promise<any> {
    try {
      const posts = await this.postModel.findAll();
      return this.postRouter.response(res, 200, posts);
    } catch (err) {
      return this.postRouter.response(res, 500, new ServiceError('Error getting posts'));
      // res.status(500).json(new ServiceError('Error getting posts'));
    }
  }

  async controlGetByID(req: RouterRequestType<any>, res: RouterResponseType<any>): Promise<any> {
    res.setHeader('Content-Type', 'application/json');
    const postID = req.params.id;
    const cachedPost = this.postCache.get(postID);
    if (cachedPost !== undefined) {
      return this.postRouter.response(res, 200, cachedPost);
      // res.status(200).json(cachedPost);
    }
    try {
      const post = await this.postModel.findByID(Number(postID));
      if (post === undefined) {
        return this.postRouter.response(res, 404, new ServiceError('No posts found'));
      } else {
        this.postCache.set(postID, post);
        return this.postRouter.response(res, 200, post);
      }
    } catch (err) {
        return this.postRouter.response(res, 500, new ServiceError('Error getting post'));
        // res.status(500).json(new ServiceError('Error getting post'));
    }
  }

  async controlAdd(req: RouterRequestType<any>, res: RouterResponseType<any>): Promise<any> {
    res.setHeader('Content-Type', 'application/json');
    const post = req.body;
    if (!post) {
      return this.postRouter.response(res, 400, new ServiceError('Post is required'));
    }
    try {
      if (await this.postModel.validate(post)) {
        const result = await this.postModel.create(post);
        return this.postRouter.response(res, 201, result);
      } else {
        return this.postRouter.response(res, 400, new ServiceError('Post is invalid'));
      }
    } catch (err) {
        return this.postRouter.response(res, 500, new ServiceError('Error adding post'));
        // res.status(500).json(new ServiceError('Error adding post'));
    }
  }

  async controlUpdate(req: RouterRequestType<any>, res: RouterResponseType<any>): Promise<any> {

  }

  async controlDelete(req: RouterRequestType<any>, res: RouterResponseType<any>): Promise<any> {
    
  }
}