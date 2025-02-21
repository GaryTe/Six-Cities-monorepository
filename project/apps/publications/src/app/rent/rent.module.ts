import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { RentRepository } from './rent.repository';
import {JwtModule} from '@project/jwt';
import {getRabbitMQOptions} from '@project/config';

@Module({
  imports: [
    JwtModule,
    RabbitMQModule.forRootAsync(
      getRabbitMQOptions()
    )
  ],
  controllers: [RentController],
  providers: [
    RentService,
    RentRepository
  ],
})
export class RentModule {}
