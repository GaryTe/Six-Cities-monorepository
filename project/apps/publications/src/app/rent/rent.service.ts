import {
  Injectable
 } from '@nestjs/common';

import {RentRepository} from './rent.repository';
import {CreateRentDto} from './dto/create-rent.dto';

@Injectable()
export class RentService {
  constructor(
    private readonly rentRepository: RentRepository
  ){}

  public async create(dto: CreateRentDto) {
    const dataRent = await this.rentRepository.create(dto);

    return {
      ...dataRent,
      rating: 0,
      authorOffers: dataRent.idUser,
      numberComments: 0
    }
  }

  public async getAllRent(limit: string) {
      const dataRentList = await this.rentRepository.getAllRent(limit);

      return dataRentList
  }

  public async editing(dto: CreateRentDto, idRent: string) {
      const dataRent = await this.rentRepository.editing(dto, idRent)

      return dataRent
  }

  public async delete(idRent: string) {
      const affected = await this.rentRepository.delete(idRent);

      return affected
  }

  public async show(idRent: string) {
      const dataRent = await this.rentRepository.show(idRent);

      return dataRent
  }
}
