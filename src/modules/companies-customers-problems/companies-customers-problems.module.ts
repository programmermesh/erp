import { Module } from '@nestjs/common';
import { CompaniesCustomersProblemsController } from './companies-customers-problems.controller';
import { CompaniesCustomersProblemsService } from './companies-customers-problems.service';
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
import { CustomerProblemsEntity as CustomerProblem } from './customer-problems.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([
    Customer,
    CustomerProblem
  ])] ,
  controllers: [CompaniesCustomersProblemsController],
  providers: [CompaniesCustomersProblemsService]
})
export class CompaniesCustomersProblemsModule {}
