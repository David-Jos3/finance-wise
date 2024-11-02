/* eslint-disable @stylistic/max-len */
import { describe, test, expect, beforeEach } from 'vitest'
import { User } from '../entities/user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryExpenseRepository } from 'test/repositories/in-memory-expense-repository'
import { DeleteExpenseUseCase } from './delete-expense'
import { Expense } from '../entities/expense'

let inMemoryExpenseRepository: InMemoryExpenseRepository
let inMemoryUserRepository: InMemoryUserRepository
let deleteExpenseUseCase: DeleteExpenseUseCase

describe('Delete expense', async () => {
  beforeEach(() => {
    inMemoryExpenseRepository = new InMemoryExpenseRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    deleteExpenseUseCase = new DeleteExpenseUseCase(inMemoryExpenseRepository)
  })

  test('should delete a expense', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
    })
    inMemoryUserRepository.items.push(user)

    const expense = new Expense({
      amount: 100,
      date: new Date('2024-03-24'),
      userId: user.id,
      categoryId: 'category-01',
      createdAt: new Date(),
    })
    inMemoryExpenseRepository.items.push(expense)

    const result = await deleteExpenseUseCase.execute({ expenseId: expense.id, userId: user.id })
    console.log(result)

    expect(result.isRight()).toBe(true) // Isso confirma que a exclusão foi bem-sucedida.
    expect(inMemoryExpenseRepository.items).toHaveLength(0)
  })
})
