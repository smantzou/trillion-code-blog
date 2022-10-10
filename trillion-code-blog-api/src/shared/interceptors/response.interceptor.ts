import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  message?: string;
  displayMessage?: string;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (context.switchToHttp().getRequest().originalUrl.includes('logout')) {
      return next.handle();
    }
    return next.handle().pipe(
      map((response) => ({
        code: context.switchToHttp().getResponse().statusCode,
        message: response.message,
        displayMessage: response.displayMessage,
        data: response,
      })),
    );
  }
}
