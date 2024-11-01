/* eslint-disable @stylistic/max-len */
import { Injectable } from '@nestjs/common'
import { ExpenseRepository } from '../repositories/expense-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/error/resource-not-found'
import { Expense } from '../entities/expense'
import { NotAllowedError } from '@/core/errors/error/not-allowed-error'

interface EditExpenseUseCaseRequest {
  amount: number
  description: string,
  date: Date
  categoryId: string,
  expenseId: string,
  userId: string,
  updatedAt?: Date | null,
}

type EditExpenseUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,
{
  expense: Expense
} >

@Injectable()
export class EditExpenseUseCase {
  constructor(private expenseRepository: ExpenseRepository) {}

  async execute({
    amount,
    categoryId,
    date,
    description,
    expenseId,
    updatedAt,
    userId,
  }:EditExpenseUseCaseRequest):
    Promise<EditExpenseUseCaseResponse> {
    const expense = await this.expenseRepository.findById(expenseId)

    if (!expense) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== expense.userId) {
      return left(new NotAllowedError())
    }

    expense.amount = amount
    expense.description = description
    expense.date = new Date(date)
    expense.categoryId = categoryId
    expense.updatedAt = updatedAt

    await this.expenseRepository.update(expense)

    return right({ expense })
  }
}
