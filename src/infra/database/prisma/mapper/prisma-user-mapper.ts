import { User as PrismaUser, Prisma } from '@prisma/client'
import { User } from '@/domain/entities/user'

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return new User({
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }, user.id)
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
