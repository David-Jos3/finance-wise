/* eslint-disable @stylistic/max-len */
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UserRepository } from '@/domain/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository'
import { BudgetRepository } from '@/domain/repositories/budget-repository'
import { PrismaBudgetRepository } from './prisma/repositories/prisma-budget-repository'
import { ExpenseRepository } from '@/domain/repositories/expense-repository'
import { PrismaExpenseRepository } from './prisma/repositories/prisma-expense-repository'
import { IncomeRepository } from '@/domain/repositories/income-repository'
import { PrismaIncomeRepository } from './prisma/repositories/prisma-income-repository'

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
    {
      provide: BudgetRepository,
      useClass: PrismaBudgetRepository,

    },
    {
      provide: IncomeRepository,
      useClass: PrismaIncomeRepository,

    },
    {
      provide: ExpenseRepository,
      useClass: PrismaExpenseRepository,

    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    CategoryRepository,
    BudgetRepository,
    IncomeRepository,
    ExpenseRepository,
  ],
})
export class DatabaseModule {}
