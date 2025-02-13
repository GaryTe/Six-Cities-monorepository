import {plainToInstance, ClassConstructor} from 'class-transformer';
import * as crypto from 'node:crypto';

import {RentDto} from '@project/type';
import {RentKey} from '@project/enum';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({userName, password, host, port}): string {
  return `mongodb://${userName}:${password}@${host}:${port}/`;
}

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

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
