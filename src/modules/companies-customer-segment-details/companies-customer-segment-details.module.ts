import { Module } from '@nestjs/common';
import { CompaniesCustomerSegmentDetailsController } from './companies-customer-segment-details.controller';
import { CompaniesCustomerSegmentDetailsService } from './companies-customer-segment-details.service';
import { CompanyCustomerSegmentsEntity as CompanyCustomerSegments } from '../companies-customer-segments/company-customer-segments.entity'
import { CompanyCustomerSegmentDetailsEntity as CompanyCustomerSegmentDetails } from './company-customer-segment-details.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([
    CompanyCustomerSegmentDetails, CompanyCustomerSegments
  ])],
  controllers: [CompaniesCustomerSegmentDetailsController],
  providers: [CompaniesCustomerSegmentDetailsService]
})
export class CompaniesCustomerSegmentDetailsModule {}
