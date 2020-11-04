import { Module } from '@nestjs/common';
import { UserSessionsController } from './user-sessions.controller';
import { UserSessionsService } from './user-sessions.service';
import { UserSessionsEntity as UserSessions } from './user-sessions.entity'
import { UserEntity as User } from '../users/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      UserSessions, User
    ])
  ],
  controllers: [UserSessionsController],
  providers: [UserSessionsService]
})
export class UserSessionsModule {}
