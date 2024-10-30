import { Income } from '../entities/income'

export abstract class IncomeRepository {
  abstract create(data: Income): Promise<void>
  abstract findById(incomeId: string): Promise<Income | null>
  abstract update(income: Income): Promise<void>
  abstract delete(incomeId: string): Promise<void>
}
