import { AppModule } from './../../../app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { AuthModule } from '../auth/auth.module'
import { UserRepository } from '@/domain/repositories/user-repository'
import { hash } from 'bcrypt'
import { User } from '@/domain/entities/user'

describe('Authenticate User (E2E)', () => {
  let app: INestApplication
  let userRepository: UserRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    }).compile()

    app = moduleRef.createNestApplication()
    userRepository = moduleRef.get(UserRepository)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await hash('12345678', 10),
      createdAt: new Date(),
    })

    await userRepository.create(user)

    const response = await request(app.getHttpServer())
      .post('/sessions')
      .expect(201)
      .send({
        email: 'john.doe@example.com',
        password: '12345678',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject({
      value: {
        access_token: expect.any(String),
      },
    })
  })
})
