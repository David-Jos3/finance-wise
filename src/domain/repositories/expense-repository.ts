import { Expense } from '../entities/expense'

export abstract class ExpenseRepository {
  abstract create(data:Expense): Promise<void>
}
