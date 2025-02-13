import {Expose} from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose({name: 'create_at'})
  public createAt: Date;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose({name: 'idUser'})
  public authorOffers: string;
}
