import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { ExpenseRepository } from '@/domain/repositories/expense-repository'
import { Expense } from '@/domain/entities/expense'
import { PrismaExpenseMapper } from '../mapper/prisma-expense-mapper'

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(private prisma: PrismaService) {}

  async create(expenses: Expense): Promise<void> {
    const data = PrismaExpenseMapper.toPrisma(expenses)
    await this.prisma.expense.create({
      data,
    })
  }

  async findById(expenseId: string): Promise<Expense | null> {
    const expense = await this.prisma.expense.findUnique({
      where: { id: expenseId },
    })
    return PrismaExpenseMapper.toDomain(expense)
  }

  async update(expenses: Expense): Promise<void> {
    const data = PrismaExpenseMapper.toPrisma(expenses)

    await this.prisma.expense.update({
      where: { id: expenses.id },
      data,
    })
  }

  async delete(expenseId: string):Promise<void> {
    await this.prisma.expense.delete({
      where: { id: expenseId },
    })
  }
}
