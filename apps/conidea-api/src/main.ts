import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ConIdea API')
    .setDescription('API for managing ideas, users, and drafts')
    .setVersion('1.0')
    .addTag('conidea')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3100;
  await app.listen(port);
  Logger.log(
    `🚀 conidea-api is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(
    `📚 Swagger UI available at: http://localhost:${port}/${globalPrefix}/docs`,
  );
}

bootstrap();
