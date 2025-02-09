import { Injectable } from '@nestjs/common';

import {UserDto} from './dto/user.dto';
import {UserRepository} from './user.repository';
import {PATH_STATIC_ICON} from '@project/const';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ){}

  public async authorization(dto: UserDto) {
    const dataUser = {
      ...dto,
      avatar: dto.avatar ?? PATH_STATIC_ICON
    }
    return await this.userRepository.authorization(dataUser)
  }
}
