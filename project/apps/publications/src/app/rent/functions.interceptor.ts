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
export class CheckUsreRightsActionsInterceptor implements NestInterceptor {

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const {params, headers} = context.switchToHttp().getRequest();
    const tokenPayload = headers?.tokenPayload as undefined as string[];

      const dataRent = await appDataSource.manager.findOne(Rent, {
        where: {
          id: params.idRent,
          idUser: tokenPayload[0]
        },
    })

    if(!dataRent) {
      throw new BadRequestException(`You can't carry out rent actions. Rent does not exist in the database or you do not have the right to publication for rent.`)
    }

    return next.handle()
  }
}

  @Injectable()
  export class CheckIdRentDatabaseInterceptor implements NestInterceptor {

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
      const {params} = context.switchToHttp().getRequest();

        const dataRent = await appDataSource.manager.findOne(Rent, {
          where: {
            id: params.idRent
          },
      })

      if(!dataRent) {
        throw new BadRequestException(`Rent with this ${params.idRent}, does not exist in the database.`)
      }

      return next.handle()
    }
  }
