import { Budget } from '@/domain/entities/budget'
import { BudgetRepository } from '@/domain/repositories/budget-repository'

export class InMemoryBudgetRepository implements BudgetRepository {
  public items: Budget[] = []

  async create(budget: Budget): Promise<void> {
    this.items.push(budget)
  }

  async findById(budgetId: string): Promise<Budget | null> {
    return this.items.find((item) => item.id === budgetId)
  }
}
