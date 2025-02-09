import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

import {UserDto} from './dto/user.dto';
import {createSHA256} from '@project/util';
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

  constructor(dto: UserDto, salt: string) {
    super();

    this.name = dto.name;
    this.email = dto.email;
    this.avatar = dto.avatar;
    this.password = this.setPassword(dto.password, salt);
    this.typeUser = dto.typeUser;
  }

  public setPassword(password: string, salt: string) {
    const encodPassword = createSHA256(password, salt);
    return encodPassword;
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
