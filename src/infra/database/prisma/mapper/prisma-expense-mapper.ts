import { Expense } from '@/domain/entities/expense'
import { Expense as PrismaExpense, Prisma } from '@prisma/client'

export class PrismaExpenseMapper {
  static toDomain(expense: PrismaExpense): Expense {
    return new Expense({
      amount: expense.amount,
      description: expense.description,
      categoryId: expense.categoryId,
      createdAt: expense.createdAt,
      userId: expense.userId,
      date: expense.date,
    }, expense.id)
  }

  static toPrisma(expense: Expense): Prisma.ExpenseUncheckedCreateInput {
    return {
      id: expense.id,
      amount: expense.amount,
      description: expense.description,
      categoryId: expense.categoryId,
      userId: expense.userId,
      createdAt: expense.createdAt,
    }
  }
}
