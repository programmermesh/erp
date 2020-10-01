import { Module } from '@nestjs/common';
import { CompaniesBusinessStagesController } from './companies-business-stages.controller';
import { CompaniesBusinessStagesService } from './companies-business-stages.service';
import { CompanyBusinessStagesEntity } from './company-business-stages.entity'
import { CompanyEntity } from '../companies/company.entity';
import { UserEntity } from '../users/user.entity'
import { BusinessStagesEntity } from '../business-stages/business-stages.entity'
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyBusinessStagesEntity,
    CompanyEntity,
    UserEntity,
    BusinessStagesEntity
  ])] ,
  controllers: [CompaniesBusinessStagesController],
  providers: [CompaniesBusinessStagesService]
})
export class CompaniesBusinessStagesModule {}
