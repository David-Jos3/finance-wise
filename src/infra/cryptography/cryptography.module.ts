import { Module } from '@nestjs/common'
import { Encrypter } from '@/domain/cryptography/encrypter'
import { HashComparer } from '@/domain/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/cryptography/hash-generator'

import { HashBcrypt } from './hash-bcrypt'
import { JwtEncrypter } from './jwt-encrypter'
import { AuthModule } from '../http/auth/auth.module'

@Module({
  imports: [AuthModule],
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: HashBcrypt },
    { provide: HashGenerator, useClass: HashBcrypt },
  ],
  exports: [
    Encrypter,
    HashComparer,
    HashGenerator,
  ],
})

export class CryptographyModule {}
