/* eslint-disable @stylistic/max-len */
import { z } from 'zod'
import { EditCategoryUseCase } from '@/domain/use-cases/edit-category'
import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { ZodValidationPipe } from '../pipe/zod-validation-pipe'
import { Public } from '../auth/public'
import { right } from '@/core/either'

const editCategoryBodySchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  description: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editCategoryBodySchema)

type EditCategoryBodySchema = z.infer<typeof editCategoryBodySchema>

@Controller('/categories/:id')
export class EditCategoryController {
  constructor(private editCategoryUseCase: EditCategoryUseCase) {}

  @Put()
  @Public()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditCategoryBodySchema,
    @Param('id') categoryId: string,
  ) {
    const { name, description } = body

    const result = await this.editCategoryUseCase.execute({
      categoryId,
      name,
      description,
    })

    if (result.isLeft()) {
      console.log('Error:', result.value)
      throw new BadRequestException()
    }
    return right({})
  }
}
