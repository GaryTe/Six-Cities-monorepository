import {IsNumber, IsString, Max, Min} from 'class-validator';

import {MIN_PORT, MAX_PORT} from '@project/const';
import {EnvValidationMessageForDatabaseUser} from '@project/error-validatio';

export class DatabaseUserEnvironment {
  @IsString({
    message: EnvValidationMessageForDatabaseUser.MongoUser
  })
  public userName: string;

  @IsString({
    message: EnvValidationMessageForDatabaseUser.MongoPassword
  })
  public password: string;

   @IsString({
    message: EnvValidationMessageForDatabaseUser.MongoHost
  })
  public host: string;

  @IsNumber({}, {
    message: EnvValidationMessageForDatabaseUser.MongoPort
  })
  @Min(MIN_PORT, {message: EnvValidationMessageForDatabaseUser.MongoPort})
  @Max(MAX_PORT, {message: EnvValidationMessageForDatabaseUser.MongoPort})
  public port: number;

  @IsString({
    message: EnvValidationMessageForDatabaseUser.MongoDB
  })
  dataBase: string;

  @IsString({
    message: EnvValidationMessageForDatabaseUser.MongoAuthSource
  })
  public authSource: string;
}
