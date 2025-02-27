import { CacheModule, CacheModuleOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";

export const RedisCacheModule = CacheModule.registerAsync<RedisClientOptions>({
  isGlobal: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): CacheModuleOptions => ({
    store: redisStore,
    host: configService.getOrThrow<string>("REDIS_HOST"),
    port: configService.getOrThrow<number>("REDIS_PORT"),
    db: 0,
  }),
});
