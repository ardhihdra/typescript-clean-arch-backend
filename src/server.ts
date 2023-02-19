import * as dotenv from 'dotenv';
import { PostRepository, FirestoreRepository } from './repository';
import { PostModel, PostService } from './models';
import { PostCache } from './cache';
import { PostController } from './controller';
import { RouterType, ExpressRouter } from './router';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 8000;

const postRepo: PostRepository = new FirestoreRepository();
const postModel: PostModel = new PostService(postRepo);
const postCache: PostCache = new PostCache('localhost', 1, 10);
const httpRouter: RouterType = new ExpressRouter();
const postController: PostController = new PostController(postModel, postCache, httpRouter);

// httpRouter.get('/', (res: http.ServerResponse, req: http.IncomingMessage) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello from server!');
//   res.end();
// });

httpRouter.get('/', postController.controlGetAll.bind(postController));
// httpRouter.get('/posts', postController.controlGetAll);
httpRouter.get('/posts/:id', postController.controlGetByID.bind(postController));
httpRouter.post('/posts', postController.controlAdd.bind(postController));
httpRouter.serve(PORT);
