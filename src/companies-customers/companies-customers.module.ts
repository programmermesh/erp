import { Module } from '@nestjs/common';
import { CompaniesCustomersController } from './companies-customers.controller';

@Module({
  controllers: [CompaniesCustomersController]
})
export class CompaniesCustomersModule {}
