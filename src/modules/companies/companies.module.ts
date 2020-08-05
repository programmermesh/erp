import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanyEntity } from './company.entity'
import { UserEntity } from '../users/user.entity'

@Module({
  imports:[ TypeOrmModule.forFeature([ CompanyEntity, UserEntity ]) ],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
