import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { Category } from '@/domain/entities/category'

describe('Edit Category [E2E]', () => {
  let app: INestApplication
  let categoryRepository : CategoryRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    categoryRepository = moduleRef.get(CategoryRepository)
    await app.init()
  })

  test('shoud be able to edit categories', async () => {
    const category = new Category({
      name: 'test',
      description: 'test category',
    })

    await categoryRepository.create(category)

    const response = await request(app.getHttpServer())
      .put(`/categories/${category.id}`)
      .expect(204)
      .send({
        name: 'test-02',
        description: 'test category edited',
      })
    expect(response.statusCode).toBe(204)
    expect(await categoryRepository.findById(category.id)).toMatchObject({
      name: 'test-02',
      description: 'test category edited',
    })
  })
})
