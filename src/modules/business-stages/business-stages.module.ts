import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessStagesController } from './business-stages.controller';
import { BusinessStagesService } from './business-stages.service';
import { BusinessStagesEntity } from './business-stages.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BusinessStagesEntity])],
  controllers: [BusinessStagesController],
  providers: [BusinessStagesService]
})
export class BusinessStagesModule {}
