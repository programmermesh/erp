import { Module } from '@nestjs/common';
import { CompaniesCustomersProblemsSolutionsController } from './companies-customers-problems-solutions.controller';
import { CompaniesCustomersProblemsSolutionsService } from './companies-customers-problems-solutions.service';

@Module({
  controllers: [CompaniesCustomersProblemsSolutionsController],
  providers: [CompaniesCustomersProblemsSolutionsService]
})
export class CompaniesCustomersProblemsSolutionsModule {}
