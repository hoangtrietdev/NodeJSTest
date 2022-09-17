import '@env';
import 'reflect-metadata';

import path from 'path';

import { json, urlencoded } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import systemConfig from '@core/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api');

  // increase body limit
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: systemConfig.isDebugging,
      disableErrorMessages: systemConfig.isProduction,
      transform: true,
    }),
  );

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // enable cors
  app.enableCors({ credentials: true, origin: true });

  // trust proxy headers
  app.set('trust proxy', 1);

  // enable swagger
  if (systemConfig.enableSwagger) {
    const options = new DocumentBuilder()
      .setTitle('NodeJS Template Backend')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(systemConfig.port, () => {
    Logger.log(
      `🚀 API server listenning on http://localhost:${systemConfig.port}/api`,
      'Bootstrap',
    );
  });
}
bootstrap();
