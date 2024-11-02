import { DeleteCategoryUseCase } from '@/domain/use-cases/delete-category'
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
import { EditCategoryController } from './controllers/edit-category.controller'
import { EditCategoryUseCase } from '@/domain/use-cases/edit-category'
import { DeleteCategoryController } from './controllers/delete-category.controller'
import { EditBudgetUseCase } from '@/domain/use-cases/edit-budget'
import { EditBudgetsController } from './controllers/edit-budgets.controller'
import { DeleteBudgetsController } from './controllers/delete-budgets.controller'
import { DeleteBudgetUseCase } from '@/domain/use-cases/delete-budget'
import { EditIncomesController } from './controllers/edit-incomes.controller'
import { EditIncomeUseCase } from '@/domain/use-cases/edit-income'
import { DeleteIncomeUseCase } from '@/domain/use-cases/delete-income'
import { EditExpensesController } from './controllers/edit-expense.controller'
import { EditExpenseUseCase } from '@/domain/use-cases/edit-expense'
import { DeleteIncomeController } from './controllers/delete-incomes.controller'
import { DeleteExpenseController } from './controllers/delete-expense.controller'
import { DeleteExpenseUseCase } from '@/domain/use-cases/delete-expense'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateCategoriesController,
    CreateBudgetsController,
    CreateIncomeController,
    CreateExpenseController,
    EditCategoryController,
    DeleteCategoryController,
    EditBudgetsController,
    DeleteBudgetsController,
    EditIncomesController,
    DeleteIncomeController,
    EditExpensesController,
    DeleteExpenseController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateCategoryUseCase,
    CreateBudgetUseCase,
    CreateIncomeUseCase,
    CreateExpenseUseCase,
    EditCategoryUseCase,
    DeleteCategoryUseCase,
    EditBudgetUseCase,
    DeleteBudgetUseCase,
    EditIncomeUseCase,
    DeleteIncomeUseCase,
    EditExpenseUseCase,
    DeleteExpenseUseCase,
  ],
})
export class HttpModule {}
