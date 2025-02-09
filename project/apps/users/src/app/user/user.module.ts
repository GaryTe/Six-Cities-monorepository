import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import {User, UserSchema} from './user.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository]
})
export class UserModule {}
