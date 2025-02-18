import {IsEnum} from 'class-validator';

import {TypeCity} from '@project/enum';
import {CreateRentDtoValidationMessageForPublication} from '@project/error-validatio';

const {city} = CreateRentDtoValidationMessageForPublication

export class NameCityDto {
@IsEnum(TypeCity, {message: city})
  public city!: string;
}
