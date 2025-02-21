import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRepository} from './comment.repository';
import {Comment} from '@project/type';
import {getDataUsersList} from '@project/util';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly amqpConnection: AmqpConnection
  ){}

  public async create(dto: CreateCommentDto) {
    const dataComment = await this.commentRepository.create(dto);

    return dataComment;
  }

  public async getAllComment(idRent: string) {
    const dataCommentList: Comment[] = await this.commentRepository.getAllComment(idRent);

    if(dataCommentList.length === 0) {
      return dataCommentList
    }

    const _dataCommentList = await getDataUsersList(this.amqpConnection, dataCommentList)

    return _dataCommentList;
  }
}
