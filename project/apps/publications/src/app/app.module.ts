import { Module } from '@nestjs/common';

import {RentModule} from './rent/rent.module';
import {CommentModule} from './comment/comment.module';
import {ConfigPublicationModule} from '@project/config';
import {JwtModule} from '@project/jwt';

@Module({
  imports: [
    RentModule,
    CommentModule,
    JwtModule,
    ConfigPublicationModule,
  ]
})
export class AppModule {}
