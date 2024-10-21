/* eslint-disable @stylistic/max-len */
import { test, describe, expect, beforeEach } from 'vitest'
import { User } from '../entities/user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category-repository'
import { Category } from '../entities/category'
import { InMemoryIncomeRepository } from 'test/repositories/in-memory-income-repository'
import { CreateIncomeUseCase } from './create-income'

let inMemoryIncomeRepository: InMemoryIncomeRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let createIncomeUseCase: CreateIncomeUseCase

describe('create budget', () => {
  beforeEach(() => {
    inMemoryIncomeRepository = new InMemoryIncomeRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    createIncomeUseCase = new CreateIncomeUseCase(
      inMemoryIncomeRepository,
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
      name: 'Salario',
      description: 'tudo que ganho no mes',
    })

    inMemoryCategoryRepository.items.push(category)

    const result = await createIncomeUseCase.execute({
      amount: 2000,
      description: 'Freelance',
      categoryId: category.id,
      userId: user.id,
      createdAt: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryIncomeRepository.items[0].userId).toBe(user.id)
  })
})
