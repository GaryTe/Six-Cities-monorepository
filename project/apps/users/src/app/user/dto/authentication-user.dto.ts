import {
  IsEmail,
  IsString,
  Length
} from 'class-validator';

import {
  MIN_LENQTH_PASSWORD,
  MAX_LENQTH_PASSWORD
} from '@project/const';
import {
  UserDtoValidationMessageForAppUser
} from '@project/error-validatio';

const {
  password,
  email
} = UserDtoValidationMessageForAppUser;

export class AuthenticationUserDto {
  @IsString({message: password.string})
  @Length(MIN_LENQTH_PASSWORD, MAX_LENQTH_PASSWORD, {message: password.length})
  password: string;

  @IsEmail({}, {message: email})
  email: string;
}
