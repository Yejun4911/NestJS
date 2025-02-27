import { Injectable, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisRepository {
  constructor(@Inject(Cache) private readonly redis: Cache) {}

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl?: number) {
    await this.redis.set(key, value, ttl);
  }
  async del(key: string) {
    return this.redis.del(key);
  }
}
