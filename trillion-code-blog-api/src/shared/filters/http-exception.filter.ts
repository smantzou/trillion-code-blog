import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const timestamp = new Date().toISOString();
    const responseObject = exception.getResponse();
    const code = exception.getStatus() || ctx.getResponse().statusCode;
    this.logger.error(
      `[ERROR ${request.url}] Message: ${responseObject}, Stack Trace: ${exception.stack}`,
    );

    if (typeof responseObject === 'object') {
      return response.status(status).json({
        code: code,
        timestamp: timestamp,
        ...responseObject,
      });
    }
    return response.status(status).json({
      code: code,
      timestamp: timestamp,
      message: responseObject,
    });
  }
}
