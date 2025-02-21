import { Module } from '@nestjs/common';

import {RentModule} from './rent/rent.module';
import {CommentModule} from './comment/comment.module';
import {ConfigPublicationModule} from '@project/config';
import {JwtModule} from '@project/jwt';
import {ConfigRabbitmqModule} from '@project/config';

@Module({
  imports: [
    RentModule,
    CommentModule,
    JwtModule,
    ConfigPublicationModule,
    ConfigRabbitmqModule
  ]
})
export class AppModule {}
