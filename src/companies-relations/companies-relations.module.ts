import { Module } from '@nestjs/common';
import { CompaniesRelationsController } from './companies-relations.controller';

@Module({
  controllers: [CompaniesRelationsController]
})
export class CompaniesRelationsModule {}
