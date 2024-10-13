/* eslint-disable @stylistic/max-len */
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipe/zod-validation-pipe'
import { CreateCategoryUseCase } from '@/domain/use-cases/create-category'
import { CategoryAlreadyExistsError } from '@/domain/use-cases/errors/category-already-exists-error'
import { Public } from '../auth/public'

const createCategoryBodySchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  description: z.string().optional(),
})

type CreateCategoryBodySchema = z.infer<typeof createCategoryBodySchema>

@Controller('/categories')
@UsePipes(new ZodValidationPipe(createCategoryBodySchema))
export class CreateCategoriesController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  @Post()
  @Public()
  @HttpCode(201)
  async handle(@Body() body: CreateCategoryBodySchema) {
    const { name, description } = body
    const result = await this.createCategoryUseCase.execute({
      name,
      description,
    })
    if (result.isLeft()) {
      const error = result.value
      if (error instanceof CategoryAlreadyExistsError) {
        throw new ConflictException(error.message)
      }
      throw new BadRequestException(error)
    }
  }
}
