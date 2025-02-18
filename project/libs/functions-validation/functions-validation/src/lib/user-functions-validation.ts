import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

import {TypeFormatAvatar} from '@project/enum';

@ValidatorConstraint({ name: 'UserDto', async: false })
export class ValidationFieldName implements ValidatorConstraintInterface {
  validate(name: string) {
    if (!(name.split(' ').length === 2)) {
      return false
    }

    return true
  }
}

@ValidatorConstraint({ name: 'UserDto', async: false })
export class ValidationFieldAvatar implements ValidatorConstraintInterface {
  validate(avatar: string) {
    const value = avatar.split('.')
    if ((value[value.length - 1] === TypeFormatAvatar.JPG) || (value[value.length - 1] === TypeFormatAvatar.PNG)) {
      return true
    }

    return false
  }
}
