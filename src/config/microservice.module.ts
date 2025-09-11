import { Global, Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import {
  SMARTPADEL_SERVICE_CLINT_PROXY_NAME,
  SMARTPADEL_SERVICE_NAME,
} from '../common/info/microservice.info';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: SMARTPADEL_SERVICE_NAME,
          useFactory: (configService: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [
                  configService.getOrThrow<string>(
                    'SMARTPADEL_SERVICE_RABBIT_MQ_URL',
                  ),
                ],
                queue: configService.get<string>(
                  'SMARTPADEL_SERVICE_RABBIT_MQ_QUEUE_NAME',
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
      provide: SMARTPADEL_SERVICE_CLINT_PROXY_NAME,
      useFactory: (client: ClientProxy) => {
        return client;
      },
      inject: [SMARTPADEL_SERVICE_NAME],
    },
  ],
  exports: [SMARTPADEL_SERVICE_CLINT_PROXY_NAME],
})
export class MicroservicesModule {}
