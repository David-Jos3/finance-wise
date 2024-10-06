import { Injectable } from '@nestjs/common'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Either, left, right } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
UserAlreadyExistsError, {
  user: User
}>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({ name, email, password }:RegisterUserUseCaseRequest)
    : Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }
    const passwordHash = await this.hashGenerator.hash(password)

    const user = new User({
      name,
      email,
      password: passwordHash,
      createdAt: new Date(),
    })

    await this.userRepository.create(user)
    return right({ user })
  }
}
