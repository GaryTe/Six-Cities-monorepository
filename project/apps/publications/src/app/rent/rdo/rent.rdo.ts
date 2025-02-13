import {Expose, Transform} from 'class-transformer';

import {TypeHousing} from '@project/enum';
import { ComfortList } from '@project/type';

export class RentRdo {
  @Expose()
  public id: string;

  @Expose({name: 'create_at'})
  public dataPublication: string;

  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public city: string;

  @Expose({name: 'prevertering_image'})
  public preverteringImage: string;

  @Expose({name: 'photos_housing'})
  public photosHousing: string[];

  @Expose()
  public premium: boolean;

  @Expose()
  public favorites: boolean;

  @Transform(({ value }) => value ?? 0)
  @Expose()
  public rating: number;

  @Expose({name: 'type_housing'})
  public typeHousing: TypeHousing;

  @Expose({name: 'number_room'})
  public numberRoom: number;

  @Expose({name: 'number_guest'})
  public numberGuest: number;

  @Expose({name: 'price_rent'})
  public priceRent: number;

  @Expose()
  public comfort: ComfortList[];

  @Expose({name: 'id_user'})
  public authorOffers: string;

  @Expose()
  public numberComments: number;

  @Expose()
  public coordinates: [number, number];
}
