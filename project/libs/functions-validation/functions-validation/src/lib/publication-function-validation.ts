import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

import {TypeComfort} from '@project/enum';

@ValidatorConstraint({ name: 'CreatRentDto', async: false })
export class ValidationPhotosHousing implements ValidatorConstraintInterface {
  validate(photosHousing: string[]) {
    if ((photosHousing.find((photo) => typeof photo === 'number'))) {
      return false
    }

    return true
  }
}

@ValidatorConstraint({ name: 'CreatRentDto', async: false })
export class ValidationComfort implements ValidatorConstraintInterface {
  validate(comfortsList: string[]) {
    if ((comfortsList.find((comfort) => TypeComfort[comfort] === undefined))) {
      return false
    }

    return true
  }
}

@ValidatorConstraint({ name: 'CreatRentDto', async: false })
export class ValidationCoordinates implements ValidatorConstraintInterface {
  validate(coordinates: number[]) {
    if ((coordinates.find((value) => typeof value === 'string'))) {
      return false
    }

    return true
  }
}
