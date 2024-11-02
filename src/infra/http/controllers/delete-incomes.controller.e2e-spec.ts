import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'

import { Category } from '@/domain/entities/category'
import { IncomeRepository } from '@/domain/repositories/income-repository'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@/domain/repositories/user-repository'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { User } from '@/domain/entities/user'
import { Income } from '@/domain/entities/income'

describe('Delete Incomes [E2E]', () => {
  let app: INestApplication
  let jwt: JwtService
  let userRepository : UserRepository
  let categoryRepository : CategoryRepository
  let incomeRepository : IncomeRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    userRepository = moduleRef.get(UserRepository)
    categoryRepository = moduleRef.get(CategoryRepository)
    incomeRepository = moduleRef.get(IncomeRepository)
    await app.init()
  })

  test('DELETE /incomes/:id', async () => {
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

    const income = new Income({
      amount: 100,
      categoryId: category.id,
      userId: user.id,
      createdAt: new Date(),
    })

    await incomeRepository.create(income)

    const incomesId = income.id

    const response = await request(app.getHttpServer())
      .delete(`/incomes/${incomesId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)
  })
})
