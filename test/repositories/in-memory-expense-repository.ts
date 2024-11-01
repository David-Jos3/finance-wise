import { Expense } from '@/domain/entities/expense'
import { ExpenseRepository } from '@/domain/repositories/expense-repository'

export class InMemoryExpenseRepository implements ExpenseRepository {
  public items: Expense[] = []

  async create(expense: Expense): Promise<void> {
    this.items.push(expense)
  }

  async findById(expenseId: string): Promise<Expense | null> {
    return this.items.find(item => item.id === expenseId)
  }

  async update(expense: Expense): Promise<void> {
    const index = this.items.findIndex((item) => item.id === expense.id)

    if (index !== -1) {
      this.items[index] = expense
    }
  }

  async delete(expenseId: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === expenseId)

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
