import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {ENV_RABBITMQ_FILE_PATH} from '@project/const';
import configRabbitmq from './rabbitmq-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configRabbitmq],
      envFilePath: ENV_RABBITMQ_FILE_PATH
    })
  ]
})
export class ConfigRabbitmqModule {}
