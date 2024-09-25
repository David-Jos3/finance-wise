import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Env } from '@/infra/env/env'

@Module({
  imports: [PassportModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService<Env, true>) => {
      const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
      const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
      return {
        privateKey,
        publicKey,
        signOptions: { expiresIn: '1h' },
      }
    },

  }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}