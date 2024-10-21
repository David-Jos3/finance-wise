/* eslint-disable @stylistic/max-len */
import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '../repositories/category-repository'
import { Either, left, right } from '@/core/either'
import { Category } from '../entities/category'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'

interface CreateCategoryUseCaseRequest {
  name: string
  description?: string
}

type CreateCategoryUseCaseResponse = Either<CategoryAlreadyExistsError, {
  category: Category
}>

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ name, description }: CreateCategoryUseCaseRequest)
    : Promise<CreateCategoryUseCaseResponse> {
    const categoryWithSameName = await this.categoryRepository.findByName(name)

    if (categoryWithSameName) {
      return left(new CategoryAlreadyExistsError(name))
    }

    const category = new Category({
      name,
      description,
    },
    )
    await this.categoryRepository.create(category)

    return right({ category })
  }
}
