import {
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator';

import {MIN_PORT, MAX_PORT} from '@project/const';
import {EnvValidationMessageForRabbitMQ} from '@project/error-validatio';

export class RabbitmqEnvironment {
   @IsString({
    message: EnvValidationMessageForRabbitMQ.User
  })
  public user: string;

  @IsString({
    message: EnvValidationMessageForRabbitMQ.Password
  })
  public password: string;

  @IsString({
    message: EnvValidationMessageForRabbitMQ.Host
  })
  public host: string;

  @IsNumber({}, {
    message: EnvValidationMessageForRabbitMQ.Port
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;
}
