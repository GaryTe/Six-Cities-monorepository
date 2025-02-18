import {
  IsNumber,
  IsString,
  Max,
  Min,
  IsEnum
} from 'class-validator';

import {MIN_PORT, MAX_PORT} from '@project/const';
import {EnvValidationMessageForAppUser} from '@project/error-validatio';
import {TypeEnvironment} from '@project/enum';

export class ApplicationUserEnvironment {
   @IsString({
    message: EnvValidationMessageForAppUser.Host
  })
  public host: string;

  @IsNumber({}, {
    message: EnvValidationMessageForAppUser.Port
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsEnum(
    TypeEnvironment,
    {
      message: EnvValidationMessageForAppUser.Environment
    }
  )
  public environment: string;

  @IsString({
    message: EnvValidationMessageForAppUser.Salt
  })
  public salt: string;

  @IsString({
    message: EnvValidationMessageForAppUser.JwtAlgorithm
  })
  public jwtAlgorithm: string;

  @IsString({
    message: EnvValidationMessageForAppUser.Typ
  })
  public typ: string;

  @IsString({
    message: EnvValidationMessageForAppUser.JwtAccessExpired
  })
  public jwtAccessExpired: string;

  @IsString({
    message: EnvValidationMessageForAppUser.StaticDirectory
  })
  public staticDirectory: string;
}
