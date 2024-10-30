/* eslint-disable @stylistic/max-len */
import { InMemoryBudgetRepository } from 'test/repositories/in-memory-budget-repository'
import { describe, test, expect, beforeEach } from 'vitest'
import { DeleteBudgetUseCase } from './delete-budget'
import { Budget } from '../entities/budget'
import { User } from '../entities/user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

let inMemoryBudgetRepository: InMemoryBudgetRepository
let inMemoryUserRepository: InMemoryUserRepository
let deleteBudgetUseCase: DeleteBudgetUseCase

describe('Delete budget', async () => {
  beforeEach(() => {
    inMemoryBudgetRepository = new InMemoryBudgetRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    deleteBudgetUseCase = new DeleteBudgetUseCase(inMemoryBudgetRepository)
  })

  test('should delete a budget', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
    })
    inMemoryUserRepository.items.push(user)

    const budget = new Budget({
      amount: 100,
      userId: user.id,
      categoryId: 'category-01',
      endDate: new Date(),
      startDate: new Date(),
      createdAt: new Date(),
    })
    inMemoryBudgetRepository.items.push(budget)

    await deleteBudgetUseCase.execute({ budgetId: budget.id, userId: user.id })

    expect(inMemoryBudgetRepository.items).toHaveLength(0)
  })
})
