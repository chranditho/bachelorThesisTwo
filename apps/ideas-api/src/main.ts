/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IdeasModule } from './ideas/ideas.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IdeasModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ || 'amqp://localhost:5672'],
        queue: 'ideas_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  Logger.log(`🚀 Ideas microservice is running`);
}

void bootstrap();
