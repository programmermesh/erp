import { Module } from '@nestjs/common';
import { CompanyConnectionGroupsCategoriesController } from './company-connection-groups-categories.controller';
import { CompanyConnectionGroupsCategoriesService } from './company-connection-groups-categories.service';
import { ConnectionGroupsEntity as ConnectionGroup } from '../companies-connection-groups/connection-groups.entity'
import { ConnectionGroupsCategoryEntity as ConnectionGroupCategory } from './company-connection-group-category.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([
    ConnectionGroup, ConnectionGroupCategory
  ])],
  controllers: [CompanyConnectionGroupsCategoriesController],
  providers: [CompanyConnectionGroupsCategoriesService]
})
export class CompanyConnectionGroupsCategoriesModule {}
