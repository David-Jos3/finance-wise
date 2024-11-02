import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { Category } from '@/domain/entities/category'
import { Income } from '@/domain/entities/income'
import { IncomeRepository } from '@/domain/repositories/income-repository'
import { UserRepository } from '@/domain/repositories/user-repository'
import { User } from '@/domain/entities/user'
import { JwtService } from '@nestjs/jwt'

describe('Edit Incomes [E2E]', () => {
  let app: INestApplication
  let jwt: JwtService
  let incomeRepository: IncomeRepository
  let userRepository: UserRepository
  let categoryRepository : CategoryRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    categoryRepository = moduleRef.get(CategoryRepository)
    incomeRepository = moduleRef.get(IncomeRepository)
    userRepository = moduleRef.get(UserRepository)
    await app.init()
  })

  test('shoud be able to edit income', async () => {
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

    const incomes = new Income({
      amount: 100,
      categoryId: category.id,
      description: 'Initial income',
      updatedAt: new Date(),
      userId: user.id,
      createdAt: new Date(),
    })

    await incomeRepository.create(incomes)

    const response = await request(app.getHttpServer())
      .put(`/incomes/${incomes.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        amount: 230,
        categoryId: category.id,
        description: 'Updated Income',
      })

    expect(response.statusCode).toBe(204)
    expect(await incomeRepository.findById(incomes.id)).toMatchObject({
      amount: 230,
      categoryId: category.id,
      description: 'Updated Income',
    })
  })
})
