import { DeleteExpenseUseCase } from '@/domain/use-cases/delete-expense'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { UserPayload } from '../auth/jwt.strategy'
import { User } from '../auth/user.decorator'

@Controller('/expenses/:id')
export class DeleteExpenseController {
  constructor(private deleteExpenseUseCase: DeleteExpenseUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') expenseId: string,
    @User() user: UserPayload,
  ) {
    const userId = user.sub
    const result = await this.deleteExpenseUseCase.execute({
      expenseId,
      userId,
    })
    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
