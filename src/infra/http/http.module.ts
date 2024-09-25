/* eslint-disable @stylistic/max-len */
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { RegisterUserUseCase } from '@/domain/use-cases/register-user'
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate-user'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
