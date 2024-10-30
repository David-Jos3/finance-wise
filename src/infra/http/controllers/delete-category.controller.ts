/* eslint-disable @stylistic/max-len */
import { DeleteCategoryUseCase } from '@/domain/use-cases/delete-category'
import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'
import { Public } from '../auth/public'

@Controller('/categories/:id')
export class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  @Delete()
  @Public()
  @HttpCode(204)
  async handle(@Param('id') categoryId: string) {
    const result = await this.deleteCategoryUseCase.execute({ categoryId })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
