import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import {TypeHousing} from '@project/enum';
import {ComfortList} from '@project/type';

@Entity({name: 'rent'})
export class Rent {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @CreateDateColumn({type: 'timestamp', name: 'create_at'})
    public createAt!: Date;

    @Column({type: 'text'})
    public name!: string;

    @Column({type: 'text'})
    public description!: string;

    @Column({type: 'text'})
    public city!: string;

    @Column({type: 'text', name: 'prevertering_image'})
    public preverteringImage!: string;

    @Column({type: 'text', array: true, name: 'photos_housing'})
    public photosHousing!: string[];

    @Column({type: "boolean"})
    public premium!: boolean;

    @Column({type: 'boolean'})
    public favorites!: boolean;

    @Column({
      type: "enum",
      enum: TypeHousing,
      name: 'type_housing'
    })
    public typeHousing!: TypeHousing;

    @Column({type: 'integer', name: 'number_room'})
    public numberRoom!: number;

    @Column({type: 'integer', name: 'number_guest'})
    public numberGuest!: number;

    @Column({type: 'real', name: 'price_rent'})
    public priceRent!: number;

    @Column({type: 'text', array: true})
    public comfort!: ComfortList[];

    @Column({type: 'text', name: 'id_user'})
    public idUser!: string;

    @Column({
      type: 'text',
      name: 'favorites_id_user',
      nullable: true
    })
    public favoritesIdUser!: string

    @Column({type: 'double precision', array: true})
    public coordinates!: [number, number];
}
