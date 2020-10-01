import { Module } from '@nestjs/common';
import { CompaniesResourcesActivitiesPartnersService } from './companies-resources-activities-partners.service';
import { CompaniesResourcesActivitiesPartnersController } from './companies-resources-activities-partners.controller';
import { ResourcesActivitiesPartnersEntity as ResourcesActivitiesPartners } from './resources-activities-partners.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([ResourcesActivitiesPartners, Company])
  ],
  providers: [CompaniesResourcesActivitiesPartnersService],
  controllers: [CompaniesResourcesActivitiesPartnersController]
})
export class CompaniesResourcesActivitiesPartnersModule {}
