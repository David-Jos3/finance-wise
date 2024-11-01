import { Income } from '@/domain/entities/income'
import { IncomeRepository } from '@/domain/repositories/income-repository'

export class InMemoryIncomeRepository implements IncomeRepository {
  public items: Income[] = []

  async create(income: Income): Promise<void> {
    this.items.push(income)
  }

  async findById(incomeId: string): Promise<Income | null> {
    return this.items.find(item => item.id === incomeId)
  }

  async update(income: Income): Promise<void> {
    const index = this.items.findIndex((item) => item.id === income.id)

    if (index !== -1) {
      this.items[index] = income
    }
  }

  async delete(incomeId: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === incomeId)

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
