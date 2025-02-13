import { ConfigService } from '@nestjs/config';
import {TypeOrmModuleAsyncOptions, TypeOrmModuleOptions} from '@nestjs/typeorm';

import {PATH_TO_REST_SHEMA, PATH_TO_COMMENT_SHEMA} from '@project/const';

export function getPostgresOptions(): TypeOrmModuleAsyncOptions {
  return {
    useFactory: (config: ConfigService): TypeOrmModuleAsyncOptions | TypeOrmModuleOptions => {
      return {
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database'),
        entities: [
          PATH_TO_REST_SHEMA,
          PATH_TO_COMMENT_SHEMA
        ],
        synchronize: true
      }
    },
    inject: [ConfigService]
  }
}
