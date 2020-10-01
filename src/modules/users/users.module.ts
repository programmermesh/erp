import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity'
import { AuthModule } from '../auth/auth.module'


@Module({
  imports:[ 
    TypeOrmModule.forFeature([ UserEntity ]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
