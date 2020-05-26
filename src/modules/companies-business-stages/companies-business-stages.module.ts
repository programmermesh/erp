import { Module } from '@nestjs/common';
import { CompaniesBusinessStagesController } from './companies-business-stages.controller';

@Module({
  controllers: [CompaniesBusinessStagesController]
})
export class CompaniesBusinessStagesModule {}
