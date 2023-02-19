import { Post } from "@src/entity";

export interface PostModel {
  validate(post: Post): Error | null;
  create(post: Post): Promise<Post>;
  findAll(): Promise<Post[]>;
  findByID(id: number): Promise<Post | null>;
}