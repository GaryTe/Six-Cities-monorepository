import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq'

import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import {CreateAccessToken} from './create-access-token';
import {User, UserSchema} from './user.shema';
import {JwtModule} from '@project/jwt';
import {getRabbitMQOptions} from '@project/config';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RabbitMQModule.forRootAsync(
      getRabbitMQOptions()
    )
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, CreateAccessToken]
})
export class UserModule {}
