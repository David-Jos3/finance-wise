import { Expense } from '../entities/expense'

export abstract class ExpenseRepository {
  abstract create(data:Expense): Promise<void>
  abstract findById(expenseId: string): Promise<Expense | null>
  abstract update(expense: Expense): Promise<void>
  abstract delete(expenseId: string): Promise<void>
}
