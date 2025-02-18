import {
  IsNumber,
  IsString,
  Max,
  Min,
  IsEnum
} from 'class-validator';

import {MIN_PORT, MAX_PORT} from '@project/const';
import {EnvValidationMessageForAppPublication} from '@project/error-validatio';
import {TypeEnvironment} from '@project/enum';

export class ApplicationPublicationEnvironment {
   @IsString({
    message: EnvValidationMessageForAppPublication.AppHost
  })
  public host: string;

  @IsNumber({}, {
    message: EnvValidationMessageForAppPublication.AppPort
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsEnum(
    TypeEnvironment,
    {
      message: EnvValidationMessageForAppPublication.Environment
    }
  )
  public environment: string;

  @IsString({
      message: EnvValidationMessageForAppPublication.Salt
    })
    public salt: string;

  @IsString({
      message: EnvValidationMessageForAppPublication.StaticDirectory
    })
    public staticDirectory: string;
}
