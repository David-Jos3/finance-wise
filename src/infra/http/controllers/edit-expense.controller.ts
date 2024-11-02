import { EditExpenseUseCase } from './../../../domain/use-cases/edit-expense'
import {
  Controller,
  HttpCode,
  Param,
  Put,
  Body,
  BadRequestException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipe/zod-validation-pipe'
import { User } from '../auth/user.decorator'
import { UserPayload } from '../auth/jwt.strategy'

const editExpenseBodySchema = z.object({
  amount: z.number(),
  categoryId: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date format',
  }).transform((date) => new Date(date)),
  description: z.string().optional(),
  updatedAt: z.date().optional(),

})
const bodyValidationPipe = new ZodValidationPipe(editExpenseBodySchema)

type EditExpenseBodySchema = z.infer<typeof editExpenseBodySchema>

@Controller('/expenses/:id')
export class EditExpensesController {
  constructor(private editExpenseUseCase :EditExpenseUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditExpenseBodySchema,
    @Param('id') expenseId: string,
    @User() user: UserPayload,
  ) {
    const { amount, categoryId, date, description, updatedAt } = body
    const userId = user.sub

    const result = await this.editExpenseUseCase.execute({
      amount,
      categoryId,
      userId,
      date,
      description,
      expenseId,
      updatedAt,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
