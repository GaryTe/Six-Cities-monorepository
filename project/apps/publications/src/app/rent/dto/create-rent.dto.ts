import {TypeHousing} from '@project/enum';
import { ComfortList } from '@project/type';

export class CreateRentDto {
  public name!: string;
  public description!: string;
  public city!: string;
  public preverteringImage!: string;
  public photosHousing!: string[];
  public premium!: boolean;
  public favorites!: boolean;
  public typeHousing!: TypeHousing;
  public numberRoom!: number;
  public numberGuest!: number;
  public priceRent!: number;
  public comfort!: ComfortList[];
  public idUser!: string;
  public coordinates!: [number, number];
}
