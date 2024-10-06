/* eslint-disable @stylistic/max-len */
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UserRepository } from '@/domain/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,

    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    CategoryRepository,
  ],
})
export class DatabaseModule {}
