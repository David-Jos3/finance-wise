import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '@/domain/repositories/category-repository'
import { Category } from '@/domain/entities/category'
import { PrismaService } from '../../prisma.service'
import { PrismaCategoryMapper } from '../mapper/prisma-category-mapper'

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)
    await this.prisma.category.create({
      data,
    })
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: { name },
    })
    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  async findById(categoryId: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique(
      { where: { id: categoryId } })

    return PrismaCategoryMapper.toDomain(category)
  }

  async update(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)
    await this.prisma.category.update({
      where: { id: category.id },
      data,
    })
  }
}
