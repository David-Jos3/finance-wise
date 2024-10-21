import { Income } from '@/domain/entities/income'
import { IncomeRepository } from '@/domain/repositories/income-repository'

export class InMemoryIncomeRepository implements IncomeRepository {
  public items: Income[] = []

  async create(income: Income): Promise<void> {
    this.items.push(income)
  }
}
