/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ConIdea API')
    .setDescription('The API provides access to data and operations')
    .setVersion('1.0')
    .addTag(globalPrefix)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(globalPrefix, app, documentFactory);
  app.enableCors({
    origin: environment.cors.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  const port = environment.port;
  await app.listen(port);
  Logger.log(
    `🚀 conidea-api is running on port ${port} with prefix /${globalPrefix}`,
  );
}

bootstrap();
