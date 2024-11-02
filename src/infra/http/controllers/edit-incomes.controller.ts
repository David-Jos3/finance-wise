import { EditIncomeUseCase } from './../../../domain/use-cases/edit-income'
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

const editIncomeBodySchema = z.object({
  amount: z.number(),
  categoryId: z.string().uuid(),
  description: z.string().optional(),
  updatedAt: z.date().optional(),
})
const bodyValidationPipe = new ZodValidationPipe(editIncomeBodySchema)

type EditIncomeBodySchema = z.infer<typeof editIncomeBodySchema>

@Controller('/incomes/:id')
export class EditIncomesController {
  constructor(private editIncomeUseCase :EditIncomeUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditIncomeBodySchema,
    @Param('id') incomeId: string,
    @User() user: UserPayload,
  ) {
    const { amount, categoryId, description, updatedAt } = body
    const userId = user.sub
    const result = await this.editIncomeUseCase.execute({
      amount,
      userId,
      categoryId,
      description,
      incomeId,
      updatedAt,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
