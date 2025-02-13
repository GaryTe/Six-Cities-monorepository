import { registerAs } from '@nestjs/config';
import { validateSync, ValidationError } from 'class-validator';
import {plainToInstance} from 'class-transformer';

import {DatabasePublicationEnvironment} from './database-publication-environment';
import {DatabaseConfigPublication} from '@project/interface';
import {DEFAULT_POSTGRES_PORT} from '@project/const';

export default registerAs('database', (): DatabaseConfigPublication => {
  const databaseConfigPublication: DatabaseConfigPublication = {
    host: process.env.HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) ||  DEFAULT_POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  };

  const databaseEnvironment = plainToInstance(
    DatabasePublicationEnvironment,
    databaseConfigPublication,
    { enableImplicitConversion: true }
  );

  const errors: ValidationError[] | [] = validateSync(
    databaseEnvironment, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    const {constraints} = errors.find((item: ValidationError) => item)
    const err: string = Object.values(constraints).join(',')
    throw new Error(err);
  }

  return databaseConfigPublication;
});
