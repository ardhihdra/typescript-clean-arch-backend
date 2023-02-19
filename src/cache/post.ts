import Redis, { createClient } from 'redis';
import { Post } from '@src/entity';
import { Cache } from './types';
import { promisify } from 'util';

export class PostCache implements Cache<Post> {
  private client: Redis.RedisClientType;
  private readonly expires: number;

  constructor(host: string, db: number, expires: number) {
    this.client = createClient({ url: `redis://alice:foobared@${host}:6380` });
    this.expires = expires;
  }

  set(key: string, value: Post): void {
    const setAsync = promisify(this.client.set).bind(this.client);
    setAsync(key, JSON.stringify(value), 'EX', this.expires).catch((err) => {
      throw err;
    });
  }

  async get(key: string): Promise<Post | null> {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key).catch((err) => {
      throw err;
    });
    if (!value) return null;
    return JSON.parse(value) as Post;
  }
}