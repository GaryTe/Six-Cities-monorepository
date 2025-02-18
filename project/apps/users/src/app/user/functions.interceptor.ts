import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {User} from './user.shema';
import { Observable } from 'rxjs';

@Injectable()
export class CheckEmailDatabaseInterceptor implements NestInterceptor {
  constructor(
   @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const {body: {email}} = context.switchToHttp().getRequest();

      const dataUser = await this.userModel.findOne({email: email})

    if(dataUser) {
      throw new ConflictException(`User with email: ${email}, exists in the database.`)
    }

    return next.handle()
  }
}

@Injectable()
export class CheckUserDatabaseInterceptor implements NestInterceptor {
  constructor(
   @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const {headers} = context.switchToHttp().getRequest();
    const tokenPayload = headers?.tokenPayload as undefined as string[];

      const dataUser = await this.userModel.findOne({_id: tokenPayload[0], email: tokenPayload[2]})

    if(!dataUser) {
      throw new ConflictException(`User with email: ${tokenPayload[2]},dose not exist in the database. Log in.`)
    }

    return next.handle()
  }
}
