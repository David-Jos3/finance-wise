/* eslint-disable @stylistic/max-len */
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { EditCategoryUseCase } from './edit-category'
import { Category } from '../entities/category'

let inMemoryCategoryRepository: InMemoryCategoryRepository
let editCategoryUseCase: EditCategoryUseCase

describe('Edit category', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    editCategoryUseCase = new EditCategoryUseCase(inMemoryCategoryRepository)
  })

  test('should be able to edit a category', async () => {
    const category = new Category({
      name: 'category-01',
      description: 'category-01-updated',
    })
    await inMemoryCategoryRepository.create(category)

    const result = await editCategoryUseCase.execute({
      categoryId: category.id,
      name: 'category-01-edited',
      description: 'category-01-edited-description',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCategoryRepository.items[0].name).toBe('category-01-edited')
    expect(inMemoryCategoryRepository.items[0].description).toBe('category-01-edited-description')
  })
})
