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
}
