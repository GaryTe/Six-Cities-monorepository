import { Injectable } from '@nestjs/common';
import {RabbitRPC} from '@golevelup/nestjs-rabbitmq';

import {UserDto} from './dto/user.dto';
import {AuthenticationUserDto} from './dto/authentication-user.dto';
import {UserRepository} from './user.repository';
import {PATH_STATIC_ICON, EXCHANG_NAME, ROUTING_KEY} from '@project/const';
import {CreateAccessToken} from './create-access-token';
import {Comment, Author} from '@project/type';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createAccessToken: CreateAccessToken
  ){}

  public async authorization(dto: UserDto) {
    const dataUser = {
      ...dto,
      avatar: dto.avatar ?? PATH_STATIC_ICON
    }
    return await this.userRepository.authorization(dataUser)
  }

  public async authentication(dto: AuthenticationUserDto) {
    const dataUser = await this.createAccessToken.verify(dto);
    const accessToken = await this.createAccessToken.authenticate(dataUser);

    return accessToken;
  }

  public async conditionUser(tokenPayload: string[]) {
    const dataUser = await this.userRepository.conditionUser(tokenPayload)

    return dataUser
  }

  public async delete(tokenPayload: string[]) {
    const deleteCount = await this.userRepository.delete(tokenPayload)

    return deleteCount;
  }

  @RabbitRPC({
    exchange: EXCHANG_NAME,
    routingKey: ROUTING_KEY,
    queue: '',
    queueOptions: {
      exclusive: true
    }
  })
  public async dataUsersList(payload: Comment[]) {
    const dataUsersList = await this.userRepository.dataUsersList(payload)

    return dataUsersList;
  }
}
