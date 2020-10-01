import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesConnectionGroupsLeadlistController } from './companies-connection-groups-leadlist.controller';
import { CompaniesConnectionGroupsLeadlistService } from './companies-connection-groups-leadlist.service';
import { ConnectionGroupsLeadListEntity } from './connection-groups-lead-list.entity'
import { LeadListEntity } from '../companies-lead-list/lead-list.entity'
import { ConnectionGroupsEntity  } from '../companies-connection-groups/connection-groups.entity'
import { ConnectionGroupsCategoryEntity } from '../companies-connection-groups-categories/company-connection-group-category.entity'
import { CompanyEntity } from '../companies/company.entity'

@Module({
  imports:[TypeOrmModule.forFeature([
    ConnectionGroupsEntity,
    LeadListEntity,
    ConnectionGroupsLeadListEntity,
    CompanyEntity,
    ConnectionGroupsCategoryEntity
  ])],
  controllers: [CompaniesConnectionGroupsLeadlistController],
  providers: [CompaniesConnectionGroupsLeadlistService]
})
export class CompaniesConnectionGroupsLeadlistModule {}
