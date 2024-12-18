import { User } from '@/domain/entities/user'
import { UserRepository } from '@/domain/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findById(userId: string): Promise<User | null> {
    return this.items.find((item) => item.id === userId)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.email === email)
  }
}
