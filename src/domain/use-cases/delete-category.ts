import { Either, left, right } from '@/core/either'
import { CategoryRepository } from '../repositories/category-repository'
import { ResourceNotFoundError } from '@/core/errors/error/resource-not-found'
import { Injectable } from '@nestjs/common'

interface DeleteCategroyUseCaseRequest {
  categoryId: string
}

type DeleteCategoryUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ categoryId }: DeleteCategroyUseCaseRequest)
    : Promise<DeleteCategoryUseCaseResponse> {
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    await this.categoryRepository.delete(category.id)
    return right(null)
  }
}
