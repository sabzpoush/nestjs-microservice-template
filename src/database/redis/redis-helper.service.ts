import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CLIENT } from '../../common/info/redis.info';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisHelperService {
  private redisPrefix: string;

  constructor(
    @Inject(REDIS_CLIENT) private readonly client: RedisClientType,
    private readonly configService: ConfigService,
  ) {
    this.redisPrefix = configService.get<string>('REDIS_PREFIX', '');
  }

  get(key: string) {
    return this.client.get(this.redisPrefix + key);
  }

  async setOrThrow(key: string, value: string | number, ttl?: number) {
    const result = await this.client.set(this.redisPrefix + key, value, {
      EX: ttl,
    });
    if (!result) throw new Error("key didn't set in redis");
    return result;
  }

  delete(key: string) {
    return this.client.del(this.redisPrefix + key);
  }
}
