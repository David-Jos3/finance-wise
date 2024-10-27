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

  async update(budget: Budget): Promise<void> {
    const existingBudget = this.items.find((item) => item.id === budget.id)

    if (existingBudget) {
      existingBudget.amount = budget.amount
      existingBudget.categoryId = budget.categoryId
      existingBudget.startDate = budget.startDate
      existingBudget.endDate = budget.endDate
    } else {
      throw new Error('Budget not found')
    }
  }

  async delete(budgetId: string): Promise<void> {
    const index = this.items.findIndex(items => items.id === budgetId)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
