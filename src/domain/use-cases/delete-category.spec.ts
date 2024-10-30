/* eslint-disable @stylistic/max-len */
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { Category } from '../entities/category'
import { DeleteCategoryUseCase } from './delete-category'

let inMemoryCategoryRepository: InMemoryCategoryRepository
let deleteCategoryUseCase: DeleteCategoryUseCase

describe('Delete category', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    deleteCategoryUseCase = new DeleteCategoryUseCase(inMemoryCategoryRepository)
  })

  test('should be able to edit a category', async () => {
    const category = new Category({
      name: 'category-01',
      description: 'category-01-updated',
    }, 'category-id')

    await inMemoryCategoryRepository.create(category)

    const result = await deleteCategoryUseCase.execute({
      categoryId: 'category-id',
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryCategoryRepository.items).toHaveLength(0)
  })
})
