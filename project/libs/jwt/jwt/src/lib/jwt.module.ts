import { Module } from '@nestjs/common';

import {CheckAccessTokenGuard} from './check-access-token.guard';
import {ParseAccessToken} from './parse-access-token';

@Module({
  providers: [CheckAccessTokenGuard, ParseAccessToken],
  exports: [CheckAccessTokenGuard , ParseAccessToken]
})
export class JwtModule {}
