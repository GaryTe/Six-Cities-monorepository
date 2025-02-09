import {IsNumber, IsString, Max, Min} from 'class-validator';

import {MIN_PORT, MAX_PORT} from '@project/const';
import {EnvValidationMessage} from '@project/error-validatio';

export class DatabaseUserEnvironment {
  @IsString({
    message: EnvValidationMessage.MongoUser
  })
  public userName: string;

  @IsString({
    message: EnvValidationMessage.MongoPassword
  })
  public password: string;

   @IsString({
    message: EnvValidationMessage.MongoHost
  })
  public host: string;

  @IsNumber({}, {
    message: EnvValidationMessage.MongoPort
  })
  @Min(MIN_PORT, {message: EnvValidationMessage.MongoPort})
  @Max(MAX_PORT, {message: EnvValidationMessage.MongoPort})
  public port: number;

  @IsString({
    message: EnvValidationMessage.MongoDB
  })
  dataBase: string;

  @IsString({
    message: EnvValidationMessage.MongoAuthSource
  })
  public authSource: string;
}
