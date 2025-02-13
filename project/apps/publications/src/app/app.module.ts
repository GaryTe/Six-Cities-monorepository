import { Module } from '@nestjs/common';

import {RentModule} from './rent/rent.module';
import {CommentModule} from './comment/comment.module';
import {ConfigPublicationModule} from '@project/config';

@Module({
  imports: [
    RentModule,
    CommentModule,
    ConfigPublicationModule,
  ]
})
export class AppModule {}
