import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { Income } from '@/domain/entities/income'
import { PrismaIncomeMapper } from '../mapper/prisma-income-mapper'
import { IncomeRepository } from '@/domain/repositories/income-repository'

@Injectable()
export class PrismaIncomeRepository implements IncomeRepository {
  constructor(private prisma: PrismaService) {}

  async create(incomes: Income): Promise<void> {
    const data = PrismaIncomeMapper.toPrisma(incomes)
    await this.prisma.income.create({
      data,
    })
  }

  async findById(incomeId: string): Promise<Income | null> {
    const income = await this.prisma.income.findUnique({
      where: { id: incomeId },
    })
    return PrismaIncomeMapper.toDomain(income)
  }

  async update(income: Income): Promise<void> {
    const data = PrismaIncomeMapper.toPrisma(income)

    await this.prisma.income.update({
      where: { id: income.id },
      data,
    })
  }

  async delete(incomeId: string): Promise<void> {
    await this.prisma.income.delete({
      where: { id: incomeId },
    })
  }
}
