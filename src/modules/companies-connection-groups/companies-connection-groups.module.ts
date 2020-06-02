import { Module } from '@nestjs/common';
import { CompaniesConnectionGroupsController } from './companies-connection-groups.controller';
import { CompaniesConnectionGroupsService } from './companies-connection-groups.service';

@Module({
  controllers: [CompaniesConnectionGroupsController],
  providers: [CompaniesConnectionGroupsService]
})
export class CompaniesConnectionGroupsModule {}
