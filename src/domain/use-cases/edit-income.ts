import { Injectable } from '@nestjs/common'
import { IncomeRepository } from '../repositories/income-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/error/resource-not-found'
import { Income } from '../entities/income'
import { NotAllowedError } from '@/core/errors/error/not-allowed-error'

interface EditIncomeUseCaseRequest {
  amount: number
  description: string,
  categoryId: string,
  incomeId: string,
  userId: string,
  updatedAt?: Date | null,
}

type EditIncomeUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,
{
  income: Income
} >

@Injectable()
export class EditIncomeUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  async execute({
    amount,
    categoryId,
    description,
    incomeId,
    updatedAt,
    userId,
  }:EditIncomeUseCaseRequest):
    Promise<EditIncomeUseCaseResponse> {
    const income = await this.incomeRepository.findById(incomeId)

    if (!income) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== income.userId) {
      return left(new NotAllowedError())
    }

    income.amount = amount
    income.description = description
    income.categoryId = categoryId
    income.updatedAt = updatedAt || new Date()

    await this.incomeRepository.update(income)

    return right({ income })
  }
}
