import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaErrorTransformInterceptor } from './prisma.inteceptor';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    { provide: APP_INTERCEPTOR, useClass: PrismaErrorTransformInterceptor },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
