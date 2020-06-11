import { Module } from '@nestjs/common';
import { CompaniesLeadListController } from './companies-lead-list.controller';
import { CompaniesLeadListService } from './companies-lead-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadListEntity } from './lead-list.entity'
import { CompanyEntity } from '../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    LeadListEntity,
    CompanyEntity
  ])],
  controllers: [CompaniesLeadListController],
  providers: [CompaniesLeadListService]
})
export class CompaniesLeadListModule {}
