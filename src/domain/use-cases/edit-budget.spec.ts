/* eslint-disable @stylistic/max-len */
import { test, describe, expect, beforeEach } from 'vitest'
import { InMemoryBudgetRepository } from 'test/repositories/in-memory-budget-repository'
import { User } from '../entities/user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category-repository'
import { Category } from '../entities/category'
import { EditBudgetUseCase } from './edit-budget'
import { Budget } from '../entities/budget'

let inMemoryBudgetRepository: InMemoryBudgetRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let editBudgetUseCase: EditBudgetUseCase

describe('edit budget', () => {
  beforeEach(() => {
    inMemoryBudgetRepository = new InMemoryBudgetRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    editBudgetUseCase = new EditBudgetUseCase(inMemoryBudgetRepository)
  })

  test('should be able to edit a budget', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
    })

    inMemoryUserRepository.items.push(user)

    const category = new Category({
      name: 'Food',
      description: 'Hot dog and pizza in a restaurant',
    })

    inMemoryCategoryRepository.items.push(category)

    const budget = new Budget({
      amount: 100,
      categoryId: category.id,
      userId: user.id,
      createdAt: new Date(),
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-12-31'),
    }, 'budget-id')

    inMemoryBudgetRepository.create(budget)

    const result = await editBudgetUseCase.execute({
      budgetId: 'budget-id',
      amount: 130,
      categoryId: category.id,
      startDate: new Date('2023-02-25'),
      endDate: new Date('2023-12-31'),
      userId: user.id,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBudgetRepository.items[0].userId).toBe(user.id)
    expect(inMemoryBudgetRepository.items[0].amount).toBe(130)
  })
})
