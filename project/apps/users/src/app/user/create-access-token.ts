import {
  Injectable,
  BadRequestException,
  Inject
} from '@nestjs/common';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ConfigType} from '@nestjs/config';

import {User} from './user.shema';
import {AuthenticationUserDto} from './dto/authentication-user.dto';
import {applicationConfigUser} from '@project/config';
import {AccessToken, TokenPayload} from '@project/type';
import {verifyPassword} from '@project/util';

@Injectable()
export class CreateAccessToken {
  constructor(
    @Inject(applicationConfigUser.KEY)
    private readonly applicationConfig: ConfigType<typeof applicationConfigUser>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  public async authenticate(user: User): Promise<AccessToken> {
    const jwtAccessSecret = this.applicationConfig.salt;
    const secretKey = crypto.createSecretKey(jwtAccessSecret, 'utf-8');

    const accessTokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      typeUser: user.typeUser
    };

    const accessToken = await new SignJWT(accessTokenPayload)
      .setProtectedHeader({
        alg: this.applicationConfig.jwtAlgorithm,
        typ: this.applicationConfig.typ
      })
      .setIssuedAt()
      .setExpirationTime(this.applicationConfig.jwtAccessExpired)
      .sign(secretKey);

    return {
      accessToken: accessToken
    };
  }

  public async verify(dto: AuthenticationUserDto): Promise<User> {
    const dataUser = await this.userModel.findOne({email: dto.email});

    if (!dataUser) {
      throw new BadRequestException(`User with email: ${dto.email} not authorized. Log in.`);
    }

    if (!(verifyPassword(dto.password, this.applicationConfig.salt, dataUser.password))) {
      throw new BadRequestException('Incorrect user password.');
    }

    return dataUser;
  }
}
