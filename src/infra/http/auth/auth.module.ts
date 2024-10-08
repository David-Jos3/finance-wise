import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Env } from '@/infra/env/env'
import { JwtStrategy } from './jwt.strategy'
import { EnvService } from '@/infra/env/env.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [PassportModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService<Env, true>) => {
      const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
      const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
      return {
        signOptions: { expiresIn: '1h', algorithm: 'RS256' },
        privateKey: Buffer.from(privateKey, 'base64'),
        publicKey: Buffer.from(publicKey, 'base64'),
      }
    },

  }),
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
