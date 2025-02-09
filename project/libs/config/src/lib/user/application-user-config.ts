import { registerAs } from '@nestjs/config';
import { validateSync, ValidationError } from 'class-validator';
import {plainToInstance} from 'class-transformer';

import {ApplicationUserEnvironment} from './application-user-environment';
import {ApplicationConfigUser} from '@project/interface';
import {DEFAULT_APPLICATION_PORT} from '@project/const';

export default registerAs('application', (): ApplicationConfigUser => {
  const applicationConfigUser: ApplicationConfigUser = {
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10) || DEFAULT_APPLICATION_PORT,
    environment: process.env.NODE_ENV,
    salt: process.env.SALT
  };

  const applicationEnvironment = plainToInstance(
    ApplicationUserEnvironment,
    applicationConfigUser,
    { enableImplicitConversion: true }
  );

  const errors: ValidationError[] | [] = validateSync(
    applicationEnvironment, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    const {constraints} = errors.find((item: ValidationError) => item)
    const err: string = Object.values(constraints).join(',')
    throw new Error(err);
  }

  return applicationConfigUser;
});
