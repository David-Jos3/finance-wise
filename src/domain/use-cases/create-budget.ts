/* eslint-disable @stylistic/max-len */
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { Budget } from '../entities/budget'
import { BudgetRepository } from '../repositories/budget-repository'
import { UserRepository } from '../repositories/user-repository'
import { CategoryRepository } from '../repositories/category-repository'
import { BudgetAlreadyExistsError } from './errors/budget-already-exists-erro'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'

interface CreateBudgetUseCaseRequest {
  amount: number
  categoryId: string
  userId: string
  startDate: Date | null
  endDate: Date | null

}

type CreateBudgetUseCaseResponse = Either<
BudgetAlreadyExistsError | UserAlreadyExistsError, {
  budget: Budget
}>

@Injectable()
export class CreateBudgetUseCase {
  constructor(
    private budgetRepository: BudgetRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({
    amount,
    categoryId,
    userId,
    startDate,
    endDate,
  }: CreateBudgetUseCaseRequest)
    : Promise<CreateBudgetUseCaseResponse> {
    const userExists = await this.userRepository.findById(userId)
    if (!userExists) {
      return left(new UserAlreadyExistsError(userId))
    }

    const categoryExists = await this.categoryRepository.findById(categoryId)

    if (!categoryExists) {
      return left(new CategoryAlreadyExistsError(categoryId))
    }
    const budget = new Budget({
      amount,
      categoryId,
      userId,
      createdAt: new Date(),
      startDate: startDate
        ? new Date(startDate)
        : null,
      endDate: endDate
        ? new Date(endDate)
        : null,
    },
    )
    await this.budgetRepository.create(budget)

    return right({ budget })
  }
}
