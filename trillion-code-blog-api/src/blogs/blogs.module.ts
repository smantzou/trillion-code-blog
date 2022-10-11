import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { PrismaModule } from 'src/shared/modules/prisma/prisma.module';
import { BlogsService } from './blogs.service';

@Module({
  imports: [PrismaModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
