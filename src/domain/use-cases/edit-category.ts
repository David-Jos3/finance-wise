import { Either, left, right } from '@/core/either'
import { Category } from '../entities/category'
import { CategoryRepository } from '../repositories/category-repository'
import { Injectable } from '@nestjs/common'

interface EditCategoryUseCaseRequest {
  categoryId: string
  name: string
  description?: string
}

type EditCategoryUseCaseResponse = Either<string, {
  category: Category
}>

@Injectable()
export class EditCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute({
    categoryId,
    name,
    description,
  }
  : EditCategoryUseCaseRequest) : Promise<EditCategoryUseCaseResponse> {
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      return left('Category not found')
    }
    category.setName(name)

    if (description !== undefined) {
      category.setDescription(description)
    }

    await this.categoryRepository.update(category)

    return right({ category })
  }
}
