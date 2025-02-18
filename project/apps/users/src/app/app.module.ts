import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UserModule} from './user/user.module';
import {ConfigUserModule} from '@project/config';
import {getMongooseOptions} from '@project/config';
import {JwtModule} from '@project/jwt';

@Module({
  imports: [
    UserModule,
    ConfigUserModule,
    JwtModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ]
})
export class AppModule {}
