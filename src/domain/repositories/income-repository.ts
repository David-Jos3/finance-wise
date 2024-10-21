import { Income } from '../entities/income'

export abstract class IncomeRepository {
  abstract create(data: Income): Promise<void>
}
