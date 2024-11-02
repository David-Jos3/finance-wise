/* eslint-disable @stylistic/max-len */
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryExpenseRepository } from 'test/repositories/in-memory-expense-repository'
import { EditExpenseUseCase } from './edit-expense'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { Expense } from '../entities/expense'
import { User } from '../entities/user'

let inMemoryExpenseRepository: InMemoryExpenseRepository
let inMemoryUserRepository: InMemoryUserRepository
let editExpenseUseCase: EditExpenseUseCase

describe('Edit expense', () => {
  beforeEach(() => {
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    editExpenseUseCase = new EditExpenseUseCase(inMemoryExpenseRepository)
  })

  test('should be able to edit a category', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
    })

    inMemoryUserRepository.items.push(user)

    const expense = new Expense({
      amount: 100,
      categoryId: 'id-category',
      date: new Date(),
      description: 'test description',
      userId: user.id,
      createdAt: new Date(),
    })

    await inMemoryExpenseRepository.create(expense)
    const expenseId = expense.id

    const result = await editExpenseUseCase.execute({
      amount: 200,
      categoryId: 'id-category',
      date: new Date('2024-01-30'),
      expenseId,
      userId: user.id,
      description: 'expense-edited-description',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryExpenseRepository.items[0].amount).toBe(200)
    expect(inMemoryExpenseRepository.items[0].description).toBe('expense-edited-description')
  })
})
