import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {ConfigService} from '@nestjs/config';
import express from 'express';

import { AppModule } from './app/app.module';
import {GLOBAL_PREFIX, PATH_STATIC_ICON, ROUTE_UPLOAD} from '@project/const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  app.use(
    `/${GLOBAL_PREFIX}${ROUTE_UPLOAD}`,
    express.static(configService.get<string>('application.uploadDirectory'))
  );

  app.use(
    `/${GLOBAL_PREFIX}${PATH_STATIC_ICON}`,
    express.static(configService.get<string>('application.staticDirectory'))
  );

  const host = configService.get<string>('application.host');
  const port = configService.get<number>('application.port');

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${GLOBAL_PREFIX}`
  );
  Logger.log(
    `🎯  Current mode: ${configService.get('application.environment')}`
  )
}

bootstrap();
