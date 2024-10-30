import { Category } from './../entities/category'

export abstract class CategoryRepository {
  abstract create(data:Category): Promise<void>
  abstract findByName(name: string): Promise<Category | null>
  abstract findById(categoryId: string): Promise<Category | null>
  abstract update(category: Category): Promise<void>
  abstract delete(categoryId: string): Promise<void>
}
