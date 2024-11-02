import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/error/resource-not-found'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/error/not-allowed-error'
import { IncomeRepository } from '../repositories/income-repository'

interface DeleteIncomeUseCaseRequest {
  incomeId: string
  userId: string
}

type DeleteIncomeUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteIncomeUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  async execute({ incomeId, userId }: DeleteIncomeUseCaseRequest)
    : Promise<DeleteIncomeUseCaseResponse> {
    const income = await this.incomeRepository.findById(incomeId)

    if (!income) {
      return left(new ResourceNotFoundError())
    }

    if (income.userId !== userId) {
      return left(new NotAllowedError())
    }

    await this.incomeRepository.delete(income.id)

    return right(null)
  }
}
