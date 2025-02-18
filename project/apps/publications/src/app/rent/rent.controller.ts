import {
  Controller,
  Post,
  Delete,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  Req,
  Inject
 } from '@nestjs/common';
 import {Request} from 'express';
 import {ConfigType} from '@nestjs/config';

 import {RentService} from './rent.service';
 import {CreateRentDto} from './dto/create-rent.dto';
 import {EditingRentDto} from './dto/editing-rent.dto';
 import {NameCityDto} from './dto/name-city.dto';
 import {RentRdo} from './rdo/rent.rdo';
 import {BriefDataRentRdo} from './rdo/brief-data-rent.rdo';
 import {fillObject} from '@project/util';
 import {CheckAccessTokenGuard} from '@project/jwt';
 import {applicationConfigPublication} from '@project/config';
 import {GLOBAL_PREFIX} from '@project/const';
 import {CheckUsreRightsActionsInterceptor, CheckIdRentDatabaseInterceptor} from './functions.interceptor';

@Controller('rent')
export class RentController {
  constructor(
    @Inject(applicationConfigPublication.KEY)
    private readonly applicationConfig: ConfigType<typeof applicationConfigPublication>,
    private readonly rentService: RentService
  ){}

  @UseGuards(CheckAccessTokenGuard)
  @Post('/')
  public async create(@Req() req: Request, @Body() dto: CreateRentDto) {
    const [id, name, email, avatar, typeUser] = req.headers?.tokenPayload as undefined as string[];
    const dataRent = await this.rentService.create({...dto, idUser: id});
    dataRent.authorOffers = {
      id,
      name,
      email,
      avatar: `http://${this.applicationConfig.host}:${this.applicationConfig.port}/${GLOBAL_PREFIX}${avatar}`,
      typeUser
    }

    return fillObject(RentRdo, dataRent)
  }

  @Get('/')
  public async getAllRent(@Query('limit') limit: string) {
    const dataRentList = await this.rentService.getAllRent(limit);

    return fillObject(BriefDataRentRdo, dataRentList)
  }

  @Get('/premium')
  public async rentsPremiumList(@Query() {city}: NameCityDto) {
    const dataRentsPremiumList = await this.rentService.rentsPremiumList(city);

    return fillObject(BriefDataRentRdo, dataRentsPremiumList)
  }

  @UseGuards(CheckAccessTokenGuard)
  @Get('/favorit')
  public async rentsFavoritList(@Req() req: Request) {
    const [idUser] = req.headers.tokenPayload;
    const dataRentsFavoritList = await this.rentService.rentsFavoritList(idUser);

    return fillObject(BriefDataRentRdo, dataRentsFavoritList)
  }

  @UseGuards(CheckAccessTokenGuard)
  @UseInterceptors(CheckIdRentDatabaseInterceptor)
  @Post('/favorit/:idRent')
  public async creatRentFavorite(@Req() req: Request, @Param('idRent') idRent: string) {
    const [idUser] = req.headers.tokenPayload;
    const dataRentFavorite = await this.rentService.creatRentFavorite(idUser, idRent);

    return fillObject(BriefDataRentRdo, dataRentFavorite)
  }

  @UseGuards(CheckAccessTokenGuard)
  @UseInterceptors(CheckUsreRightsActionsInterceptor)
  @Patch('/:idRent')
  public async editing(@Req() req: Request, @Body() dto: EditingRentDto, @Param('idRent') idRent: string) {
    const [id, name, email, avatar, typeUser] = req.headers?.tokenPayload as undefined as string[];
    const dataRent = await this.rentService.editing(dto, idRent)
    dataRent.authorOffers = {
      id,
      name,
      email,
      avatar: `http://${this.applicationConfig.host}:${this.applicationConfig.port}/${GLOBAL_PREFIX}${avatar}`,
      typeUser
    }

    return fillObject(RentRdo, dataRent)
  }

  @UseGuards(CheckAccessTokenGuard)
  @UseInterceptors(CheckUsreRightsActionsInterceptor)
  @Delete('/:idRent')
  public async delete(@Param('idRent') idRent: string) {
    const affected = await this.rentService.delete(idRent);

    return affected ? 'Information for rent deleted.' : 'Information for rent not deleted.'
  }

  @UseInterceptors(CheckIdRentDatabaseInterceptor)
  @Get('/:idRent')
  public async show(@Param('idRent') idRent: string) {
    const dataRent = await this.rentService.show(idRent);

    return fillObject(RentRdo, dataRent)
  }
}
