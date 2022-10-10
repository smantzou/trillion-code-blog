import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './shared/modules/configuration/configuration.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './shared/interceptors/response.interceptor';
import { LoggerModule } from './shared/modules/logger/logger.module';
import { PrismaModule } from './shared/modules/prisma/prisma.module';

@Module({
  imports: [ConfigurationModule, LoggerModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
  ],
})
export class AppModule {}
