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

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticateController, CreateCategoriesController],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateCategoryUseCase,
  ],
})
export class HttpModule {}
