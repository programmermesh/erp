import { Module } from '@nestjs/common';
import { CompaniesCustomersProblemsSolutionsController } from './companies-customers-problems-solutions.controller';
import { CompaniesCustomersProblemsSolutionsService } from './companies-customers-problems-solutions.service';
import { CustomerProblemsSolutionsEntity as CustomerProblemsSolution } from './customer-problems-solutions.entity'
import { CustomerProblemsEntity as CustomerProblem } from '../companies-customers-problems/customer-problems.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    CustomerProblem,
    CustomerProblemsSolution
  ])],
  controllers: [CompaniesCustomersProblemsSolutionsController],
  providers: [CompaniesCustomersProblemsSolutionsService]
})
export class CompaniesCustomersProblemsSolutionsModule {}
