import {
  INestApplication,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super();
  }
  async onModuleInit() {
    try {
      this.logger.info('[PRISMA SERVICE] CONNECTING TO DATABASE...');
      await this.$connect();
      this.logger.info('[PRISMA SERVICE] DATABASE CONNECTION ESTABLISHED');
    } catch (error) {
      this.logger.error(
        `[PRISMA SERVICE] DATABASE CONNECTION FAILED: ${error}`,
      );
      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      this.logger.info('[PRISMA SERVICE] CLOSING CONNECTION TO DATABASE...');
      await app.close();
      this.logger.info('[PRISMA SERVICE] DISCONNECTION SUCCESSFUL');
    });
  }
}
