/* eslint-disable @stylistic/max-len */
import { test, describe, expect, beforeEach } from 'vitest'
import { InMemoryBudgetRepository } from 'test/repositories/in-memory-budget-repository'
import { CreateBudgetUseCase } from './create-budget'
import { User } from '../entities/user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category-repository'
import { Category } from '../entities/category'

let inMemoryBudgetRepository: InMemoryBudgetRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let createBudgetUseCase: CreateBudgetUseCase

describe('create budget', () => {
  beforeEach(() => {
    inMemoryBudgetRepository = new InMemoryBudgetRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    createBudgetUseCase = new CreateBudgetUseCase(
      inMemoryBudgetRepository,
      inMemoryUserRepository,
      inMemoryCategoryRepository,
    )
  })

  test('should be able to create a budget', async () => {
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

    const result = await createBudgetUseCase.execute({
      amount: 120,
      categoryId: category.id,
      userId: user.id,
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-12-31'),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBudgetRepository.items[0].userId).toBe(user.id)
  })
})
