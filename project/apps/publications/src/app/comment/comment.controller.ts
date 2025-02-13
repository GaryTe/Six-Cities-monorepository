import {
  Controller,
  Post,
  Get,
  Body,
  Param
 } from '@nestjs/common';

import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';
import {CommentService} from './comment.service';
import {fillObject} from '@project/util';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ){}

  @Post('/')
    public async create(@Body() dto: CreateCommentDto) {
      const dataComment = await this.commentService.create(dto);

      return fillObject(CommentRdo, dataComment)
    }

  @Get('/:idRent')
    public async getAllComment(@Param('idRent') idRent: string) {
      const dataCommentList = await this.commentService.getAllComment(idRent);

      return fillObject(CommentRdo, dataCommentList)
  }
}
