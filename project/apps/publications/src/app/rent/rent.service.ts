import {Injectable} from '@nestjs/common';
 import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {RentRepository} from './rent.repository';
import {CreateRentDto} from './dto/create-rent.dto';
import {EditingRentDto} from './dto/editing-rent.dto';
import {getDataUsersList} from '@project/util';

@Injectable()
export class RentService {
  constructor(
    private readonly rentRepository: RentRepository,
    private readonly amqpConnection: AmqpConnection
  ){}

  public async create(dto: CreateRentDto) {
    const dataRent = await this.rentRepository.create(dto);

    return {
      ...dataRent,
      rating: 0,
      numberComments: 0
    }
  }

  public async getAllRent(limit: string) {
      const dataRentList = await this.rentRepository.getAllRent(limit);

      return dataRentList
  }

  public async editing(dto: EditingRentDto, idRent: string) {
      const dataRent = await this.rentRepository.editing(dto, idRent)

      return dataRent
  }

  public async delete(idRent: string) {
      const affected = await this.rentRepository.delete(idRent);

      return affected
  }

  public async show(idRent: string) {
      const dataRent = await this.rentRepository.show(idRent);

      const _dataRentsList = await getDataUsersList(this.amqpConnection, [dataRent])

      return _dataRentsList.find((rent) => rent);
  }

  public async rentsPremiumList(city: string) {
      const dataRentsPremiumList = await this.rentRepository.rentsPremiumList(city);

      return dataRentsPremiumList
  }

  public async rentsFavoritList(idUser: string) {
      const dataRentsFavoritList = await this.rentRepository.rentsFavoritList(idUser);

      return dataRentsFavoritList
    }

  public async creatRentFavorite(idUser: string, idRent: string) {
      const dataRentFavorite = await this.rentRepository.creatRentFavorite(idUser, idRent);

      return dataRentFavorite
  }
}
