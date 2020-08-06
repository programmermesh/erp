import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanyEntity } from './company.entity'
import { UserEntity } from '../users/user.entity'
import { CompanyCustomerSegmentsEntity as CompanyCustomerSegment } from '../companies-customer-segments/company-customer-segments.entity'
import { CustomerSegmentEntity as CustomerSegment } from '../customer-segments/customer-segment.entity'
import { CompanyBusinessStagesEntity as CompanyBusinessStage } from '../companies-business-stages/company-business-stages.entity'
import { BusinessStagesEntity as BusinessStage } from '../business-stages/business-stages.entity'
import { BusinessSectorsEntity as BusinessSector } from '../business-sectors/business-sectors.entity'
import { CompanyBusinessSectorsEntity as CompanyBusinessSector } from '../companies-business-sectors/company-business-sectors.entity'

@Module({
  imports:[ 
    TypeOrmModule.forFeature([ 
      CompanyEntity, 
      UserEntity, CompanyCustomerSegment, CustomerSegment, 
      CompanyBusinessStage, BusinessStage,
      CompanyBusinessSector, BusinessSector
    ])],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
