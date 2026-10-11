/**
 * Application bootstrap file for the NestJS messages API.
 *
 * This project is learning-focused and demonstrates how request validation
 * can be enabled at the application boundary before controller handlers run.
 */
import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Starts the app and applies a global ValidationPipe so incoming payloads are
 * validated against DTO metadata automatically.
 */
async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
