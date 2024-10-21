/* eslint-disable @stylistic/max-len */
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipe/zod-validation-pipe'
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate-user'
import { Public } from '../auth/public'
import { right } from '@/core/either'
import { WrongCredentialsError } from '@/domain/use-cases/errors/wrong-credentials-error'

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

type AuthenticateBodySchema = z.infer<typeof authenticateUserBodySchema>

@Controller('/sessions')
@UsePipes(new ZodValidationPipe(authenticateUserBodySchema))
export class AuthenticateController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Public()
  @Post()
  @HttpCode(201)
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value
      if (error instanceof WrongCredentialsError) {
        throw new UnauthorizedException()
      }
      throw new BadRequestException()
    }

    const { accessToken } = result.value

    return right({ access_token: accessToken })
  }
}
