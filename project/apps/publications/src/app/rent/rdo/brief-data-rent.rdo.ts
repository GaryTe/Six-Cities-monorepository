import {Expose, Transform} from 'class-transformer';

import {TypeHousing} from '@project/enum';

export class BriefDataRentRdo {
  @Expose()
  public id: string;

  @Expose({name: 'create_at'})
  public dataPublication: string;

  @Expose()
  public name: string;

  @Expose()
  public city: string;

  @Expose({name: 'prevertering_image'})
  public preverteringImage: string;

  @Expose()
  public favorites: boolean;

  @Transform(({ value }) => value ?? 0)
  @Expose()
  public rating: number;

  @Expose({name: 'type_housing'})
  public typeHousing: TypeHousing;

  @Expose({name: 'price_rent'})
  public priceRent: number;

  @Expose()
  public numberComments: number;
}
