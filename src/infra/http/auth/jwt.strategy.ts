import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { EnvService } from '@/infra/env/env.service'
import { z } from 'zod'

const tokenPayload = z.object({
  sub: z.string().uuid(),
})

type TokenPayload = z.infer<typeof tokenPayload>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  async validate(payload:TokenPayload) {
    return tokenPayload.parse(payload)
  }
}
