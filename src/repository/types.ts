import { Post } from '@src/entity';

export interface PostRepository {
  Save(post: Post): Promise<Post>;
  FindAll(): Promise<Post[]>;
  FindByID(id: number): Promise<Post>;
}