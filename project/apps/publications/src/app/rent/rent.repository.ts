import { Injectable } from '@nestjs/common';

import {appDataSource} from '@project/config';
import {CreateRentDto} from './dto/create-rent.dto';
import {getPreparedData} from '@project/util';
import {COUNT, VALUE_SORTING} from '@project/const';

@Injectable()
export class RentRepository {
  public async create(dto: CreateRentDto) {
    const dataRent = await appDataSource.manager.query(`
      INSERT INTO rent
        VALUES (
        DEFAULT, DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )
        RETURNING *
      `,[
        dto.name,
        dto.description,
        dto.city,
        dto.preverteringImage,
        dto.photosHousing,
        dto.premium,
        dto.favorites,
        dto.typeHousing,
        dto.numberRoom,
        dto.numberGuest,
        dto.priceRent,
        dto.comfort,
        dto.idUser,
        dto.coordinates
      ]
    )

    return dataRent.find((item) => item);
}

public async getAllRent(limit: string) {
  const valueLimit = limit ? Number(limit) : COUNT;

    const dataRentList = await appDataSource.manager.query(`
      SELECT
      rent.id,
      rent.create_at,
      rent.name,
      rent.city,
      rent.prevertering_image,
      rent.premium,
      rent.type_housing,
      rent.price_rent,
      SUM(comment.rating) AS "rating",
      COUNT(comment.id) AS "numberComments"
      FROM rent LEFT JOIN comment
      ON rent.id::text = comment.id_rent
      GROUP BY ALL((rent.id))
      ORDER BY create_at ${VALUE_SORTING}
      LIMIT ${valueLimit}
    `)

    return dataRentList
}

public async editing(dto: CreateRentDto, idRent: string) {
  const preparedData = getPreparedData(dto)

  const dataRent = await appDataSource.manager.query(`
    WITH dataComment AS (
      SELECT
          SUM(comment.rating) AS "rating",
          COUNT(comment.id) AS number_comments
          FROM comment
          WHERE comment.id_rent = '${idRent}'
      )
      UPDATE rent
      SET ${preparedData}
      FROM dataComment
      WHERE rent.id = '${idRent}'
      RETURNING
      *,
      dataComment.rating,
      dataComment.number_comments AS "numberComments"
    `)

  return dataRent.find((item) => item).find((item) => item);
}

public async delete(idRent: string) {
  const dataDelete = await appDataSource.manager.query(`
    WITH dataComment AS (
      DELETE FROM comment
      WHERE comment.id_rent = '${idRent}'
      )
      DELETE FROM rent
      WHERE rent.id = '${idRent}'
    `)

  return dataDelete.find((item: unknown) => typeof item === 'number')
}

public async show(idRent: string) {
  const dataRent = await appDataSource.manager.query(`
    WITH dataComment AS (
      SELECT
          SUM(comment.rating) AS "rating",
          COUNT(comment.id) AS "numberComments"
          FROM comment
          WHERE comment.id_rent = '${idRent}'
      )
      SELECT *
      FROM rent JOIN dataComment
      ON rent.id = '${idRent}'
    `)

  return dataRent.find((item) => item);
}
}
