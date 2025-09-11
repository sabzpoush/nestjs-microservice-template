import { Module } from '@nestjs/common';
import { RedisHelperService } from './redis-helper.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { REDIS_CLIENT } from '../../common/info/redis.info';

@Module({
  providers: [
    RedisHelperService,
    {
      provide: REDIS_CLIENT,
      useFactory: async (configService: ConfigService) => {
        const client = createClient({
          url: `redis://${configService.get<number>('REDIS_HOST')}:${configService.get<number>('REDIS_PORT')}`,
          // password: configService.get<number>('REDIS_PASSWORD'),
        });

        client.on('error', (err) => console.error('Redis error:', err));

        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS_CLIENT, RedisHelperService],
})
export class RedisHelperModule {}
