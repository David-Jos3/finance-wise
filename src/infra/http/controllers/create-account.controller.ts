import { RegisterUserUseCase } from '@/domain/use-cases/register-user'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipe/zod-validation-pipe'

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
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
    console.log('Controller')
    console.log({ name, email, password })
    await this.registerUserUseCase.execute({
      name,
      email,
      password,
    })
  }
}
