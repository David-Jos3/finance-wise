import { Expense } from '@/domain/entities/expense'
import { ExpenseRepository } from '@/domain/repositories/expense-repository'

export class InMemoryExpenseRepository implements ExpenseRepository {
  public items: Expense[] = []

  async create(expense: Expense): Promise<void> {
    this.items.push(expense)
  }
}
