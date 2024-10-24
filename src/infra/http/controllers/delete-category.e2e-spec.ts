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

  test('DELETE /categories/:id', async () => {
    const category = new Category({
      name: 'test',
      description: 'test category',
    })

    await categoryRepository.create(category)

    const categoryId = category.id

    const response = await request(app.getHttpServer())
      .delete(`/categories/${categoryId}`)

    expect(response.statusCode).toBe(204)
  })
})
