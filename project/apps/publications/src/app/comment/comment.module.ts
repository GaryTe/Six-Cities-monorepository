import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import {CommentService} from './comment.service';
import {JwtModule} from '@project/jwt';
import {getRabbitMQOptions} from '@project/config';

@Module({
  imports: [
    JwtModule,
    RabbitMQModule.forRootAsync(
      getRabbitMQOptions()
    )
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository
  ],
})
export class CommentModule {}
