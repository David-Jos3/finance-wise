/* eslint-disable @stylistic/max-len */
import { describe, test, expect, beforeEach } from 'vitest'
import { User } from '../entities/user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryIncomeRepository } from 'test/repositories/in-memory-income-repository'
import { DeleteIncomeUseCase } from './delete-income'
import { Income } from '../entities/income'

let inMemoryIncomeRepository: InMemoryIncomeRepository
let inMemoryUserRepository: InMemoryUserRepository
let deleteIncomeUseCase: DeleteIncomeUseCase

describe('Delete income', async () => {
  beforeEach(() => {
    inMemoryIncomeRepository = new InMemoryIncomeRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    deleteIncomeUseCase = new DeleteIncomeUseCase(inMemoryIncomeRepository)
  })

  test('should delete a income', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
    })
    inMemoryUserRepository.items.push(user)

    const income = new Income({
      amount: 100,
      userId: user.id,
      categoryId: 'category-01',
      createdAt: new Date(),
    })
    inMemoryIncomeRepository.items.push(income)

    const result = await deleteIncomeUseCase.execute({ incomeId: income.id, userId: user.id })
    console.log(result)

    expect(result.isRight()).toBe(true) // Isso confirma que a exclusão foi bem-sucedida.
    expect(inMemoryIncomeRepository.items).toHaveLength(0)
  })
})
