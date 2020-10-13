import { Module } from '@nestjs/common';
import { CompaniesPerformanceIndicatorCustomersController } from './companies-performance-indicator-customers.controller';
import { CompaniesPerformanceIndicatorCustomersService } from './companies-performance-indicator-customers.service';
import { CompanyEntity as Company } from '../companies/company.entity'
import { PerformanceIndicatorCustomerEntity as PerformanceIndicatorCustomer } from './customer.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company, PerformanceIndicatorCustomer
    ])
  ],
  controllers: [CompaniesPerformanceIndicatorCustomersController],
  providers: [CompaniesPerformanceIndicatorCustomersService]
})
export class CompaniesPerformanceIndicatorCustomersModule {}
