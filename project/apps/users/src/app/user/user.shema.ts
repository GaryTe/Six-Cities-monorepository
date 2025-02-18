import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

import {UserDto} from './dto/user.dto';
import {TypeUser} from '@project/enum';

@Schema({
  collection: 'users',
  timestamps: true
})
export class User extends Document {
  @Prop({
    type: String,
    required: true
  })
  public name!: string;

  @Prop({
    type: String,
    required: true
  })
  public email!: string;

  @Prop({
    type: String,
    required: true
  })
  public avatar!: string;

  @Prop({
    type: String,
    required: true
  })
  public password!: string;

  @Prop({
    type: String,
    enum: TypeUser,
    required: true
  })
  public typeUser!: TypeUser;

  constructor(dto: UserDto) {
    super();

    this.name = dto.name;
    this.email = dto.email;
    this.avatar = dto.avatar;
    this.password = dto.password;
    this.typeUser = dto.typeUser;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
