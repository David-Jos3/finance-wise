import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create account [E2E]', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('shoud be able to create categories', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .expect(201)
      .send({
        name: 'food',
        description: 'hot dog and pizza in a restaurant',
      })
    expect(response.statusCode).toBe(201)
  })
})
