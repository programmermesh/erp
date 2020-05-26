import { Module } from '@nestjs/common';
import { BusinessStagesController } from './business-stages.controller';

@Module({
  controllers: [BusinessStagesController]
})
export class BusinessStagesModule {}
