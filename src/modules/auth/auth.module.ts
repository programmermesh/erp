import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWT_CONSTANTS } from './contants'
import { AuthRepository } from './repositories/auth.repository'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ResetPasswordRequestEntity } from './reset-password.entity'

@Module({
  imports: [  
    PassportModule.register({ 
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }) ,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || JWT_CONSTANTS.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || JWT_CONSTANTS.expiresIn }
    }),
    TypeOrmModule.forFeature([AuthRepository, ResetPasswordRequestEntity])    
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [ PassportModule, JwtStrategy ]
})
export class AuthModule {}
