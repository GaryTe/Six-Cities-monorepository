import {
  IsString,
  Length,
  IsNumber,
  Min,
  Max
} from 'class-validator';

import {
  MIN_LENGTH_TEXT,
  MAX_LENGTH_TEXT,
  MIN_NAMBER_RATING,
  MAX_NAMBER_RATING
} from '@project/const';

import {
  CreateCommentDtoValidationMessageForPublication
} from '@project/error-validatio';

const {
  text,
  rating
} = CreateCommentDtoValidationMessageForPublication

export class CreateCommentDto {
  @IsString({message: text.string})
  @Length(MIN_LENGTH_TEXT, MAX_LENGTH_TEXT, {message: text.length})
  public text!: string;

  @IsNumber({}, {message: rating.namber})
  @Min(MIN_NAMBER_RATING, {message: rating.minNamber})
  @Max(MAX_NAMBER_RATING, {message: rating.manNamber})
  public rating!: number;

  public idUser: string;
  public idRent!: string;
}
