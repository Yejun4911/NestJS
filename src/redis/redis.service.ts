import { Injectable } from "@nestjs/common";
import { RedisRepository } from "./redis.repository";

@Injectable()
export class RedisService {
  constructor(private readonly redisRepository: RedisRepository) {}

  async getValueFromRedis(key: string) {
    return this.redisRepository.get(key);
  }
  async setValueToRedis(key: string, value: string, ttl: number) {
    return this.redisRepository.set(key, value, ttl);
  }
}
