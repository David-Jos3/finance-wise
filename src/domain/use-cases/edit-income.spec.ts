/* eslint-disable @stylistic/max-len */
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryIncomeRepository } from 'test/repositories/in-memory-income-repository'
import { EditIncomeUseCase } from './edit-income'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { Income } from '../entities/income'
import { User } from '../entities/user'

let inMemoryIncomeRepository: InMemoryIncomeRepository
let inMemoryUserRepository: InMemoryUserRepository
let editIncomeUseCase: EditIncomeUseCase

describe('Edit income', () => {
  beforeEach(() => {
    inMemoryIncomeRepository = new InMemoryIncomeRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    editIncomeUseCase = new EditIncomeUseCase(inMemoryIncomeRepository)
  })

  test('should be able to edit a category', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
    })

    inMemoryUserRepository.items.push(user)

    const income = new Income({
      amount: 100,
      categoryId: 'id-category',
      description: 'test description',
      userId: user.id,
      createdAt: new Date(),
    })

    await inMemoryIncomeRepository.create(income)
    const incomeId = income.id

    const result = await editIncomeUseCase.execute({
      amount: 200,
      categoryId: 'id-category',
      incomeId,
      userId: user.id,
      description: 'income-edited-description',
    })

    console.log(result.value)

    expect(result.isRight()).toBe(true)
    expect(inMemoryIncomeRepository.items[0].amount).toBe(200)
    expect(inMemoryIncomeRepository.items[0].description).toBe('income-edited-description')
  })
})
