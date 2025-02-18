import {
  IsString,
  Length,
  Validate,
  IsEmail,
  IsOptional,
  IsEnum
} from 'class-validator';

import { TypeUser } from "@project/enum";
import {
  MIN_LENQTH,
  MAX_LENQTH,
  MIN_LENQTH_PASSWORD,
  MAX_LENQTH_PASSWORD
} from '@project/const';
import {
  ValidationFieldName,
  ValidationFieldAvatar
} from '@project/functions-validation';
import {
  UserDtoValidationMessageForAppUser,
} from '@project/error-validatio';

const {
  name,
  email,
  avatar,
  password,
  typeUser
} = UserDtoValidationMessageForAppUser;

export class UserDto {
  @IsString({message: name.string})
  @Length(MIN_LENQTH, MAX_LENQTH, {message: name.length})
  @Validate(ValidationFieldName, {message: name.typeData})
  public name!: string;

  @IsEmail({}, {message: email})
  public email!: string;

  @IsOptional()
  @Validate(ValidationFieldAvatar, {message: avatar})
  public avatar?: string;

  @IsString({message: password.string})
  @Length(MIN_LENQTH_PASSWORD, MAX_LENQTH_PASSWORD, {message: password.length})
  public password!: string;

  @IsEnum(TypeUser, {message: typeUser})
  public typeUser!: TypeUser;
}
