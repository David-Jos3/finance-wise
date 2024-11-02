import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { Category } from '@/domain/entities/category'
import { Expense } from '@/domain/entities/expense'
import { ExpenseRepository } from '@/domain/repositories/expense-repository'
import { UserRepository } from '@/domain/repositories/user-repository'
import { User } from '@/domain/entities/user'
import { JwtService } from '@nestjs/jwt'

describe('Edit Expenses [E2E]', () => {
  let app: INestApplication
  let jwt: JwtService
  let expenseRepository: ExpenseRepository
  let userRepository: UserRepository
  let categoryRepository : CategoryRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    categoryRepository = moduleRef.get(CategoryRepository)
    expenseRepository = moduleRef.get(ExpenseRepository)
    userRepository = moduleRef.get(UserRepository)
    await app.init()
  })

  test('shoud be able to edit expense', async () => {
    const user = new User({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: 'password',
      createdAt: new Date(),
    })

    await userRepository.create(user)

    const accessToken = jwt.sign({ sub: user.id })

    const category = new Category({
      name: 'Test Category',
      description: 'Category for testing',
    })

    await categoryRepository.create(category)

    const expenses = new Expense({
      amount: 100,
      date: new Date(),
      categoryId: category.id,
      description: 'Initial expense',
      updatedAt: new Date(),
      userId: user.id,
      createdAt: new Date(),
    })

    await expenseRepository.create(expenses)

    const response = await request(app.getHttpServer())
      .put(`/expenses/${expenses.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        amount: 230,
        date: new Date(),
        categoryId: category.id,
        description: 'Updated Expense',
      })

    expect(response.statusCode).toBe(204)
    expect(await expenseRepository.findById(expenses.id)).toMatchObject({
      amount: 230,
      date: expect.any(Date),
      categoryId: category.id,
      description: 'Updated Expense',
    })
  })
})
