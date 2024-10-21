/* eslint-disable @stylistic/max-len */
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { CategoryRepository } from '../repositories/category-repository'
import { BudgetAlreadyExistsError } from './errors/budget-already-exists-erro'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'
import { Income } from '../entities/income'
import { IncomeRepository } from '../repositories/income-repository'

interface CreateIncomeUseCaseRequest {
  amount: number
  description: string,
  categoryId: string,
  userId: string,
  createdAt: Date | null,

}

type CreateIncomeUseCaseResponse = Either<
BudgetAlreadyExistsError | UserAlreadyExistsError, {
  income: Income
}>

@Injectable()
export class CreateIncomeUseCase {
  constructor(
    private incomeRepository: IncomeRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({
    amount,
    description,
    categoryId,
    userId,
  }: CreateIncomeUseCaseRequest)
    : Promise<CreateIncomeUseCaseResponse> {
    const userExists = await this.userRepository.findById(userId)
    if (!userExists) {
      return left(new UserAlreadyExistsError(userId))
    }

    const categoryExists = await this.categoryRepository.findById(categoryId)

    if (!categoryExists) {
      return left(new CategoryAlreadyExistsError(categoryId))
    }
    const income = new Income({
      amount,
      description,
      categoryId,
      userId,
      createdAt: new Date(),
    })
    await this.incomeRepository.create(income)

    return right({ income })
  }
}
