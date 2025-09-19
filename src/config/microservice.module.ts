import { Global, Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import {
  SERVICE_CLINT_PROXY_NAME,
  SERVICE_NAME,
} from '../common/info/microservice.info';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: SERVICE_NAME,
          useFactory: (configService: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [
                  configService.getOrThrow<string>(
                    'SERVICE_RABBIT_MQ_URL',
                  ),
                ],
                queue: configService.get<string>(
                  'SERVICE_RABBIT_MQ_QUEUE_NAME',
                ),
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
  ],
  providers: [
    {
      provide: SERVICE_CLINT_PROXY_NAME,
      useFactory: (client: ClientProxy) => {
        return client;
      },
      inject: [SERVICE_NAME],
    },
  ],
  exports: [SERVICE_CLINT_PROXY_NAME],
})
export class MicroservicesModule {}
