import {Author} from './user';

export type Comment = {
  id: string;
  create_at: Date;
  text: string;
  rating: number;
  id_rent: string;
  id_user: string;
  author: Author;
}
