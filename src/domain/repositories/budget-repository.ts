import { Budget } from '../entities/budget'

export abstract class BudgetRepository {
  abstract create(data:Budget): Promise<void>
}
