import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { EnvService } from './infra/env/env.service'
import { HttpModule } from './infra/http/http.module'
import { AuthModule } from './infra/http/auth/auth.module'
import { EnvModule } from './infra/env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
    EnvModule,
  ],
  controllers: [],
  providers: [EnvService],
})
export class AppModule {}
