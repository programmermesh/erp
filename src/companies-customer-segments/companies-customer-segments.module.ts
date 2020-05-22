import { Module } from '@nestjs/common';
import { CompaniesCustomerSegmentsController } from './companies-customer-segments.controller';

@Module({
  controllers: [CompaniesCustomerSegmentsController]
})
export class CompaniesCustomerSegmentsModule {}
