import { Injectable } from '@nestjs/common'
import { BudgetRepository } from '../repositories/budget-repository'
import { ResourceNotFoundError } from '@/core/errors/error/resource-not-found'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/error/not-allowed-error'

interface DeleteBudgetUseCaseRequest {
  budgetId: string
  userId: string
}

type DeleteBudgetUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteBudgetUseCase {
  constructor(private budgetRepository: BudgetRepository) {}

  async execute({ budgetId, userId }: DeleteBudgetUseCaseRequest)
    : Promise<DeleteBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.findById(budgetId)
    console.log(userId)
    if (!budget) {
      return left(new ResourceNotFoundError())
    }

    if (budget.userId !== userId) {
      return left(new NotAllowedError())
    }

    await this.budgetRepository.delete(budget.id)
    return right(null)
  }
}
