import { EditBudgetUseCase } from '@/domain/use-cases/edit-budget'
import {
  BadRequestException,
  Body, Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipe/zod-validation-pipe'
import { User } from '../auth/user.decorator'
import { UserPayload } from '../auth/jwt.strategy'
import { right } from '@/core/either'

const editBudgetBodySchema = z.object({
  amount: z.number(),
  categoryId: z.string(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date format',
  }).transform((date) => new Date(date)),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date format',
  }).transform((date) => new Date(date)),
})

const bodyValidationPipe = new ZodValidationPipe(editBudgetBodySchema)

type EditBudgetBodySchema = z.infer<typeof editBudgetBodySchema>

@Controller('/budgets/:id')
export class EditBudgetsController {
  constructor(private editBudgetsUseCase: EditBudgetUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body:EditBudgetBodySchema,
    @Param('id') budgetId: string,
    @User() user: UserPayload,
  ) {
    const { amount, categoryId, endDate, startDate } = body
    const userId = user.sub

    const result = await this.editBudgetsUseCase.execute({
      amount,
      budgetId,
      categoryId,
      startDate,
      endDate,
      userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({})
  }
}
