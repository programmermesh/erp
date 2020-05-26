import { Module } from '@nestjs/common';
import { CompaniesCompetitionsController } from './companies-competitions.controller';

@Module({
  controllers: [CompaniesCompetitionsController]
})
export class CompaniesCompetitionsModule {}
