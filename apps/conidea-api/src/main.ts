/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('ConIdea API')
    .setDescription('The API provides access to data and operations')
    .setVersion('1.0')
    .addTag(globalPrefix)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, documentFactory);
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 conidea-api is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
