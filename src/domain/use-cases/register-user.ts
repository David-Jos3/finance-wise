import { Injectable } from '@nestjs/common'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'
import { hash } from 'bcrypt'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

@Injectable()
export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }:RegisterUserUseCaseRequest)
    : Promise<RegisterUserUseCaseResponse> {
    const passwordHash = await hash(password, 8)

    const user = new User({
      name,
      email,
      password: passwordHash,
      createdAt: new Date(),
    })

    await this.userRepository.create(user)
    return { user }
  }
}
