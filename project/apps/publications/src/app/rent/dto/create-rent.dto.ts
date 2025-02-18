import {
  IsString,
  Length,
  IsEnum,
  ArrayMinSize,
  Validate,
  IsBoolean,
  IsNumber,
  Max,
  Min,
  IsArray
} from 'class-validator';

import {TypeHousing, TypeCity} from '@project/enum';
import { ComfortList } from '@project/type';
import {
  MIN_NAMBER_NAME,
  MAX_NAMBER_NAME,
  MIN_NAMBER_DESCRIPTION,
  MAX_NAMBER_DESCRIPTION,
  PHOTOS_HOUSING_MIN_SIZE,
  MIN_NAMBER_ROOM,
  MAX_NAMBER_ROOM,
  MIN_NAMBER_GUEST,
  MAX_NAMBER_GUEST,
  MIN_PRICE,
  MAX_PRICE,
  MIN_SIZE_COORDINATES
} from '@project/const';
import {
  CreateRentDtoValidationMessageForPublication
} from '@project/error-validatio';
import {
  ValidationPhotosHousing,
  ValidationComfort,
  ValidationCoordinates
} from '@project/functions-validation';

const {
  name,
  desctiption,
  city,
  preverteringImage,
  photosHousing,
  premium,
  favorites,
  typeHousing,
  numberRoom,
  numberGuest,
  priceRent,
  comfort,
  coordinates
} = CreateRentDtoValidationMessageForPublication

export class CreateRentDto {
  @IsString({message: name.string})
  @Length(MIN_NAMBER_NAME, MAX_NAMBER_NAME, {message: name.length})
  public name!: string;

  @IsString({message: desctiption.string})
  @Length(MIN_NAMBER_DESCRIPTION, MAX_NAMBER_DESCRIPTION, {message: desctiption.length})
  public description!: string;

  @IsEnum(TypeCity, {message: city})
  public city!: string;

  @IsString({message: preverteringImage})
  public preverteringImage!: string;

  @ArrayMinSize(PHOTOS_HOUSING_MIN_SIZE, {message: photosHousing.length})
  @Validate(ValidationPhotosHousing, {message: photosHousing.string})
  public photosHousing!: string[];

  @IsBoolean({message: premium})
  public premium!: boolean;

  @IsBoolean({message: favorites})
  public favorites!: boolean;

  @IsEnum(TypeHousing, {message: typeHousing})
  public typeHousing!: TypeHousing;

  @IsNumber({}, {message: numberRoom.namber})
  @Min(MIN_NAMBER_ROOM, {message: numberRoom.minNamber})
  @Max(MAX_NAMBER_ROOM, {message: numberRoom.manNamber})
  public numberRoom!: number;

  @IsNumber({}, {message: numberGuest.namber})
  @Min(MIN_NAMBER_GUEST, {message: numberGuest.minNamber})
  @Max(MAX_NAMBER_GUEST, {message: numberGuest.manNamber})
  public numberGuest!: number;

  @IsNumber({}, {message: priceRent.namber})
  @Min(MIN_PRICE, {message: priceRent.minNamber})
  @Max(MAX_PRICE, {message: priceRent.manNamber})
  public priceRent!: number;

  @IsArray({message: comfort.type})
  @Validate(ValidationComfort, {message: comfort.values})
  public comfort!: ComfortList[];

  @ArrayMinSize(MIN_SIZE_COORDINATES, {message: coordinates.length})
  @Validate(ValidationCoordinates, {message: coordinates.type})
  public coordinates!: [number, number];

  public idUser: string;
}
