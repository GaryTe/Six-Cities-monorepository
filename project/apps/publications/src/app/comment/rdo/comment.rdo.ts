import {Expose, Type} from 'class-transformer';

import {UserRto} from './user.rdo'

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose({name: 'create_at'})
  public createAt: Date;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose()
  @Type(() => UserRto)
  public author: string;
}
