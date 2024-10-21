import { User } from '@/domain/entities/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { PrismaUserMapper } from '../mapper/prisma-user-mapper'
import { PrismaService } from '../../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    return PrismaUserMapper.toDomain(user)
  }
}
