import { RegisterUserUseCase } from './register-user'
import { InMemoryUserRepository }
  from './../../../test/repositories/in-memory-user-repository'
import { test, describe, expect, beforeEach } from 'vitest'
import { FakeHash } from 'test/cryptography/fake-hash'

let inMemoryUserRepository: InMemoryUserRepository
let registerUserUseCase: RegisterUserUseCase
let fakeHash: FakeHash

describe('create user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHash = new FakeHash()
    registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      fakeHash,
    )
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
  test('The users password should be hashed', async () => {
    const user = await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })
    const passwordHash = await fakeHash.hash('password123')

    expect(user.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].password).toBe(passwordHash)
  })
})
