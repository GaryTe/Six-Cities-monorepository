import {
  Injectable,
  CanActivate,
  ExecutionContext
} from '@nestjs/common';
import {Request} from 'express';

import {ParseAccessToken} from './parse-access-token';

@Injectable()
export class CheckAccessTokenGuard implements CanActivate {
  constructor(
    private readonly parseAccessToken: ParseAccessToken
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    return await this.parseAccessToken.execute(context.switchToHttp().getRequest<Request>());
  }
}
