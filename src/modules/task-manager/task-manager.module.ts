import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TaskManagerController } from './task-manager.controller';
import { TaskManagerEntity } from './task-manager.entity';
import { TaskManagerService } from './task-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskManagerEntity]), AuthModule],
  controllers: [TaskManagerController],
  providers: [TaskManagerService],
  exports: [TaskManagerService],
})
export class TaskManagerModule {}
