import {
  IsNumber,
  IsString,
  Max,
  Min,
  IsEnum
} from 'class-validator';

import {MIN_PORT, MAX_PORT} from '@project/const';
import {EnvValidationMessage} from '@project/error-validatio';
import {TypeEnvironment} from '@project/enum';

export class ApplicationUserEnvironment {
   @IsString({
    message: EnvValidationMessage.MongoHost
  })
  public host: string;

  @IsNumber({}, {
    message: EnvValidationMessage.MongoPort
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsEnum(
    TypeEnvironment,
    {
      message: EnvValidationMessage.Environment
    }
  )
  public environment: string;

  @IsString({
    message: EnvValidationMessage.Salt
  })
  public salt: string;
}
