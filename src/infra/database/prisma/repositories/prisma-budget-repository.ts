import { Injectable } from '@nestjs/common'
import { BudgetRepository } from '@/domain/repositories/budget-repository'
import { Budget } from '@/domain/entities/budget'
import { PrismaService } from '../../prisma.service'
import { PrismaBudgetMapper } from '../mapper/prisma-budget-mapper'

@Injectable()
export class PrismaBudgetRepository implements BudgetRepository {
  constructor(private prisma: PrismaService) {}

  async create(budgets: Budget): Promise<void> {
    const data = PrismaBudgetMapper.toPrisma(budgets)
    await this.prisma.budget.create({
      data,
    })
  }

  async findById(budgetsId: string): Promise<Budget | null> {
    const budgets = await this.prisma.budget.findUnique(
      { where: { id: budgetsId } })
    return PrismaBudgetMapper.toDomain(budgets)
  }

  async update(budget: Budget): Promise<void> {
    const data = PrismaBudgetMapper.toPrisma(budget)
    await this.prisma.budget.update({
      where: { id: budget.id },
      data,
    })
  }

  async delete(budgetId: string): Promise<void> {
    await this.prisma.budget.delete({
      where: { id: budgetId },
    })
  }
}
