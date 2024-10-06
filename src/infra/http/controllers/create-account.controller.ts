/* eslint-disable @stylistic/max-len */
import { RegisterUserUseCase } from '@/domain/use-cases/register-user'
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipe/zod-validation-pipe'
import { Public } from '../auth/public'
import { UserAlreadyExistsError } from '@/domain/use-cases/errors/user-already-exists-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@UsePipes(new ZodValidationPipe(createAccountBodySchema))
export class CreateAccountController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}
  @Public()
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerUserUseCase.execute({
      name,
      email,
      password,
    })
    if (result.isLeft()) {
      const error = result.value
      if (error instanceof UserAlreadyExistsError) {
        throw new ConflictException(error.message)
      }
      throw new BadRequestException(error)
    }
  }
}
