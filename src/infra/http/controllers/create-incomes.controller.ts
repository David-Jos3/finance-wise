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
import { CreateIncomeUseCase } from '@/domain/use-cases/create-income'
import { IncomeAlreadyExistsError } from '@/domain/use-cases/errors/income-already-exists-erro'

const createIncomeBodySchema = z.object({
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  description: z.string().min(0).optional(),
  categoryId: z.string(),
})

type CreateIncomeBodySchema = z.infer<typeof createIncomeBodySchema>

@Controller('/incomes')
export class CreateIncomeController {
  constructor(private createIncomeUseCase: CreateIncomeUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createIncomeBodySchema)) body: CreateIncomeBodySchema,
    @User() user: UserPayload,
  ) {
    const { amount, categoryId, description } = body
    const userId = user.sub

    const result = await this.createIncomeUseCase.execute({
      amount,
      description,
      categoryId,
      userId,
      createdAt: new Date(),
    })

    if (result.isLeft()) {
      const error = result.value
      if (error instanceof IncomeAlreadyExistsError) {
        throw new ConflictException(error.message)
      }
    }
  }
}
