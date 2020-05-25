import { Module } from '@nestjs/common';
import { CompaniesValuesController } from './companies-values.controller';

@Module({
  controllers: [CompaniesValuesController]
})
export class CompaniesValuesModule {}
