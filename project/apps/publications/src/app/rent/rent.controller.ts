import {
  Controller,
  Post,
  Delete,
  Get,
  Patch,
  Body,
  Param,
  Query
 } from '@nestjs/common';

 import {RentService} from './rent.service';
 import {CreateRentDto} from './dto/create-rent.dto';
 import {RentRdo} from './rdo/rent.rdo';
 import {BriefDataRentRdo} from './rdo/brief-data-rent.rdo';
 import {fillObject} from '@project/util';

@Controller('rent')
export class RentController {
  constructor(
    private readonly rentService: RentService
  ){}

  @Post('/')
  public async create(@Body() dto: CreateRentDto) {
    const dataRent = await this.rentService.create(dto);

    return fillObject(RentRdo, dataRent)
  }

  @Get('/')
  public async getAllRent(@Query('limit') limit: string) {
    const dataRentList = await this.rentService.getAllRent(limit);

    return fillObject(BriefDataRentRdo, dataRentList)
  }

  @Patch('/:idRent')
  public async editing(@Body() dto: CreateRentDto, @Param('idRent') idRent: string) {
    const dataRent = await this.rentService.editing(dto, idRent)

    return fillObject(RentRdo, dataRent)
  }

  @Delete('/:idRent')
  public async delete(@Param('idRent') idRent: string) {
    const affected = await this.rentService.delete(idRent);

    return affected ? 'Information for rent deleted.' : 'Information for rent not deleted.'
  }

  @Get('/:idRent')
  public async show(@Param('idRent') idRent: string) {
    const dataRent = await this.rentService.show(idRent);

    return fillObject(RentRdo, dataRent)
  }
}
