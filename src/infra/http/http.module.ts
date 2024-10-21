/* eslint-disable @stylistic/max-len */
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { RegisterUserUseCase } from '@/domain/use-cases/register-user'
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateCategoriesController } from './controllers/create-categories.controller'
import { CreateCategoryUseCase } from '@/domain/use-cases/create-category'
import { CreateBudgetsController } from './controllers/create-budgets.controller'
import { CreateBudgetUseCase } from '@/domain/use-cases/create-budget'
import { CreateIncomeController } from './controllers/create-incomes.controller'
import { CreateIncomeUseCase } from '@/domain/use-cases/create-income'
import { CreateExpenseController } from './controllers/create-expense.controller'
import { CreateExpenseUseCase } from '@/domain/use-cases/create-expense'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateCategoriesController,
    CreateBudgetsController,
    CreateIncomeController,
    CreateExpenseController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateCategoryUseCase,
    CreateBudgetUseCase,
    CreateIncomeUseCase,
    CreateExpenseUseCase,
  ],
})
export class HttpModule {}
