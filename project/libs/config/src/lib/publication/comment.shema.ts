import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity({name: 'comment'})
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @CreateDateColumn({type: 'timestamp', name: 'create_at'})
    public createAt!: Date;

    @Column({type: 'text'})
    public text!: string;

    @Column({type: 'real'})
    public rating!: number;

    @Column({type: 'text', name: 'id_user'})
    public idUser!: string;

    @Column({type: 'text', name: 'id_rent'})
    idRent: string;
}
