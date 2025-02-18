import {
  Injectable,
  Inject,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import {ConfigType} from '@nestjs/config';

import {applicationConfigUser} from '@project/config';
import { TokenPayload } from '@project/type';

function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('typeUser' in payload && typeof payload.typeUser === 'string') &&
    ('avatar' in payload && typeof payload.avatar === 'string') &&
    ('email' in payload && typeof payload.email === 'string') &&
    ('name' in payload && typeof payload.name === 'string') &&
    ('id' in payload && typeof payload.id === 'string')
  );
}

@Injectable()
export class ParseAccessToken {
  constructor(
    @Inject(applicationConfigUser.KEY)
    private readonly applicationConfig: ConfigType<typeof applicationConfigUser>
  ) {}

  public async execute(req: Request): Promise<boolean> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      throw new BadRequestException(`In the request, the heading of the 'Authorization' was not found. Add the title 'Authorization' to the request.`);
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.applicationConfig.salt, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.headers['tokenPayload'] = [payload.id, payload.name, payload.email, payload.avatar, payload.typeUser]
        return true;
      } else {
        throw new Error('Bad accessToken');
      }
    } catch {
      throw new UnauthorizedException('Invalid accessToken.');
    }
  }
}
