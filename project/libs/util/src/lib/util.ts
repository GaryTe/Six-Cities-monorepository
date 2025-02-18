import {plainToInstance, ClassConstructor} from 'class-transformer';
import * as crypto from 'node:crypto';

import {RentDto} from '@project/type';
import {RentKey} from '@project/enum';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const setPassword = (password: string, salt: string) => {
  const encodPassword = createSHA256(password, salt);
  return encodPassword;
}

export const verifyPassword = (password: string, salt: string, hashPassword: string) => {
  const _hashPassword = createSHA256(password, salt);
  return hashPassword === _hashPassword;
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({userName, password, host, port}): string {
  return `mongodb://${userName}:${password}@${host}:${port}/`;
}

export const getPreparedData = (dto: RentDto) => {
  const dataRent = Object.entries(dto)
    .map((item: [string, unknown]) => {
      if(!Array.isArray(item[1])) {
        return `${RentKey[item[0]]} = '${item[1]}'`
      }
      return `${RentKey[item[0]]} = ARRAY['${item[1].join(',')}']`
    });

    return dataRent.join(',')
}
