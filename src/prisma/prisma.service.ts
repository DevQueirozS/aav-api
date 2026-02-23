import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectionLimit: 20,
      connectTimeout: 20000,
      idleTimeout: 20000,
      socketTimeout: 20000,
      initializationTimeout: 20000,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
