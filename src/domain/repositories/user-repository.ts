import { User } from '../entities/user'

export abstract class UserRepository {
  abstract create(account:User): Promise<void>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findById(userId: string): Promise<User | null>
}
