/* eslint-disable @stylistic/max-len */
import { test, describe, expect, beforeEach } from 'vitest'
import { InMemoryCategoryRepository }
  from 'test/repositories/in-memory-category-repository'
import { CreateCategoryUseCase } from './create-category'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'

let inMemoryCategoryRepository: InMemoryCategoryRepository
let createCategoryUseCase: CreateCategoryUseCase

describe('create category', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoryRepository,
    )
  })

  test('should be able to create a category', async () => {
    const result = await createCategoryUseCase.execute({
      name: 'food',
      description: 'hot dog and pizza in a restaurant',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCategoryRepository.items[0].name).toBe('food')
  })

  test('should not be able to create a category with the same name',
    async () => {
      const category01 = await createCategoryUseCase.execute({
        name: 'food',
        description: 'hot dog and pizza in a restaurant',
      })
      expect(category01.isRight()).toBe(true)
      expect(inMemoryCategoryRepository.items[0].name).toBe('food')

      const category02 = await createCategoryUseCase.execute({
        name: 'food',
        description: 'hot dog and pizza in a restaurant',
      })
      expect(category02.isLeft()).toBe(true)
      expect(category02.value).toBeInstanceOf(CategoryAlreadyExistsError)
    })
})
