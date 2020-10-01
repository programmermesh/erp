import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesCustomersController } from './companies-customers.controller';
import { CompaniesCustomersService } from './companies-customers.service';
import { CustomerEntity } from './customer.entity'
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'
import { IncomeBracketEntity } from '../income-brackets/income-bracket.entity'
import { EducationStagesEntity } from '../education-stages/education-stages.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
@Module({
  imports: [TypeOrmModule.forFeature([
    CustomerEntity,
    CompanyCustomerSegmentsEntity,
    IncomeBracketEntity,
    EducationStagesEntity,
    Company
  ])],
  controllers: [CompaniesCustomersController],
  providers: [CompaniesCustomersService]
})
export class CompaniesCustomersModule {}
