import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'

import { Category } from '@/domain/entities/category'
import { BudgetRepository } from '@/domain/repositories/budget-repository'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@/domain/repositories/user-repository'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { User } from '@/domain/entities/user'
import { Budget } from '@/domain/entities/budget'

describe('Delete Budgets [E2E]', () => {
  let app: INestApplication
  let jwt: JwtService
  let userRepository : UserRepository
  let categoryRepository : CategoryRepository
  let budgetRepository : BudgetRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    userRepository = moduleRef.get(UserRepository)
    categoryRepository = moduleRef.get(CategoryRepository)
    budgetRepository = moduleRef.get(BudgetRepository)
    await app.init()
  })

  test('DELETE /budgets/:id', async () => {
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

    const budget = new Budget({
      amount: 100,
      categoryId: category.id,
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-12-31'),
      userId: user.id,
      createdAt: new Date(),
    })

    await budgetRepository.create(budget)

    const budgetsId = budget.id

    const response = await request(app.getHttpServer())
      .delete(`/budgets/${budgetsId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)
  })
})
