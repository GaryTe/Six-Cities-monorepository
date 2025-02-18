import {TypeComfort} from '@project/enum';
import {TypeHousing} from '@project/enum';

export type ComfortList = typeof TypeComfort[keyof typeof TypeComfort];

export type RentDto = {
  name?: string;
  description?: string;
  city?: string;
  preverteringImage?: string;
  photosHousing?: string[];
  premium?: boolean;
  favorites?: boolean;
  typeHousing?: TypeHousing;
  numberRoom?: number;
  numberGuest?: number;
  priceRent?: number;
  comfort?: ComfortList[];
  idUser?: string;
  coordinates?: [number, number];
}
