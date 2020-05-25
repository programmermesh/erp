import { Module } from '@nestjs/common';
import { CompaniesLeadListController } from './companies-lead-list.controller';

@Module({
  controllers: [CompaniesLeadListController]
})
export class CompaniesLeadListModule {}
