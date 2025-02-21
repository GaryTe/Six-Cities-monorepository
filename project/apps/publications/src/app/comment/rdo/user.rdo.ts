import {Expose} from 'class-transformer';

import { TypeUser } from "@project/enum";

export class UserRto {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public typeUser!: TypeUser;
}
