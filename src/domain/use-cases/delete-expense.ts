import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/error/resource-not-found'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/error/not-allowed-error'
import { ExpenseRepository } from '../repositories/expense-repository'

interface DeleteExpenseUseCaseRequest {
  expenseId: string
  userId: string
}

type DeleteExpenseUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteExpenseUseCase {
  constructor(private expenseRepository: ExpenseRepository) {}

  async execute({ expenseId, userId }: DeleteExpenseUseCaseRequest)
    : Promise<DeleteExpenseUseCaseResponse> {
    const expense = await this.expenseRepository.findById(expenseId)

    if (!expense) {
      return left(new ResourceNotFoundError())
    }

    if (expense.userId !== userId) {
      return left(new NotAllowedError())
    }

    await this.expenseRepository.delete(expense.id)

    return right(null)
  }
}
