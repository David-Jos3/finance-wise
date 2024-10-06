/* eslint-disable @stylistic/max-len */
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-user'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { RegisterUserUseCase } from './register-user'
import { FakeHash } from 'test/cryptography/fake-hash'

describe('Authenticate User', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let authenticateUserUseCase: AuthenticateUserUseCase
  let fakeEncrypter: FakeEncrypter
  let registerUserUseCase : RegisterUserUseCase
  let fakeHash: FakeHash

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHash = new FakeHash()
    fakeEncrypter = new FakeEncrypter()
    registerUserUseCase = new RegisterUserUseCase(
      inMemoryUserRepository,
      fakeHash,
    )
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeHash,
      fakeEncrypter,
    )
  })
  test('should be authenticate a user', async () => {
    const user = await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    if (user.isLeft()) {
      throw new Error('Should not be a left')
    }
    inMemoryUserRepository.create(user.value.user)

    const accessToken = await authenticateUserUseCase.execute({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(accessToken.isRight()).toBeTruthy()
  })
})
