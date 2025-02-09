import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {User} from './user.shema';
import {UserDto} from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ){}

  public async authorization(dto: UserDto) {
    const dataUser = new this.userModel(dto);
    return await dataUser.save();
    }
}
