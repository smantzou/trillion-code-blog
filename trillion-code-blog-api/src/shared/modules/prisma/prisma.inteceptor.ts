import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
  BadRequestException,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PrismaErrorComposite } from './entities/prisma-error.entity';

@Injectable()
export class PrismaErrorTransformInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpException> {
    return next.handle().pipe(
      catchError((error: PrismaErrorComposite) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P1000') {
            throw new InternalServerErrorException();
          }
          if (error.code === 'P1001') {
            throw new InternalServerErrorException();
          }
          if (error.code === 'P1002') {
            throw new RequestTimeoutException(error.code, 'DB TIMEOUT');
          }
          if (error.code === 'P1003') {
            throw new InternalServerErrorException(
              error.code,
              'DB SCHEMA FAILURE!',
            );
          }
          if (error.code === 'P1008') {
            throw new RequestTimeoutException(error.code, 'OPERATION TIMEOUT');
          }
          if (error.code === 'P1009') {
            throw new InternalServerErrorException(
              error.code,
              'DB DUPLICATION',
            );
          }
          if (error.code === 'P1009') {
            throw new InternalServerErrorException(
              error.code,
              'DB DUPLICATION',
            );
          }
          if (error.code === 'P1010') {
            throw new InternalServerErrorException(error.code, 'ACCESS DENIED');
          }
          if (error.code === 'P1011') {
            throw new InternalServerErrorException(
              error.code,
              'CONNECTION FAILURE',
            );
          }
          if (error.code === 'P1012') {
            throw new InternalServerErrorException(error.code, error.message);
          }
          if (error.code === 'P1013') {
            throw new InternalServerErrorException(error.code, error.message);
          }
          if (error.code === 'P1014') {
            throw new InternalServerErrorException(error.code, error.message);
          }
          if (error.code === 'P1015') {
            throw new InternalServerErrorException(error.code);
          }
          if (error.code === 'P1016') {
            throw new InternalServerErrorException(error.code);
          }
          if (error.code === 'P1017') {
            throw new InternalServerErrorException(error.code);
          }
          if (error.code === 'P2002') {
            throw new BadRequestException(error.code, error.message);
          }
          if (error.code === 'P2023') {
            throw new BadRequestException(error.code, error.message);
          }
          if (error.code === 'P2025') {
            throw new BadRequestException({ field: error.meta }, error.code);
          }
          throw new InternalServerErrorException(
            error.code,
            'Query Engine Failure!',
          );
        }
        if (error instanceof PrismaClientInitializationError) {
          throw new InternalServerErrorException(
            error.errorCode,
            error.message,
          );
        }
        if (error instanceof PrismaClientRustPanicError) {
          throw new InternalServerErrorException('RPE', error.message);
        }
        if (error instanceof PrismaClientValidationError) {
          throw new BadRequestException(error.message);
        }
        return next.handle();
      }),
    );
  }
}
