import { Category as PrismaCategory, Prisma } from '@prisma/client'
import { Category } from '@/domain/entities/category'

export class PrismaCategoryMapper {
  static toDomain(category: PrismaCategory): Category {
    return new Category({
      name: category.name,
      description: category.description,

    }, category.id)
  }

  static toPrisma(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    }
  }
}
