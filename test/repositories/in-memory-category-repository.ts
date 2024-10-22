import { Category } from '@/domain/entities/category'

import { CategoryRepository } from '@/domain/repositories/category-repository'

export class InMemoryCategoryRepository implements CategoryRepository {
  public items: Category[] = []

  async create(category: Category): Promise<void> {
    this.items.push(category)
  }

  async findByName(name: string): Promise<Category | null> {
    return this.items.find((item) => item.name === name)
  }

  async findById(categoryId: string): Promise<Category | null> {
    return this.items.find((item) => item.id === categoryId)
  }

  async update(category: Category): Promise<void> {
    const categoryId = this.items.find((item) => item.id === category.id)
    if (categoryId) {
      categoryId.setName(category.name)
      categoryId.setDescription(category.description)
    }
  }
}