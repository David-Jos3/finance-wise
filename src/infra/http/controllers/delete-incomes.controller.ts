import { DeleteIncomeUseCase } from '@/domain/use-cases/delete-income'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { UserPayload } from '../auth/jwt.strategy'
import { User } from '../auth/user.decorator'

@Controller('/incomes/:id')
export class DeleteIncomeController {
  constructor(private deleteIncomeUseCase: DeleteIncomeUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') incomeId: string,
    @User() user: UserPayload,
  ) {
    const userId = user.sub
    const result = await this.deleteIncomeUseCase.execute({
      incomeId,
      userId,
    })
    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
