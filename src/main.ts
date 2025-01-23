import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './infrastructure/features/app/app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(port ?? 8023);
  Logger.log(`App is running on port ${port}`);
}

bootstrap();
