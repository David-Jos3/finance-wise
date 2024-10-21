/* eslint-disable @stylistic/max-len */
import { test, describe, expect, beforeEach } from 'vitest'
import { User } from '../entities/user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category-repository'
import { Category } from '../entities/category'
import { InMemoryExpenseRepository } from 'test/repositories/in-memory-expense-repository'
import { CreateExpenseUseCase } from './create-expense'

let inMemoryExpenseRepository: InMemoryExpenseRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let createExpenseUseCase: CreateExpenseUseCase

describe('create budget', () => {
  beforeEach(() => {
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    createExpenseUseCase = new CreateExpenseUseCase(
      inMemoryExpenseRepository,
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
      name: 'plataformas de streaming',
      description: 'Despesas com serviços de assinatura de streaming de vídeo e música, como Netflix, Amazon Prime, Spotify, e similares',
    })

    inMemoryCategoryRepository.items.push(category)

    const result = await createExpenseUseCase.execute({
      amount: 13.90,
      description: 'Amazon Prime',
      categoryId: category.id,
      userId: user.id,
      createdAt: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryExpenseRepository.items[0].userId).toBe(user.id)
  })
})
