import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './infrastructure/features/app/app.module';
import { appConfig } from './infrastructure/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(appConfig.cors);
  await app.listen(appConfig.port ?? 8023);

  Logger.log(`App is running on port ${appConfig.port}`);
}

bootstrap();
