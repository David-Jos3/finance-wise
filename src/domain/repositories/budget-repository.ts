import { Budget } from '../entities/budget'

export abstract class BudgetRepository {
  abstract create(data:Budget): Promise<void>
  abstract findById(budgetId: string): Promise<Budget | null>
  abstract update(budget: Budget): Promise<void>
  abstract delete(budgetId: string): Promise<void>
}
