import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@/domain/repositories/user-repository'
import { User } from '@/domain/entities/user'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { Category } from '@/domain/entities/category'

describe('Create incomes [E2E]', () => {
  let app: INestApplication
  let jwt: JwtService
  let userRepository: UserRepository
  let categoryRepository: CategoryRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    userRepository = moduleRef.get(UserRepository)
    categoryRepository = moduleRef.get(CategoryRepository)
    await app.init()
  })

  test('shoud be able to create categories', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      createdAt: new Date(),
    })

    await userRepository.create(user)
    const accessToken = jwt.sign({ sub: user.id })

    const category = new Category({
      name: 'Salario',
      description: 'Salario referente a sistema criado para um cliente',
    }, 'category-id')

    await categoryRepository.create(category)

    const response = await request(app.getHttpServer())
      .post('/incomes')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201)
      .send({
        amount: 520,
        description: 'Freelance',
        userId: user.id,
        createdAt: new Date(),
        categoryId: 'category-id',
      })
    expect(response.statusCode).toBe(201)
  })
})
