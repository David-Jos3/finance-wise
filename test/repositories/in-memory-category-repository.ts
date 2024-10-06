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
}
