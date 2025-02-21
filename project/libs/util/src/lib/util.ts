import {plainToInstance, ClassConstructor} from 'class-transformer';
import * as crypto from 'node:crypto';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {RentDto, Author, Comment, Rent} from '@project/type';
import {RentKey} from '@project/enum';
import {EXCHANG_NAME, ROUTING_KEY} from '@project/const';

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

export const getDataUsersList = async (amqpConnection: AmqpConnection, dataPublicationsList: Comment[] | Rent[]) => {
  const _dataPublicationsList: Comment[] | Rent[] = []

  const dataUsersList = await amqpConnection.request<Author[]>({
    exchange: EXCHANG_NAME,
    routingKey: ROUTING_KEY,
    payload: dataPublicationsList
  })
  .then((dataUsersList) => dataUsersList)
  .catch(() => [])

  if(dataUsersList.length === 0) {
    return dataPublicationsList
  }

  dataPublicationsList.forEach((comment) => {
    for(const user of dataUsersList) {
      if(user._id === comment.id_user) {
        comment.author = user;
        _dataPublicationsList.push(comment)
        return;
      }
    }
  })

  return _dataPublicationsList;
}
