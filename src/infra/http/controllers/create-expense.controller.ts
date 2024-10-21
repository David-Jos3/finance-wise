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
import { User } from '../auth/user.decorator'
import { UserPayload } from '../auth/jwt.strategy'
import { CreateExpenseUseCase } from '@/domain/use-cases/create-expense'
import { ExpenseAlreadyExistsError } from '@/domain/use-cases/errors/expense-already-exists-erro'

const createExpenseBodySchema = z.object({
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  description: z.string().min(0).optional(),
  categoryId: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date format',
  }).transform((date) => new Date(date)),
})

type CreateExpenseBodySchema = z.infer<typeof createExpenseBodySchema>

@Controller('/expense')
export class CreateExpenseController {
  constructor(private createExpenseUseCase: CreateExpenseUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createExpenseBodySchema)) body: CreateExpenseBodySchema,
    @User() user: UserPayload,
  ) {
    const { amount, categoryId, description, date } = body
    const userId = user.sub

    const result = await this.createExpenseUseCase.execute({
      amount,
      description,
      categoryId,
      userId,
      createdAt: new Date(),
      date,
    })

    if (result.isLeft()) {
      const error = result.value
      if (error instanceof ExpenseAlreadyExistsError) {
        throw new ConflictException(error.message)
      }
    }
  }
}
