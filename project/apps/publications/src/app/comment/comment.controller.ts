import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
  Inject
 } from '@nestjs/common';
 import {ConfigType} from '@nestjs/config';
 import {Request} from 'express';

import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';
import {CommentService} from './comment.service';
import {fillObject} from '@project/util';
import {CheckAccessTokenGuard} from '@project/jwt';
import {CheckIdRentDatabaseInterceptor} from './functions.interceptor';
import {applicationConfigPublication} from '@project/config';
import {GLOBAL_PREFIX} from '@project/const';

@Controller('comment')
export class CommentController {
  constructor(
    @Inject(applicationConfigPublication.KEY)
    private readonly applicationConfig: ConfigType<typeof applicationConfigPublication>,
    private readonly commentService: CommentService
  ){}

  @UseGuards(CheckAccessTokenGuard)
  @UseInterceptors(CheckIdRentDatabaseInterceptor)
  @Post('/')
    public async create(@Req() req: Request, @Body() dto: CreateCommentDto) {
      const [id, name, email, avatar, typeUser] = req.headers?.tokenPayload as undefined as string[];
      const dataComment = await this.commentService.create({...dto, idUser: id});
      dataComment.idUser = {
        id,
        name,
        email,
        avatar: `http://${this.applicationConfig.host}:${this.applicationConfig.port}/${GLOBAL_PREFIX}${avatar}`,
        typeUser
      }

      return fillObject(CommentRdo, dataComment)
    }

  @UseInterceptors(CheckIdRentDatabaseInterceptor)
  @Get('/:idRent')
    public async getAllComment(@Param('idRent') idRent: string) {
      const dataCommentList = await this.commentService.getAllComment(idRent);

      return fillObject(CommentRdo, dataCommentList)
  }
}
