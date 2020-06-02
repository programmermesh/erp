import { Module } from '@nestjs/common';
import { CompaniesConnectionGroupsLeadlistController } from './companies-connection-groups-leadlist.controller';
import { CompaniesConnectionGroupsLeadlistService } from './companies-connection-groups-leadlist.service';

@Module({
  controllers: [CompaniesConnectionGroupsLeadlistController],
  providers: [CompaniesConnectionGroupsLeadlistService]
})
export class CompaniesConnectionGroupsLeadlistModule {}
