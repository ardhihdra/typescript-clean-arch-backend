import { PostRepository } from "@src/repository";
import { Post } from "@src/entity";
import { PostModel } from "./types";

export class PostService implements PostModel {
  private readonly repo: PostRepository;
  constructor(repository: PostRepository) {
    this.repo = repository;
  }
  validate(post: Post): Error | null {
    if (post == null) {
      const err = new Error("post cannot be empty");
      return err;
    }
    if (post.title == "") {
      const err = new Error("post title cannot be empty");
      return err;
    }
    return null;
  }
  create(post: Post): Promise<Post> {
    post.id = Math.floor(Math.random() * 10000);
    return this.repo.Save(post);
  }
  findAll(): Promise<Post[]> {
    const val: Post = { id: 1, title: 'haha', text: 'hihi'}
    return new Promise((res, rej) => {
      res([val])
    });
    // return this.repo.FindAll();
  }
  findByID(id: number): Promise<Post | null> {
    return this.repo.FindByID(id);
  }
}
