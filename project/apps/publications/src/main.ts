import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {ConfigService} from '@nestjs/config';

import { AppModule } from './app/app.module';
import {GLOBAL_PREFIX} from '@project/const';
import { dataSource } from '@project/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  const configService = app.get(ConfigService);

  (await dataSource(
    configService.get<string>('database.host'),
    configService.get<number>('database.port'),
    configService.get<string>('database.username'),
    configService.get<string>('database.password'),
    configService.get<string>('database.database'),

  ))
  .initialize().then(() => {
    Logger.log('Connection established to Postgres !!!');
  })
  .catch((error) => {
    throw new Error (error);
  });

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
