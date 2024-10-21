import { Income as PrismaIncome, Prisma } from '@prisma/client'
import { Income } from '@/domain/entities/income'

export class PrismaIncomeMapper {
  static toDomain(income: PrismaIncome): Income {
    return new Income({
      amount: income.amount,
      description: income.description,
      categoryId: income.categoryId,
      createdAt: income.createdAt,
      userId: income.userId,

    }, income.id)
  }

  static toPrisma(income: Income): Prisma.IncomeUncheckedCreateInput {
    return {
      id: income.id,
      amount: income.amount,
      description: income.description,
      categoryId: income.categoryId,
      userId: income.userId,
      createdAt: income.createdAt,
    }
  }
}
