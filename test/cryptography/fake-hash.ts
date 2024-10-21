import { HashComparer } from '@/domain/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/cryptography/hash-generator'

export class FakeHash implements HashGenerator, HashComparer {
  async hash(password: string): Promise<string> {
    return password.concat('-hashed')
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return password.concat('-hashed') === hashedPassword
  }
}
