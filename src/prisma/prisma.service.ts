import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.log('PrismaService constructor called');
  }

  async onModuleInit() {
    console.log('PrismaService onModuleInit called');
    await this.$connect();
    console.log('Database connection established');
  }

  async onModuleDestroy() {
    console.log('PrismaService onModuleDestroy called');
    await this.$disconnect();
    console.log('Database connection closed');
  }
}
