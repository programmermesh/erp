import { Module } from '@nestjs/common';
import { CompaniesCustomerSegmentDetailsController } from './companies-customer-segment-details.controller';
import { CompaniesCustomerSegmentDetailsService } from './companies-customer-segment-details.service';

@Module({
  controllers: [CompaniesCustomerSegmentDetailsController],
  providers: [CompaniesCustomerSegmentDetailsService]
})
export class CompaniesCustomerSegmentDetailsModule {}
