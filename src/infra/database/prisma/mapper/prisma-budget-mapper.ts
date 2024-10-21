import { Budget as PrismaBudget, Prisma } from '@prisma/client'
import { Budget } from '@/domain/entities/budget'

export class PrismaBudgetMapper {
  static toDomain(budget: PrismaBudget): Budget {
    return new Budget({
      amount: budget.amount,
      categoryId: budget.categoryId,
      userId: budget.userId,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
      endDate: budget.endDate,
      startDate: budget.startDate,

    }, budget.id)
  }

  static toPrisma(budget: Budget): Prisma.BudgetUncheckedCreateInput {
    return {
      id: budget.id,
      amount: budget.amount,
      categoryId: budget.categoryId,
      userId: budget.userId,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
      endDate: budget.endDate,
      startDate: budget.startDate,
    }
  }
}
