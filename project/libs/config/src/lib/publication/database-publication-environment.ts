import {IsNumber, IsString, Max, Min} from 'class-validator';

import {MIN_PORT, MAX_PORT} from '@project/const';
import {EnvValidationMessageForDatabasePublication} from '@project/error-validatio';

export class DatabasePublicationEnvironment {
  @IsString({
    message: EnvValidationMessageForDatabasePublication.PostgresHost
  })
  public host: string;

   @IsNumber({},
    {
    message: EnvValidationMessageForDatabasePublication.PostgresPort
  })
  @Min(MIN_PORT, {message: EnvValidationMessageForDatabasePublication.PostgresPort})
  @Max(MAX_PORT, {message: EnvValidationMessageForDatabasePublication.PostgresPort})
  public port: number;

  @IsString({
    message: EnvValidationMessageForDatabasePublication.PostgresUsername
  })
  public username: string;

  @IsString({
    message: EnvValidationMessageForDatabasePublication.PostgresPassword
  })
  password: string;

  @IsString({
    message: EnvValidationMessageForDatabasePublication.PostgresDatabase
  })
  public database: string;
}
