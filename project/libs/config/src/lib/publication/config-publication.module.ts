import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {ENV_PUBLICATION_FILE_PATH} from '@project/const';
import applicationConfigPublication from './application-publication-config';
import databaseConfigPublication from './database-publication-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfigPublication, databaseConfigPublication],
      envFilePath: ENV_PUBLICATION_FILE_PATH
    })
  ]
})
export class ConfigPublicationModule {}
