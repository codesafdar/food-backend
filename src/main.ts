import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configDotenv } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(3333);
}
bootstrap();