import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesCustomerSegmentsController } from './companies-customer-segments.controller';
import { CompaniesCustomerSegmentsService } from './companies-customer-segments.service';
import { CompanyCustomerSegmentsEntity } from './company-customer-segments.entity'
import { CompanyEntity } from '../companies/company.entity';
import { UserEntity } from '../users/user.entity'
import { CustomerSegmentEntity } from '../customer-segments/customer-segment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyCustomerSegmentsEntity,
    CompanyEntity,
    UserEntity,
    CustomerSegmentEntity
  ])],
  controllers: [CompaniesCustomerSegmentsController],
  providers: [CompaniesCustomerSegmentsService]
})
export class CompaniesCustomerSegmentsModule {}
