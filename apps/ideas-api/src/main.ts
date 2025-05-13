/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IdeasModule } from './ideas/ideas.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IdeasModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [environment.rabbitmq.url],
        queue: environment.rabbitmq.queue,
        queueOptions: environment.rabbitmq.queueOptions,
      },
    },
  );
  await app.listen();
  Logger.log(`🚀 Ideas microservice is running`);
}

void bootstrap();
