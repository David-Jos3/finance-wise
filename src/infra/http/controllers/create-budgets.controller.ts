/* eslint-disable @stylistic/max-len */
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
}
  from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipe/zod-validation-pipe'
import { CreateBudgetUseCase } from '@/domain/use-cases/create-budget'
import { BudgetAlreadyExistsError } from '@/domain/use-cases/errors/budget-already-exists-erro'
import { User } from '../auth/user.decorator'
import { UserPayload } from '../auth/jwt.strategy'

const createBudgetsBodySchema = z.object({
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  categoryId: z.string(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date format',
  }).transform((date) => new Date(date)),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date format',
  }).transform((date) => new Date(date)),
})

type CreateBudgetsBodySchema = z.infer<typeof createBudgetsBodySchema>

@Controller('/budgets')
export class CreateBudgetsController {
  constructor(private createBudgetUseCase: CreateBudgetUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createBudgetsBodySchema)) body: CreateBudgetsBodySchema,
    @User() user: UserPayload,
  ) {
    const { amount, categoryId, endDate, startDate } = body
    const userId = user.sub

    const result = await this.createBudgetUseCase.execute({
      amount,
      categoryId,
      userId,
      endDate,
      startDate,
    })

    if (result.isLeft()) {
      const error = result.value
      if (error instanceof BudgetAlreadyExistsError) {
        throw new ConflictException(error.message)
      }
    }
  }
}
