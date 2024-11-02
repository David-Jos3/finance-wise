import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'

import { Category } from '@/domain/entities/category'
import { ExpenseRepository } from '@/domain/repositories/expense-repository'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@/domain/repositories/user-repository'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { User } from '@/domain/entities/user'
import { Expense } from '@/domain/entities/expense'

describe('Delete Expenses [E2E]', () => {
  let app: INestApplication
  let jwt: JwtService
  let userRepository : UserRepository
  let categoryRepository : CategoryRepository
  let expenseRepository : ExpenseRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    userRepository = moduleRef.get(UserRepository)
    categoryRepository = moduleRef.get(CategoryRepository)
    expenseRepository = moduleRef.get(ExpenseRepository)
    await app.init()
  })

  test('DELETE /expenses/:id', async () => {
    const user = new User({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: 'password',
      createdAt: new Date(),
    })

    await userRepository.create(user)

    const accessToken = jwt.sign({ sub: user.id })

    const category = new Category({
      name: 'test',
      description: 'test category',
    })

    await categoryRepository.create(category)

    const expense = new Expense({
      amount: 100,
      categoryId: category.id,
      date: new Date(),
      description: 'test',
      updatedAt: new Date(),
      userId: user.id,
      createdAt: new Date(),
    })

    await expenseRepository.create(expense)

    const expensesId = expense.id

    const response = await request(app.getHttpServer())
      .delete(`/expenses/${expensesId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)
  })
})
