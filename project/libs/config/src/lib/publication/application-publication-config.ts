import { registerAs } from '@nestjs/config';
import { validateSync, ValidationError } from 'class-validator';
import {plainToInstance} from 'class-transformer';

import {ApplicationPublicationEnvironment} from './application-publication-environment';
import {ApplicationConfigPublicatin} from '@project/interface';
import {DEFAULT_APPLICATION_PUBLICATION_PORT} from '@project/const';

export default registerAs('application', (): ApplicationConfigPublicatin => {
  const applicationConfigPublication: ApplicationConfigPublicatin = {
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10) || DEFAULT_APPLICATION_PUBLICATION_PORT,
    environment: process.env.NODE_ENV
  };

  const applicationEnvironment = plainToInstance(
    ApplicationPublicationEnvironment,
    applicationConfigPublication,
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

  return applicationConfigPublication;
});
