import { Injectable } from '@nestjs/common';

import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRepository} from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ){}

  public async create(dto: CreateCommentDto) {
    const dataComment = await this.commentRepository.create(dto);

    return dataComment;
  }

  public async getAllComment(idRent: string) {
    const dataCommentList = await this.commentRepository.getAllComment(idRent);

    return dataCommentList
  }
}
