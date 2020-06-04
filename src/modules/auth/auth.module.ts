import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
//import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JWT_CONSTANTS } from './contants'
import { AuthRepository } from './repositories/auth.repository'
import { JwtStrategy } from './strategies/jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ //UsersModule, 
    PassportModule.register({ 
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }) ,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || JWT_CONSTANTS.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '3600s' }
    }),
    TypeOrmModule.forFeature([AuthRepository])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [ PassportModule, JwtStrategy ]
})
export class AuthModule {}
