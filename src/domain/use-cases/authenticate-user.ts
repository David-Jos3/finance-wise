import { HashComparer } from '@/domain/cryptography/hash-comparer'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Encrypter } from '../cryptography/encrypter'
import { Either, left, right } from '@/core/either'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either< WrongCredentialsError, {
  accessToken: string
}>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({ email, password }: AuthenticateUserUseCaseRequest)
    : Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }
    const passwordCompare = await this.hashCompare.compare(
      password, user.password,
    )

    if (!passwordCompare) {
      return left(new WrongCredentialsError())
    }
    const accessToken = await this.encrypter.encrypt({ sub: user.id })
    return right({ accessToken })
  }
}
