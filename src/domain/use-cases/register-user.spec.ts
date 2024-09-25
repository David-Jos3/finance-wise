import { RegisterUserUseCase } from './register-user'
import { InMemoryUserRepository }
  from './../../../test/repositories/in-memory-user-repository'
import { test, describe, expect, beforeEach } from 'vitest'

let inMemoryUserRepository: InMemoryUserRepository
let registerUserUseCase: RegisterUserUseCase

describe('create user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    registerUserUseCase = new RegisterUserUseCase(inMemoryUserRepository)
  })

  test('should be able to create a user', async () => {
    await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(inMemoryUserRepository.items)
      .toContainEqual(expect.objectContaining({
        name: 'John Doe',
        email: 'john.doe@example.com',
      }))
  })
})
