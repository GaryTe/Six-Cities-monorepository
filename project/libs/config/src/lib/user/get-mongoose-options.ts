import { getMongoConnectionString } from '@project/util';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          userName: config.get<string>('database.userName'),
          password: config.get<string>('database.password'),
          host: config.get<string>('database.host'),
          port: config.get<string>('database.port')
        })
      }
    },
    inject: [ConfigService]
  }
}
