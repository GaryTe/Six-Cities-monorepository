import { Injectable } from '@nestjs/common';

import {appDataSource} from '@project/config';
import {CreateCommentDto} from './dto/create-comment.dto';
import {VALUE_SORTING, LIMIT} from '@project/const';

@Injectable()
export class CommentRepository {
  public async create(dto: CreateCommentDto) {
      const dataComment = await appDataSource.manager.query(`
        INSERT INTO comment
        VALUES (
        DEFAULT, DEFAULT, $1, $2, $3, $4
        )
        RETURNING *
        `,
        [dto.text, dto.rating, dto.idUser, dto.idRent]
      )
      return dataComment.find((item) => item);
  }

  public async getAllComment(idRent: string) {
    const dataCommentList = await appDataSource.manager.query(`
      SELECT *
      FROM comment
      WHERE comment.id_rent = '${idRent}'
      ORDER BY create_at ${VALUE_SORTING}
      LIMIT ${LIMIT}
    `)

    return dataCommentList
  }
}
