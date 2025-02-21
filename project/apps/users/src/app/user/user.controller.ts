import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Inject,
  UseInterceptors,
  UseGuards,
  Req,
  UploadedFile
} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {Request, Express} from 'express'
import {FileInterceptor} from '@nestjs/platform-express';
import 'multer';

import {UserDto} from './dto/user.dto';
import {AuthenticationUserDto} from './dto/authentication-user.dto';
import {UserRto} from './rdo/user.rdo';
import {UserService} from './user.service';
import {applicationConfigUser} from '@project/config';
import {fillObject} from '@project/util';
import {GLOBAL_PREFIX} from '@project/const';
import {
  CheckEmailDatabaseInterceptor,
  CheckUserDatabaseInterceptor
} from './functions.interceptor';
import {CheckAccessTokenGuard} from '@project/jwt';
import {NAME_FILE} from '@project/const';
import {UploadFile} from '@project/upload-file';


@Controller('user')
export class UserController {
  constructor(
    @Inject(applicationConfigUser.KEY)
    private readonly applicationConfig: ConfigType<typeof applicationConfigUser>,
    private readonly userService: UserService,
    private readonly uploadFile: UploadFile
  ){}

@Post('/avatar')
@UseInterceptors(FileInterceptor(NAME_FILE))
public async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
  const avatarPath = await this.uploadFile.execute(file, this.applicationConfig.uploadDirectory)
  return avatarPath
}

@UseInterceptors(CheckEmailDatabaseInterceptor)
@Post('/authorization')
public async authorization(@Body() dto: UserDto) {
  const dataUser = await this.userService.authorization(dto)
  dataUser.avatar = `http://${this.applicationConfig.host}:${this.applicationConfig.port}/${GLOBAL_PREFIX}${dataUser.avatar}`

  return fillObject(UserRto, dataUser)
}

@Get('/authentication')
public async authentication(@Body() dto: AuthenticationUserDto) {
  const accessToken = await this.userService.authentication(dto)

  return accessToken;
}

@UseGuards(CheckAccessTokenGuard)
@UseInterceptors(CheckUserDatabaseInterceptor)
@Get('/')
public async conditionUser(@Req() req: Request) {
  const tokenPayload = req.headers?.tokenPayload as undefined as string[];
  const dataUser = await this.userService.conditionUser(tokenPayload)
  if(dataUser) {
    dataUser.avatar = `http://${this.applicationConfig.host}:${this.applicationConfig.port}/${GLOBAL_PREFIX}${dataUser.avatar}`
  }

  return dataUser ? fillObject(UserRto, dataUser) : `User with email: ${tokenPayload[2]},dose not exist in the database.`
}

@UseGuards(CheckAccessTokenGuard)
@UseInterceptors(CheckUserDatabaseInterceptor)
@Delete('/')
public async delete(@Req() req: Request) {
  const tokenPayload = req.headers?.tokenPayload as undefined as string[];
  const {deletedCount} = await this.userService.delete(tokenPayload)

  return deletedCount ? `User ${tokenPayload[1]}, were removed.` : `TThe user ${tokenPayload[1]}, was not deleted.`
}
}
