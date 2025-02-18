import { Module } from '@nestjs/common';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { RentRepository } from './rent.repository';
import {JwtModule} from '@project/jwt';

@Module({
  imports: [JwtModule],
  controllers: [RentController],
  providers: [
    RentService,
    RentRepository
  ],
})
export class RentModule {}
