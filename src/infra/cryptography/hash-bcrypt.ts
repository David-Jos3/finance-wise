import { HashComparer } from '@/domain/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/cryptography/hash-generator'
import { hash, compare } from 'bcrypt'

export class HashBcrypt implements HashComparer, HashGenerator {
  private saltOrRound = 8
  hash(password: string): Promise<string> {
    return hash(password, this.saltOrRound)
  }

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }
}
