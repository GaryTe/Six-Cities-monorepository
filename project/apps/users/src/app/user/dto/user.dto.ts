import { TypeUser } from "@project/enum";

export class UserDto {
  public name!: string;
  public email!: string;
  public avatar?: string;
  public password!: string;
  public typeUser!: TypeUser;
}
