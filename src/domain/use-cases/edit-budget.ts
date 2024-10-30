import { Either, left, right } from '@/core/either'
import { Budget } from '../entities/budget'
import { BudgetRepository } from '../repositories/budget-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/error/resource-not-found'
import { NotAllowedError } from '@/core/errors/error/not-allowed-error'

interface EditBudgetUseCaseRequest {
  budgetId: string
  amount: number
  userId: string
  categoryId: string
  startDate: Date | null
  endDate: Date | null

}

type EditBudgetUseCaseResponse = Either<ResourceNotFoundError, {
  budget: Budget
}>

@Injectable()
export class EditBudgetUseCase {
  constructor(private budgetRepository: BudgetRepository) {}
  async execute({
    budgetId,
    amount,
    userId,
    categoryId,
    startDate,
    endDate,

  }
  : EditBudgetUseCaseRequest) : Promise<EditBudgetUseCaseResponse> {
    const budget = await this.budgetRepository.findById(budgetId)

    if (!budget) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== budget.userId) {
      left(new NotAllowedError())
    }

    budget.amount = amount
    budget.categoryId = categoryId
    budget.startDate = startDate
    budget.endDate = endDate

    await this.budgetRepository.update(budget)

    return right({ budget })
  }
}
