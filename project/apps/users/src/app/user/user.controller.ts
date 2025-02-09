import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Inject
} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';

import {UserDto} from './dto/user.dto';
import {UserRto} from './rdo/user.rdo';
import {UserService} from './user.service';
import {applicationConfigUser} from '@project/config';
import {fillObject} from '@project/util';
import {GLOBAL_PREFIX} from '@project/const';

@Controller('user')
export class UserController {
  constructor(
    @Inject(applicationConfigUser.KEY)
    private readonly applicationConfig: ConfigType<typeof applicationConfigUser>,
    private readonly userService: UserService
  ){}

@Post('/authorization')
public async authorization(@Body() dto: UserDto) {
  const dataUser = await this.userService.authorization(dto)
  dataUser.avatar = `http://${this.applicationConfig.host}:${this.applicationConfig.port}/${GLOBAL_PREFIX}${dataUser.avatar}`

  return fillObject(UserRto, dataUser)
}

@Get('/authentication')
public async authentication() {
  return
}

@Get('/')
public async getUser() {
  return
}

@Delete('/')
public async delete() {
  return
}
}
