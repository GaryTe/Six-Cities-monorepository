import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UserModule} from './user/user.module';
import {ConfigUserModule} from '@project/config';
import {getMongooseOptions} from '@project/config';

@Module({
  imports: [
    UserModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ]
})
export class AppModule {}
