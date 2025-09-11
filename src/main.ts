import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const RABBIT_MQ_URL = String(process.env.RABBIT_MQ_URL);
  const RABBIT_MQ_QUEUE_NAME = String(process.env.RABBIT_MQ_QUEUE_NAME);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RABBIT_MQ_URL],
        queue: RABBIT_MQ_QUEUE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
