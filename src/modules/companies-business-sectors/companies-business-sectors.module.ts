import { Module } from '@nestjs/common';
import { CompaniesBusinessSectorsController } from './companies-business-sectors.controller';
import { CompaniesBusinessSectorsService } from './companies-business-sectors.service';
import { CompanyBusinessSectorsEntity } from './company-business-sectors.entity'
import { CompanyEntity } from '../companies/company.entity';
import { BusinessSectorsEntity } from '../business-sectors/business-sectors.entity'
import { UserEntity } from '../users/user.entity'

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([
    CompanyBusinessSectorsEntity,UserEntity, CompanyEntity, BusinessSectorsEntity
  ])],
  controllers: [CompaniesBusinessSectorsController],
  providers: [CompaniesBusinessSectorsService]
})
export class CompaniesBusinessSectorsModule {}
