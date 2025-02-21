import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {UserModule} from './user/user.module';
import {ConfigUserModule} from '@project/config';
import {getMongooseOptions} from '@project/config';
import {JwtModule} from '@project/jwt';
import {ConfigRabbitmqModule} from '@project/config';
import {getRabbitMQOptions} from '@project/config';

@Module({
  imports: [
    UserModule,
    ConfigUserModule,
    ConfigRabbitmqModule,
    JwtModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    RabbitMQModule.forRootAsync(
      getRabbitMQOptions()
    )
  ]
})
export class AppModule {}
