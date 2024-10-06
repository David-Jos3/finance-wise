import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { describe, test, expect, beforeAll } from 'vitest'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account [E2E]', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('shoud be able to create account user', async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts')
      .expect(201)
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      })
    expect(response.statusCode).toBe(201)
  })
})
