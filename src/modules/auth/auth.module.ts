import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JWT_CONSTANTS } from './contants'
import { AuthRepository } from './repositories/auth.repository'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [ UsersModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }) ,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || JWT_CONSTANTS.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '60s' }
    })
  ],
  providers: [AuthService, AuthRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [ PassportModule, AuthService ]
})
export class AuthModule {}
