import { Module } from '@nestjs/common';
import { CompaniesConnectionGroupsController } from './companies-connection-groups.controller';
import { CompaniesConnectionGroupsService } from './companies-connection-groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionGroupsEntity } from './connection-groups.entity'
import { ConnectionGroupsCategoryEntity } from '../companies-connection-groups-categories/company-connection-group-category.entity'
import { CompanyEntity } from '../companies/company.entity'

@Module({
  imports:[TypeOrmModule.forFeature([
    ConnectionGroupsEntity,
    CompanyEntity,
    ConnectionGroupsCategoryEntity
  ])],
  controllers: [CompaniesConnectionGroupsController],
  providers: [CompaniesConnectionGroupsService]
})
export class CompaniesConnectionGroupsModule {}
