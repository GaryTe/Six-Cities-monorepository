import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {ENV_USERS_FILE_PATH} from '@project/const';
import applicationConfigUser from './application-user-config';
import databaseConfigUser from './database-user-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfigUser, databaseConfigUser],
      envFilePath: ENV_USERS_FILE_PATH
    })
  ]
})
export class ConfigUserModule {}
