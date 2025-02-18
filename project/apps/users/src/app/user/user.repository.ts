import { Injectable, Inject } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ConfigType} from '@nestjs/config';

import {User} from './user.shema';
import {UserDto} from './dto/user.dto';
import {applicationConfigUser} from '@project/config';
import {setPassword} from '@project/util';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(applicationConfigUser.KEY)
    private readonly applicationConfig: ConfigType<typeof applicationConfigUser>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ){}

  public async authorization(dto: UserDto) {
    const dataUser = new this.userModel(dto);
    dataUser.password = setPassword(dto.password, this.applicationConfig.salt);

    return await dataUser.save();
    }

  public async conditionUser(tokenPayload: string[]) {
    const dataUser = await this.userModel.findOne({_id: tokenPayload[0], email: tokenPayload[2]})

    return dataUser
  }

  public async delete(tokenPayload: string[]) {
    const deleteCount = await this.userModel.deleteOne({_id: tokenPayload[0], email: tokenPayload[2]})

    return deleteCount;
  }
}
