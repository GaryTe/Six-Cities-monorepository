import { registerAs } from '@nestjs/config';
import { validateSync, ValidationError } from 'class-validator';
import {plainToInstance} from 'class-transformer';

import {DatabaseUserEnvironment} from './database-user-environment';
import {DatabaseConfigUser} from '@project/interface';
import {DEFAULT_MONGO_PORT} from '@project/const';

export default registerAs('database', (): DatabaseConfigUser => {
  const databaseConfigUser: DatabaseConfigUser = {
    userName: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || DEFAULT_MONGO_PORT,
    dataBase: process.env.MONGO_DB,
    authSource: process.env.MONGO_AUTH_SOURCE,
  };

  const databaseEnvironment = plainToInstance(
    DatabaseUserEnvironment,
    databaseConfigUser,
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

  return databaseConfigUser;
});
