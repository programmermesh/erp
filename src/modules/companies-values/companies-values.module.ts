import { Module } from '@nestjs/common';
import { CompaniesValuesController } from './companies-values.controller';
import { CompaniesValuesService } from './companies-values.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyValuesEntity } from './company-values.entity'
import { CompanyEntity } from '../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyValuesEntity,
    CompanyEntity
  ])],
  controllers: [CompaniesValuesController],
  providers: [CompaniesValuesService]
})
export class CompaniesValuesModule {}
