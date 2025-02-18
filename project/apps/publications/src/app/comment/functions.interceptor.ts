import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException
} from '@nestjs/common';

import { Observable } from 'rxjs';
import {appDataSource, Rent} from '@project/config';

@Injectable()
export class CheckIdRentDatabaseInterceptor implements NestInterceptor {

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const {body: {idRent}} = context.switchToHttp().getRequest();

      const dataRent = await appDataSource.manager.findOne(Rent, {
        where: {
          id: idRent,
        },
    })

    if(!dataRent) {
      throw new BadRequestException(`You can't add a comment to rent. Rent does not exist in the database.`)
    }

    return next.handle()
  }
}
