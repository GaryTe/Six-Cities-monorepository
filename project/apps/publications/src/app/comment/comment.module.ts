import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import {CommentService} from './comment.service';
import {JwtModule} from '@project/jwt';

@Module({
  imports: [JwtModule],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository
  ],
})
export class CommentModule {}
