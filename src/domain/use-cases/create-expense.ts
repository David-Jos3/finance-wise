/* eslint-disable @stylistic/max-len */
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { CategoryRepository } from '../repositories/category-repository'
import { BudgetAlreadyExistsError } from './errors/budget-already-exists-erro'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'
import { Expense } from '../entities/expense'
import { ExpenseRepository } from '../repositories/expense-repository'

interface CreateExpenseUseCaseRequest {
  amount: number
  description?: string
  date?: Date
  userId: string
  categoryId: string
  createdAt: Date
}

type CreateExpenseUseCaseResponse = Either<
BudgetAlreadyExistsError | UserAlreadyExistsError, {
  expense: Expense
}>

@Injectable()
export class CreateExpenseUseCase {
  constructor(
    private expenseRepository: ExpenseRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({
    amount,
    description,
    categoryId,
    userId,
    date,
  }: CreateExpenseUseCaseRequest)
    : Promise<CreateExpenseUseCaseResponse> {
    const userExists = await this.userRepository.findById(userId)
    if (!userExists) {
      return left(new UserAlreadyExistsError(userId))
    }

    const categoryExists = await this.categoryRepository.findById(categoryId)

    if (!categoryExists) {
      return left(new CategoryAlreadyExistsError(categoryId))
    }
    const expense = new Expense({
      amount,
      description,
      categoryId,
      userId,
      createdAt: new Date(),
      date,
    })
    await this.expenseRepository.create(expense)

    return right({ expense })
  }
}
