import { DeleteBudgetUseCase } from '@/domain/use-cases/delete-budget'
import {
  BadRequestException,
  Controller, Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { User } from '../auth/user.decorator'
import { UserPayload } from '../auth/jwt.strategy'

@Controller('/budgets/:id')
export class DeleteBudgetsController {
  constructor(private deleteBudgetUseCase: DeleteBudgetUseCase) {}
  @Delete()
  @HttpCode(204)
  async execute(
    @Param('id') budgetId: string,
    @User() user: UserPayload,
  ) {
    const userId = user.sub
    const result = await this.deleteBudgetUseCase.execute({ budgetId, userId })

    if (result.isLeft()) {
      console.log(result.value)
      throw new BadRequestException()
    }
  }
}
