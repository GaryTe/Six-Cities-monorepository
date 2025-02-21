import { registerAs } from '@nestjs/config';
import { validateSync, ValidationError } from 'class-validator';
import {plainToInstance} from 'class-transformer';

import {RabbitmqEnvironment} from './rabbitmq-environment';
import {ConfigRabbitMQ} from '@project/interface';
import {DEFAULT_RABBITMQ_PORT} from '@project/const';

export default registerAs('rabbitmq', (): ConfigRabbitMQ => {
  const configRabbitmq: ConfigRabbitMQ = {
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    host: process.env.RABBITMQ_HOST,
    port: parseInt(process.env.RABBITMQ_PORT, 10) || DEFAULT_RABBITMQ_PORT
  };

  const rabbitmqEnvironment = plainToInstance(
    RabbitmqEnvironment,
    configRabbitmq,
    { enableImplicitConversion: true }
  );

  const errors: ValidationError[] | [] = validateSync(
    rabbitmqEnvironment, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    const {constraints} = errors.find((item: ValidationError) => item)
    const err: string = Object.values(constraints).join(',')
    throw new Error(err);
  }

  return configRabbitmq;
});
