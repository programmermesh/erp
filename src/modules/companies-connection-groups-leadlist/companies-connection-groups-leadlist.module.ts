import { Module } from '@nestjs/common';
import { CompaniesConnectionGroupsLeadlistController } from './companies-connection-groups-leadlist.controller';
import { CompaniesConnectionGroupsLeadlistService } from './companies-connection-groups-leadlist.service';
import { ConnectionGroupsLeadListEntity } from './connection-groups-lead-list.entity'
import { LeadListEntity } from '../companies-lead-list/lead-list.entity'
import { ConnectionGroupsEntity  } from '../companies-connection-groups/connection-groups.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([
    ConnectionGroupsEntity,
    LeadListEntity,
    ConnectionGroupsLeadListEntity
  ])],
  controllers: [CompaniesConnectionGroupsLeadlistController],
  providers: [CompaniesConnectionGroupsLeadlistService]
})
export class CompaniesConnectionGroupsLeadlistModule {}
