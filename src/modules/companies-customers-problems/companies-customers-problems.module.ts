import { Module } from '@nestjs/common';
import { CompaniesCustomersProblemsController } from './companies-customers-problems.controller';
import { CompaniesCustomersProblemsService } from './companies-customers-problems.service';

@Module({
  controllers: [CompaniesCustomersProblemsController],
  providers: [CompaniesCustomersProblemsService]
})
export class CompaniesCustomersProblemsModule {}
