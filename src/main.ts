import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('VantTec Repository Api')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .setContact('NestJS', 'https://nestjs.com', '')
    .addTag('auth')
    .addTag('users')
    .addTag('repositories')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
