import {DataSource} from 'typeorm';

import {Rent} from './rent.shema';
import {Comment} from './comment.shema';

export let appDataSource: DataSource;

export const dataSource = async (
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,

): Promise<DataSource> => {
  appDataSource = new DataSource({
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [
      Rent,
      Comment
    ],
    synchronize: true
  });

  return appDataSource;
};
